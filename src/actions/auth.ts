'use server';

import { createClient } from "@/supabase/server";

export const authenticate = async (email: string, password: string) => {
    try{
        const supabase = await createClient();
        const {error} = await supabase.auth.signInWithPassword({email, password})
        console.log(error)
    } catch(error){
        console.log('Authentication Error:', error)
        throw error
    }
} 

export const getLatestUsers = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('users')
      .select('id, email, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
  
    if (error) throw new Error(`Error fetching latest users: ${error.message}`);
  
    return data.map(
      (user: { id: string; email: string; created_at: string | null }) => ({
        id: user.id,
        email: user.email,
        date: user.created_at,
      })
    );
  };