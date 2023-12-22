"use server";

import { supabase } from "@/_db/supabase";
import { revalidatePath } from "next/cache";

export async function updateTitle(id: number, title: string) {
  await supabase.from("Bookmark").update({title}).eq("id", id);

  revalidatePath("/", "layout")
}
