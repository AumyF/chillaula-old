import { List } from "@/_components/list";
import { db } from "@/_db/kysely";
import Link from "next/link";

export default async function BookmarkList() {
  const bookmarks = await db
    .selectFrom("Bookmark")
    .select(["id", "collectionId", "url", "title", "createdAt"])
    .execute();

  return (
    <>
      <ul>
        <List
          fallback={() => <div>まだブックマークがありません</div>}
          list={bookmarks}
        >
          {(bookmark) => (
            <li key={bookmark.id}>
              <h2>
                <Link href={`/bookmarks/by-id/${bookmark.id}`}>
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
