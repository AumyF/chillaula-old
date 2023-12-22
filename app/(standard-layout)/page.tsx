import { revalidatePath } from "next/cache";
import { ResuComposer } from "@/_components/resu-composer";
import { ResuList } from "@/_components/resu-list";
import { supabase } from "@/_db/supabase";

export const runtime = "edge";

export default async function Home() {
  const result = await supabase
    .from("Resu")
    .select("content, createdAt, id, author:User (id, name)")
    .order("createdAt");

  

  async function createResu(content: string) {
    "use server";
    const uid = (await supabase.auth.getUser()).data.user?.id;

    if (uid == null) throw new Error("not logged in");

    await supabase
      .from("Resu")
      .insert({ content, authorId: uid });

    revalidatePath("/");
  }

  return (
    <>
      <ResuComposer createResu={createResu} />
      <ResuList resus={result.data ?? []} />
    </>
  );
}
