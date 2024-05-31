import { supabase } from "./supabaseClient"

export const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  
    if (error) {
      console.error('Error signing in with GitHub:', error);
    } else {
      console.log('Signed in with GitHub:', data);
    }
  };
  
  export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  
    if (error) {
      console.error('Error signing in with Google:', error);
    } else {
      console.log('Signed in with Google:', data);
    }
  };