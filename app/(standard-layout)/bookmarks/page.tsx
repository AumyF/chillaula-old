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
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <h2>
              <Link href={`/bookmarks/by-id/${bookmark.id}`}>
                {bookmark.title || bookmark.url}
              </Link>
            </h2>
            <time>{bookmark.createdAt.toISOString()}</time>
          </li>
        ))}
      </ul>
    </>
  );
}
