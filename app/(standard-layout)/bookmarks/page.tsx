import { List } from "@/_components/list";
import { Title } from "@/_components/title";
import { db } from "@/_db/kysely";
import { css } from "@/_styled-system/css";
import { flex } from "@/_styled-system/patterns";
import Link from "next/link";
import * as Bookmark from "./_utils";
import { revalidatePath } from "next/cache";

export default async function BookmarkList() {
  async function createBookmark(f: FormData) {
    "use server";

    const url = f.get("url")!.toString();

    await db.transaction().execute(async (db) => {
      const collection = await db
        .insertInto("ResuCollection")
        .values({})
        .executeTakeFirstOrThrow();
      if (collection.insertId === undefined) throw new Error("****");
      await db
        .insertInto("Bookmark")
        .values({
          url,
          authorId: 1,
          title: "",
          collectionId: Number(collection.insertId),
        })
        .executeTakeFirstOrThrow();
    });

    revalidatePath("/bookmarks")
  }
  const bookmarks = await db
    .selectFrom("Bookmark")
    .select(["id", "collectionId", "url", "title", "createdAt"])
    .execute();

  return (
    <>
      <header>
        <Title>ブックマーク一覧</Title>
      </header>
      <form action={createBookmark}>
        <input name="url" type="text" />
        <button>Submit</button>
      </form>
      <ul
        className={flex({
          gap: "2",
          direction: "column",
        })}
      >
        <List
          fallback={() => <div>まだブックマークがありません</div>}
          list={bookmarks}
        >
          {(bookmark) => (
            <li key={bookmark.id}>
              <h2
                className={css({
                  fontWeight: "bold",
                  fontSize: "lg",
                  paddingBlock: "1",
                })}
              >
                <Link href={`/bookmarks/id/${bookmark.id}`}>
                  {Bookmark.title(bookmark)}
                </Link>
              </h2>
              <time>{bookmark.createdAt.toISOString()}</time>
            </li>
          )}
        </List>
      </ul>
    </>
  );
}
