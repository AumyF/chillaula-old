import { css } from "./_styled-system/css";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import type { DB } from "./_db/generated/types";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});

export default async function Home() {
  const resus = await db
    .selectFrom("Resu")
    .select(["content", "createdAt"])
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
    <main>
      <h1
        className={css({
          fontSize: "2xl",
          fontWeight: "bold",
        })}
      >
        Chillaula
      </h1>
      <form action={createResu}>
        <label>
          <span>Content</span>
          <input type="text" defaultValue="hogeho" name="content" />
        </label>
        <button type="submit">Resu!</button>
      </form>
      <ul>
        {resus.map((resu) => (
          <li>
            <h2>{resu.content}</h2>
            <time>{resu.createdAt.toISOString()}</time>
          </li>
        ))}
      </ul>
    </main>
  );
}
