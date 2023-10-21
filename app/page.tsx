import { css } from "./_styled-system/css";
import { revalidatePath } from "next/cache";
import { db } from "./_db/kysely";
import * as TripleColumn from "./_styles/triple-column";
import { flex } from "./_styled-system/patterns";

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
    <div className={TripleColumn.container}>
      <div className={TripleColumn.aside}>
        <header className={css({ marginInlineStart: "auto" })}>
          <h1
            className={css({
              fontSize: "2xl",
              fontWeight: "bold",
            })}
          >
            Chillaula
          </h1>
          <nav
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "4",
            })}
          >
            <ul
              className={css({
                display: "flex",
                gap: "2",
                flexDirection: "column",
              })}
            >
              {new Array(4).fill(undefined).map((_, i) => (
                <li key={i}>
                  <a
                    className={css({
                      display: "block",
                      paddingBlock: "2",
                    })}
                    href="/"
                  >
                    ナビゲーション{i}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </div>
      <main className={TripleColumn.main}>
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
      </main>
      <footer className={TripleColumn.aside}>
        <p>I'm footer.</p>
        <small>&copy; 2023-present, Aumy</small>
      </footer>
    </div>
  );
}
