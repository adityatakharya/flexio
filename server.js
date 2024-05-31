import next from "next";
import { createServer } from "http";
import { Server } from 'socket.io';
import { spawn } from "child_process";
import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    logger.info("Socket Connected");

    const streamKey = socket.handshake.query.streamKey;

    if (!streamKey) {
      logger.error("No stream key provided. Closing socket connection.");
      socket.disconnect(true);
      return;
    }

    const options = [
      '-i',
      '-',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-tune', 'zerolatency',
      '-r', `${25}`,
      '-g', `${25 * 2}`,
      '-keyint_min', 25,
      '-crf', '25',
      '-pix_fmt', 'yuv420p',
      '-sc_threshold', '0',
      '-profile:v', 'main',
      '-level', '3.1',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-ar', 128000 / 4,
      '-f', 'flv',
      `rtmp://a.rtmp.youtube.com/live2/${streamKey}`, // Use the dynamic stream key here
    ];

    const ffmpegProcess = spawn('ffmpeg', options);

    ffmpegProcess.stdout.on('data', (data) => {
      logger.info(`ffmpeg stdout: ${data}`);
    });

    ffmpegProcess.stderr.on('data', (data) => {
      logger.error(`ffmpeg stderr: ${data}`);
    });

    ffmpegProcess.on('close', (code) => {
      logger.info(`ffmpeg process exited with code ${code}`);
    });

    socket.on("videoStreaminBinary", stream => {
      logger.info("Binary Stream Incoming");
      ffmpegProcess.stdin.write(stream, (err) => {
        if (err) logger.error("Error Occurred while writing Stream", err);
      });
    });

    socket.on("disconnect", () => {
      logger.info("Socket Disconnected");
      // Clean up resources if needed
      ffmpegProcess.kill('SIGINT');
    });
  });

  httpServer
    .once("error", (err) => {
      logger.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      logger.info(`> Ready on http://${hostname}:${port}`);
    });
});
