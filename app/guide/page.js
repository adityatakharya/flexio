"use client"

import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Timeline = () => {
  useEffect(() => {
    document.title = "Flexio | Guide";
  }, []);
  return (
    <motion.div
      className="bg-black p-4 min-h-screen justify-center flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-col grid-cols-9 p-2 mx-auto md:grid justify-center text-center">
        <motion.div
          className="flex md:contents flex-row-reverse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative p-4 my-6 text-gray-300 bg-gray-900 rounded-xl col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto">
            <h3 className="text-lg font-semibold lg:text-xl">Sign Up on <span className="text-green-400">Flexio</span></h3>
            <p className="mt-2 leading-6">Create an account on Flexio to get started.</p>
          </div>
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-blue-400 to-purple-100"></div>
            </div>
            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
          </div>
        </motion.div>

        <motion.div
          className="flex md:contents"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-gradient-to-b from-green-400 to-red-400"></div>
            </div>
            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
          </div>
          <div className="relative p-4 my-6 text-gray-300 bg-gray-900 rounded-xl col-start-6 col-end-10 mr-auto">
            <h3 className="text-lg font-semibold lg:text-xl">Open <span className="text-red-400">Youtube Studio</span></h3>
            <p className="mt-2 leading-6">Access your YouTube Studio dashboard by click on your profile icon.</p>
          </div>
        </motion.div>

        <motion.div
          className="flex md:contents flex-row-reverse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="relative p-4 my-6 text-gray-300 bg-gray-900 rounded-xl col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto">
            <h3 className="text-lg font-semibold lg:text-xl">Press <u className="underline-offset-4">Create</u> Button and <u className="underline-offset-4">Go Live</u></h3>
            <p className="mt-2 leading-6">Press the Create button and choose Go Live.</p>
          </div>
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-gradient-to-b from-sky-100 to-purple-900 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300"></div>
            </div>
            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
          </div>
        </motion.div>

        <motion.div
          className="flex md:contents"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-gradient-to-b from-blue-400 to-green-400"></div>
            </div>
            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
          </div>
          <div className="relative p-4 my-6 text-gray-300 bg-gray-900 rounded-xl col-start-6 col-end-10 mr-auto">
            <h3 className="text-lg font-semibold lg:text-xl">Copy <span className="text-orange-300">Stream Key</span> & <span className="text-yellow-300">URL</span>.</h3>
            <p className="mt-2 leading-6">Retrieve your stream key and URL for streaming from the livestream dashboard.</p>
          </div>
        </motion.div>

        <motion.div
          className="flex md:contents flex-row-reverse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <div className="relative p-4 my-6 text-gray-300 bg-gray-900 rounded-xl col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto">
            <h3 className="text-lg font-semibold lg:text-xl">Open <span className="text-purple-400"> API & Keys </span> Settings.</h3>
            <p className="mt-2 leading-6">Go to settings using the menu icon on the top left corner.</p>
          </div>
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-gradient-to-b from-sky-100 to-purple-900 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300"></div>
            </div>
            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
          </div>
        </motion.div>

        <motion.div
          className="flex md:contents"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.1 }}
        >
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-gradient-to-b from-blue-400 to-green-
              400"></div>
          </div>
          <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
          </div>
          <div className="relative p-4 my-6 text-gray-300 bg-gray-900 rounded-xl col-start-6 col-end-10 mr-auto">
            <h3 className="text-lg font-semibold lg:text-xl"><u className="underline-offset-4">Paste</u> and Enjoy Streaming.</h3>
            <p className="mt-2 leading-6">Paste the required credentials and press Set Key. Once done, go back to the homepage by click the logo and press the Start Streaming button.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Timeline;