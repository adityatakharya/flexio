"use client"

import { signInWithGithub, signInWithGoogle } from "../../utils/supabaseProviders";
import { useRouter } from "next/navigation";
import { useEffect} from "react"
import { supabase } from "../../utils/supabaseClient";
import { motion } from "framer-motion";

const LoginForm = () => {

    const router = useRouter();
  
    useEffect(() => {
      document.title = "Flexio | Sign Up"
      const checkIfUserIsLoggedIn = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user!==null) {
          router.push('/');
        }
      };
  
      checkIfUserIsLoggedIn();
    }, [router]);

    const handleSignInWithGithub = async () => {
        await signInWithGithub();
    };
    
    const handleSignInWithGoogle = async () => {
        await signInWithGoogle();
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
    };

  return (
    <motion.div
        initial={{ opacity: 0}} // Initial animation state
        animate={{opacity: 1}} // Use animation controls
        transition={{ duration: 0.8 }} // Animation duration
    >
    <div className="min-h-screen bg-black flex flex-col justify-center">
      <h1 class="mb-12 text-xl font-extrabold text-white md:text-3xl lg:text-4xl text-center justify-center"><span class="text-transparent md:text-3xl lg:text-4xl text-xl bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-center justify-center">Flexio | </span>Stream from  <span class="underline underline-offset-4 decoration-3 decoration-blue-600">Anywhere</span></h1>
      <div className="mx-auto w-72 sm:w-96 sm:w-96 md:w-96 lg:w-96 text-center">
        <div className="bg-base-100 py-8 px-4 shadow rounded-xl px-10">
        <h2 className="text-center text-l sm:text-2xl font-extrabold text-white mb-10">Enter your details</h2>
          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
              />
            </label>

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
              />
            </label>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gray-900 hover:bg-blackalpha-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>

            {/* Log In */}
            <div className="text-center">
              <a href="/user/login" className="text-sm text-indigo-600 hover:text-indigo-500">
                Log In
              </a>
            </div>
          </form>
        </div>
        <button type="button" onClick={handleSignInWithGithub} className="mx-auto mt-5 bg-gray-900 hover:bg-purple-900 text-white py-3 px-8 rounded-md focus:outline-none focus:shadow-outline flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
              <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
            </svg>
            Continue with GitHub
        </button>
        <button onClick={handleSignInWithGoogle} className="mx-auto mt-5 bg-gray-900 hover:bg-blue-900 text-white py-3 px-8 rounded-md focus:outline-none focus:shadow-outline flex transition duration-150">
            <img className="w-5 h-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
            <span>Continue with Google</span>
        </button>
      </div>
      </div>
      </motion.div>
  );
};

export default LoginForm;
