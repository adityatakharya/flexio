"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabaseClient";



const UserDataBoxes = ({ name, email, username }) => {
    
  document.title = "Profile Settings"
 
  return (
    <>
      <div className="flex flex-col items-start mb-6 w-full max-w-xs sm:max-w-md">
        <div className="flex items-center w-full">
          <input
            type="text"
            className="input input-bordered flex-grow mb-2"
            placeholder={name || 'User'}
            disabled
          />
          <button
            className="btn btn-primary ml-2 mb-2"
            disabled={true}
          >
            Can't Change
          </button>
        </div>
        <small className="text-gray-500">Appears on your profile.</small>
      </div>
      <div className="flex flex-col items-start mb-6 w-full max-w-xs sm:max-w-md">
        <div className="flex items-center w-full">
          <input
            type="text"
            className="input input-bordered flex-grow mb-2"
            placeholder={email || 'User'}
            disabled
          />
          <button
            className="btn btn-primary ml-2 mb-2"
            disabled={true}
          >
            Can't Change
          </button>
        </div>
        <small className="text-gray-500">Visible only to you.</small>
      </div>
      <div className="flex flex-col items-start mb-6 w-full max-w-xs sm:max-w-md">
        <div className="flex items-center w-full">
          <input
            type="text"
            className="input input-bordered flex-grow mb-2"
            placeholder={username || 'User'}
            disabled
          />
          <button
            className="btn btn-primary ml-2 mb-2"
            disabled={true}
          >
            Can't Change
          </button>
        </div>
        <small className="text-gray-500">Visible only to you.</small>
      </div>
    </>
  );
};

const SecretKeyInput = ({ label, description, onClickFunction, existingValue }) => {
  const [inputValue, setInputValue] = {existingValue}? useState(("Secured")) : useState("");
  const [isDisabled, setIsDisabled] = {existingValue}? useState(true) : useState(false);
  const [buttonText, setButtonText] = {existingValue}? useState('Key Set') : useState('Set Key');
  const [isEditVisible, setIsEditVisible] = {existingValue}? useState(true) : useState(false);

  const handleClick = async () => {
    await onClickFunction(inputValue);
    setIsDisabled(true);
    setButtonText('Key Set');
    setIsEditVisible(true);
  };

  const handleEditClick = () => {
    setIsDisabled(false);
    setInputValue((existingValue) || (inputValue !== "Secured" ? inputValue : ""))
    setButtonText('Set Key');
    setIsEditVisible(false);
  };

  return (
    <div className="flex flex-col items-start mb-6 w-full max-w-xs sm:max-w-md">
      <div className="flex items-center w-full">
        <input
          type="text"
          className="input input-bordered flex-grow mb-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isDisabled}
          placeholder={label}
        />
        <button
          className="btn btn-primary ml-2 mb-2"
          onClick={handleClick}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
        {isEditVisible && (
          <button
            className="btn btn-secondary ml-2 mb-2"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
      </div>
      <small className="text-gray-500">{description}</small>
    </div>
  );
};

const ProfileSettings = () => {
  const router = useRouter();
  const [userOAuth, setUserOAuth] = useState(null);
  const [userPostgres, setUserPostgres] = useState(null);

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/user/signup');
      } else {
        console.log(user);
        setUserOAuth(user);
        console.log("Checking for user in user_data_postgres...")
          const { data, error } = await supabase
            .from('sens_metadata_postgres')
            .select('*')
            .eq('email', user?.user_metadata.email)
            .single();
      
          if (error && error.details !== "The result contains 0 rows") {
            console.error('Error checking user in Postgres:', error);
          }
          else{
            if(data){
                setUserPostgres(data);
                console.log("Checked for user in user_data_postgres successfully", data);
            }
        }
      }
    };

    checkIfUserIsLoggedIn();
  }, [router]);

  const handleSetStreamKey = async (inputValue) => {
    console.log("Setting Up Stream Key");
    const { error } = await supabase
      .from('sens_metadata_postgres')
      .update({stream_key: inputValue})
      .eq('email', userOAuth?.user_metadata?.email);
    if (error) {
      console.log("Error in setting up Stream Key:", error);
    } else {
      console.log("Successfully updated Stream Key");
    }
  };

  const handleSetStreamURL = async (inputValue) => {
    console.log("Setting Up Stream URL");
    const { error } = await supabase
      .from('sens_metadata_postgres')
      .update({stream_url: inputValue})
      .eq('email', userOAuth?.user_metadata?.email);
    if (error) {
      console.log("Error in setting up Stream URL:", error);
    } else {
      console.log("Successfully updated Stream URL");
    }
  };

  if (!userOAuth) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <>
      <h1 className="text-4xl font-mono text-white text-center mt-10 mb-10">Profile Settings</h1>
      <hr className="w-64 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      <div className="min-h-screen bg-black flex flex-col items-center mt-20 px-10">
        <UserDataBoxes name={userOAuth.user_metadata?.full_name} email={userOAuth.user_metadata?.email} username={userOAuth.user_metadata?.preferred_username || "Not Available"} />
        <SecretKeyInput
          label="Enter your Stream Key"
          description="This key will be used for streaming."
          onClickFunction={handleSetStreamKey}
          existingValue={userPostgres?.stream_key}
        />
        <SecretKeyInput
          label="Enter your Stream URL"
          description="This key will be used to identify the stream."
          onClickFunction={handleSetStreamURL}
          existingValue={userPostgres?.stream_url}
        />
        <div className="text-center mt-6">
              <a href="/user/login" className="hover:bg-red-600">
              <button
                type="submit"
                className="bg-gray-900 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={signOut}
              >
                Sign Out
              </button>
              </a>
            </div>
      </div>
      
    </>
  );
};

export default ProfileSettings;
