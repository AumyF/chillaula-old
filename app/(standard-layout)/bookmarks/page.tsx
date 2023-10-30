import { List } from "@/_components/list";
import { Title } from "@/_components/title";
import { db } from "@/_db/kysely";
import { css } from "@/_styled-system/css";
import { flex } from "@/_styled-system/patterns";
import Link from "next/link";

export default async function BookmarkList() {
  const bookmarks = await db
    .selectFrom("Bookmark")
    .select(["id", "collectionId", "url", "title", "createdAt"])
    .execute();

  return (
    <>
      <header>
        <Title>ブックマーク一覧</Title>
      </header>
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
                  {bookmark.title || bookmark.url}
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
