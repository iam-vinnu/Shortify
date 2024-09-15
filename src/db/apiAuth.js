
import supabase from "./supabase";

export const login = async ({email , password})=>{
   //   try {
   //      const data = await supabase.auth.signInWithPassword({
   //          email:email,
   //          password:password,
   //         })
   //         return data;
   //   } catch (error) {
   //      throw new Error(error.message);
   //   }

   const {data , error } = await supabase.auth.signInWithPassword({
      email,
      password,
   })

   if(error) throw new Error(error.message);

   return data
}


