import { createClient } from "@supabase/supabase-js";
import { type Database } from "./supabase.types";

if (!process.env.SUPABASE_URL) {
  throw new Error("SUPABASE_URL not set");
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
}

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);
