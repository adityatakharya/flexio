"use client"

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabaseClient';

const UserDataBoxes = ({ name, email, username }) => (
  <>
    <div className="flex flex-col items-start mb-6 w-full max-w-xs sm:max-w-md">
      <div className="flex items-center w-full">
        <input
          type="text"
          className="input input-bordered flex-grow mb-2"
          placeholder={name || 'User'}
          disabled
        />
        <button className="btn btn-primary ml-2 mb-2" disabled>
          Can&apos;t Change
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
        <button className="btn btn-primary ml-2 mb-2" disabled>
          Can&apos;t Change
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
        <button className="btn btn-primary ml-2 mb-2" disabled>
          Can&apos;t Change
        </button>
      </div>
      <small className="text-gray-500">Visible only to you.</small>
    </div>
  </>
);

const SecretKeyInput = ({ label, description, onClickFunction, existingValue }) => {
  const [inputValue, setInputValue] = useState(`Secured: ${label}`);
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonText, setButtonText] = useState(existingValue ? 'Key Set' : 'Set Key');
  const [isEditVisible, setIsEditVisible] = useState(true);

  const handleClick = async () => {
    await onClickFunction(inputValue);
    setIsDisabled(true);
    setButtonText('Key Set');
    setIsEditVisible(true);
  };

  const handleEditClick = () => {
    setIsDisabled(false);
    setInputValue(existingValue || (inputValue !== `Secured: ${label}` ? inputValue : ''));
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
          placeholder={`Enter Your ${label}`}
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
  const [userOAuth, setUserOAuth] = useState(null);
  const [userPostgres, setUserPostgres] = useState(null);
  const [successNoti, setSuccessNoti] = useState(false);

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/user/signup'; // Redirect via the browser
      } else {
        setUserOAuth(user);
        const { data, error } = await supabase
          .from('sens_metadata_postgres')
          .select('*')
          .eq('email', user?.user_metadata.email)
          .single();

        if (error) {
          console.error('Error checking user in Postgres:', error);
        } else {
          setUserPostgres(data);
        }
      }
    };

    checkIfUserIsLoggedIn();
  }, []);

  const handleSetStreamKey = async (inputValue) => {
    console.log('Setting Up Stream Key', inputValue);
    const { error } = await supabase
      .from('sens_metadata_postgres')
      .update({ stream_key: inputValue })
      .eq('email', userOAuth?.user_metadata?.email);
    if (error) {
      console.log('Error in setting up Stream Key:', error);
    } else {
      console.log('Successfully updated Stream Key');
      setSuccessNoti(true);
    }
  };

  const handleSetStreamURL = async (inputValue) => {
    console.log('Setting Up Stream URL');
    const { error } = await supabase
      .from('sens_metadata_postgres')
      .update({ stream_url: inputValue })
      .eq('email', userOAuth?.user_metadata?.email);
    if (error) {
      console.log('Error in setting up Stream URL:', error);
    } else {
      console.log('Successfully updated Stream URL');
      setSuccessNoti(true);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (!userOAuth) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <>
      { successNoti && (
        <div role="alert" class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Changes Saved! <u><a href="/user/profile/setup" onClick={(e) => {setSuccessNoti(false)}}>Refresh</a></u> to update.</span>
      </div>
      )}
      <h1 className="text-4xl font-mono text-white text-center mt-10 mb-10">Profile Settings</h1>
      <hr className="w-64 h-1 mx-auto my-4 border-0 rounded md:my-10 bg-gray-700" />
      <div className="min-h-screen bg-black flex flex-col items-center mt-20 px-10">
        <UserDataBoxes
          name={userOAuth.user_metadata?.full_name}
          email={userOAuth.user_metadata?.email}
          username={userOAuth.user_metadata?.preferred_username || 'Not Available'}
        />
        <SecretKeyInput
          label="Stream Key"
          description="This will be used to access your stream."
          onClickFunction={handleSetStreamKey}
          existingValue={userPostgres?.stream_key}
        />
        <SecretKeyInput
          label="Stream URL"
          description="This will be used to identify the stream."
          onClickFunction={handleSetStreamURL}
          existingValue={userPostgres?.stream_url}
        />
        <div className="text-center mt-6">
          <button
            type="button"
            className="bg-gray-900 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
