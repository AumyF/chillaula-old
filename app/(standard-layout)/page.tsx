import { css } from "@/_styled-system/css";
import { revalidatePath } from "next/cache";
import { db } from "@/_db/kysely";
import { flex } from "@/_styled-system/patterns";

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
      <form
        action={createResu}
        className={flex({
          direction: "column",
          gap: "2",
        })}
      >
        <label
          className={flex({
            direction: "column",
            gap: "1",
          })}
        >
          <span
            className={css({
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "gray.600",
            })}
          >
            Content
          </span>
          <textarea
            defaultValue="hogeho"
            name="content"
            className={css({
              display: "block",
              rounded: "md",
              borderColor: "gray",
              borderWidth: "1px",
            })}
          />
        </label>
        <button
          type="submit"
          className={css({
            bg: "teal.300",
            rounded: "lg",
            paddingInline: "4",
            paddingBlock: "1",
            flex: "initial",
            alignSelf: "end",
          })}
        >
          Resu!
        </button>
      </form>
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
