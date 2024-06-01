"use client"

import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react"
import { supabase } from "./utils/supabaseClient";

export default function Home() {

  const router = useRouter();

  const [User, setUser] = useState(null);
  const [UserInfo, setUserInfo] = useState(null);
  const [invalidError, setInvalidError] = useState(false);
  const [mediaToSend, setMediaToSend] = useState(null);
  const [streamStarted, setStreamStarted] = useState(false);
  const [refreshNoti, setRefreshNoti] = useState(false);
  const [streamStartedNoti, setStreamStartedNoti] = useState(false);

  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    document.title = "Streaming Dashboard"
    const checkIfUserIsLoggedIn = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/user/signup');
      }
      setUser(user);

      try {
        // Check if user exists in the user_postgres table
        console.log("Checking for user in user_data_postgres...")
        const { data, error } = await supabase
          .from('sens_metadata_postgres')
          .select('*')
          .eq('email', user.user_metadata.email)
          .single();

        if (error && error.details !== "The result contains 0 rows") {
          console.error('Error checking user in Postgres:', error);
          return;
        } else {
          if (data) setUserInfo(data);
          console.log("Checked for user in user_data_postgres successfully")
        }

        // If user doesn't exist in the table, insert their details
        if (!data) {
          console.log("Inserting user in user_data_postgres...")
          const { error: errorInsertUser } = await supabase
            .from('user_data_postgres')
            .insert({
              email: user.user_metadata.email,
              username: user.user_metadata.preferred_username,
            });

          if (errorInsertUser) {
            console.error('Error inserting user details:', errorInsertUser);
            return;
          } else {
            console.log("Inserted user in user_data_postgres successfully")
          }

          console.log("Inserting user in sens_metadata_postgres...");
          const { error: errorInsertUserForeign } = await supabase
            .from('sens_metadata_postgres')
            .insert({
              email: user.user_metadata.email,
            });

          if (errorInsertUserForeign) {
            console.error('Error inserting user details foreign:', errorInsertUser);
            return;
          } else {
            console.log("Inserted user in sens_metadata_postgres successfully")
          }
        }

      } catch (error) {
        console.error('Full block error while checking user details:', error);
      }
    };

    checkIfUserIsLoggedIn();
  }, [router]);

  const socket = useRef(null);
  const userVideoRef = useRef(null);

  useEffect(() => {
    socket.current = io({ query: { streamKey: UserInfo?.stream_key } }); // Pass stream key here
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [UserInfo]);

  useEffect(() => {
    try {
      const loadCameraMic = async () => {
        if (userVideoRef.current) {
          const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          userVideoRef.current.srcObject = media;
          setMediaToSend(media);
        }
      };

      loadCameraMic();
    } catch (error) {
      console.log("Error: Can't accessing media devices", error);
    }
  }, []);

  const startStreaming = () => {
    if(!refreshNoti){
      if (!UserInfo?.stream_url || !UserInfo?.stream_key) {
        setInvalidError(true);
        return;
      }

      const mediaRecorder = new MediaRecorder(mediaToSend, { audioBitsPerSecond: 128000, videoBitsPerSecond: 2500000, framerate: 25 });
      mediaRecorderRef.current = mediaRecorder;
      setStreamStartedNoti(true);
      setStreamStarted(true);
      mediaRecorder.ondataavailable = ev => {
        socket.current.emit("videoStreaminBinary", ev.data)
      };

      mediaRecorder.start(25);
    }
  }

  const stopStreaming = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setStreamStarted(false);
      setStreamStartedNoti(false);
      setRefreshNoti(true);
    }
  };

  return (
    <div className="justify-center text-center bg-black">
      {invalidError && (
        <div role="alert" className="alert alert-error mt-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error: Invalid Stream Key and URL! View our <u><a href="/guide">guide</a></u> for further help.</span>
        </div>
      )}
      {refreshNoti && (
        <div role="alert" class="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Stream Stopped! Please <u><strong><a href="/">refresh</a></strong></u> the page to resume or start a new stream.</span>
      </div>
      )}
      { streamStartedNoti && (
        <div role="alert" class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Stream Started! Will start reflecting on your Youtube Dasboard soon. (Feature not working because of heavy storage use and non severless deployment)  </span><u><a href="#" onClick={(e) => {setStreamStartedNoti(false)}} className="text-right">close</a></u>
      </div>
      )}
      <div className="flex justify-center text-center">
        {User ? (
          <h1 className="text-3xl font-bold justify-center text-center mb-10 mt-5 text-gray-300">Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-400 from-sky-500">{User.user_metadata.full_name.split(' ')[0]}</span>!</h1>
        ) : (
          <progress className="progress w-56"></progress>
        )}
      </div>
      <div className="flex justify-center px-3">
        <video className="rounded-lg mb-10" ref={userVideoRef} id="userVideo" autoPlay muted />
      </div>
      <div className="flex justify-center mb-10">
        
        {streamStarted?
          <button onClick={stopStreaming} type="button" className="border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-red-600 text-white border-gray-600 hover:bg-red-700 hover:border-gray-600 focus:ring-gray-700">
            Stop Streaming
          </button> : 
          <button onClick={startStreaming} type="button" className="font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">
            Start Streaming
          </button>
        }
      </div>
    </div>
  )
}