"use server";

import { db } from "@/_db/kysely";
import { revalidatePath } from "next/cache";

export async function updateTitle(id: number, title: string) {
  await db
    .updateTable("Bookmark")
    .set({ title })
    .where("id", "=", id)
    .executeTakeFirst();

  revalidatePath("*")
}
