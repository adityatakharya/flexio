Welcome to Flexio! This application is a StreamYard clone and allows you to suer easily stream videos in real-time to YouTube from any device.

## 🧩 Stack Used

- **Next.js**: React framework that allows both client-side and server-side rendering.
- **Tailwind CSS & Daisy UI**: Responsive UI components and colors.
- **Framer Motion**: Smooth animations.
- **Socket.io**: Real-time communication between client and server using web sockets.
- **FFmpeg**: Video processing and streaming.
- **Supabase**: Authentication with OAuth providers. User and Stream information database.
- **Docker**: Containerized deployment as required by ffmpeg.

## ⚠️ Important Note

Due to heavy data usage and costs, the deployment is not serverless. Therefore, the streaming feature doesn't work in the current deployment. For full functionality, download the Docker image from [here](#).

## Installation Guide

1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/streaming-app.git
   cd streaming-app
   ```

2. **Install dependencies**:
    ```
    npm install

3. **Set up environment variables**:
    Create a .env.local file and add your Supabase and YouTube streaming credentials.

4. **Build and Run Docker Container**
    ```
    docker-compose up 
    ```

After completing all the steps, your app will start running as soon as the docker container is ready!

## Short Guide

### Step 1: Setting Up the Project

- Started with a Next.js template.
- Added basic Tailwind CSS for styling.
- Integrated DaisyUI for responsive UI components and colors.
- Applied Framer Motion for simple page animations.

### Step 2: Accessing Media Devices

- Created a navigator object to access camera and microphone.
- Stored media device data in a variable using the useRef hook.
- Implemented a mediaRecorder object to record video in real-time and convert it to binary form.

### Step 3: Establishing Server-Client Communication

- Used Socket.IO library to connect the server to the client in Next.js. (Litte difficult because I was migrating from Node.js to Next.js)
- Referenced official documentation and Stack Overflow for help.
- Successfully emitted video data from the client to the server using socket.emit().

### Step 4: Dockerizing the Application

Created a Docker container to streamline deployment. (FFmpeg should be installed on the machine to work properly and that's why, docker was the right option)
Imported spawn for child_process in Node.js.
Configured a Docker container with Ubuntu, CURL, Node.js, and FFmpeg for video processing. Refer to [Dockerfile](#) for more
Ran the server using docker-compose up

### Step 5: Implementing User Authentication
- Explored NextAuth for authentication but encountered issues in importing module.
- Opted for Supabase for its ease of use.
- Followed OAuth documentation (which is super good btw).
- Integrated OAuth with GitHub and Google for login and signup.
- Managed user redirection based on authentication status using Supabase's in-built methods.

### Step 6: SQL Database Integration with Supabase

- Utilized Postgres SQL from Supabase for storing user and streaming credentials.
- Created tables for user details and streaming credentials with foreign key relationships.
- Populated data in the tables from the main homepage. Refer to [/app/page.js] for more.

### Step 7: Enhancing User Interface

- Developed Guide and Settings pages for user instructions and streaming details.
- Focused on UI/UX improvements for seamless user experience.
- Ensured smooth transitions between edit buttons and input fields components.

