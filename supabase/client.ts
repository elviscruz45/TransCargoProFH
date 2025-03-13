import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
// import { config } from "dotenv";
// // Load environment variables from .env file
// config();


const supabaseUrl =
  process.env.SUPABASE_URL || "https://klxdjuqsmowstdnhwoud.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtseGRqdXFzbW93c3Rkbmh3b3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NDM5NjAsImV4cCI6MjA1NzIxOTk2MH0.UL8lv7xUU_YQDrGHl2J3GyZg2wM7V5ZFK3OdRUz_YJY";

// Better put your these secret keys in .env file
export const supabase = createClient(
  supabaseUrl!!,
  supabaseKey!!
  //   , {
  //   localStorage: AsyncStorage as any,
  //   detectSessionInUrl: false, // Prevents Supabase from evaluating window.location.href, breaking mobile
  // }
);
