import { revalidatePath } from "next/cache";
import { db } from "@/_db/kysely";
import { ResuComposer } from "@/_components/resu-composer";

export const runtime = "edge";

export default async function Home() {
  const resus = await db
    .selectFrom("Resu")
    .select(["content", "createdAt", "id"])
    .orderBy("createdAt desc")
    .execute();

  async function createResu(formData: FormData) {
    "use server";

    await db
      .insertInto("Resu")
      .values({ content: formData.get("content")!.toString() })
      .execute();

    revalidatePath("/");
  }

  return (
    <>
      <ResuComposer createResu={createResu} />
      <ul>
        {resus.map((resu) => (
          <li key={resu.id}>
            <h2>{resu.content}</h2>
            <time>{resu.createdAt.toISOString()}</time>
          </li>
        ))}
      </ul>
    </>
  );
}
