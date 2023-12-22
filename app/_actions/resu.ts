import { supabase } from "@/_db/supabase";
import { revalidatePath } from "next/cache";

export async function createResuOnCollection({
  collectionId,
  content,
}: {
  collectionId: number;
  content: string;
}) {
  "use server";

  const c = await supabase.from("Resu").insert({
    content,
    collectionId,
  });

  if (c.error) throw c.error;

  revalidatePath(`/`, "layout");
}

export async function queryResusOnCollection(id: number) {
  const c = await supabase
    .from("Resu")
    .select(
      `id, createdAt, content, quoteId,
  User (
    name
  )`,
    )
    .eq("collectionId", id);

  if (c.error) throw c.error;

  return c.data;
}
