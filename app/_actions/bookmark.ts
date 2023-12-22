"use server";

import { supabase } from "@/_db/supabase";
import { revalidatePath } from "next/cache";

export async function getBookmarks() {
  const bookmarkResult = await supabase
    .from("Bookmark")
    .select("id, collectionId, url, title, createdAt");

  if (bookmarkResult.error) throw bookmarkResult.error;

  return bookmarkResult.data;
}

export async function queryBookmarkById(id: number) {
  const result = await supabase
    .from("Bookmark")
    .select(
      `
      id, collectionId, url, title, createdAt,
      ResuCollection (
        id,
        Resu (
          id, content, createdAt,
          User (id, name)
        )
      )
`,
    )
    .eq("id", id)
    .maybeSingle();

  if (result.error) throw result.error;

  return result.data;
}

// TODO これいる？
export async function createBookmark(f: FormData) {
  const url = f.get("url")!.toString();

  await createBookmarkOnUrl(url);

  revalidatePath("/bookmarks");
}

export async function createBookmarkOnUrl(url: string) {
  const resultC = await supabase
    .from("ResuCollection")
    .insert({})
    .select("id")
    .single();

  if (resultC.error) throw resultC.error;

  const resultB = await supabase
    .from("Bookmark")
    .insert({ url, title: "", collectionId: resultC.data.id })
    .select("id")
    .single();

  if (resultB.error) throw resultB.error;

  revalidatePath(`/bookmarks`);
}
