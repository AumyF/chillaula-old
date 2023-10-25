import { revalidatePath } from "next/cache";
import { db } from "@/_db/kysely";
import { ResuComposer } from "@/_components/resu-composer";
import { List } from "@/_components/list";
import { ResuView } from "@/_components/resu-view";

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
        <List list={resus} fallback={() => <div>まだレスがありません</div>}>
          {(resu) => <ResuView {...resu} />}
        </List>
      </ul>
    </>
  );
}
