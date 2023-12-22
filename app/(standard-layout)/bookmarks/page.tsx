import { List } from "@/_components/list";
import { Title } from "@/_components/title";
import { css } from "@/_styled-system/css";
import { flex } from "@/_styled-system/patterns";
import Link from "next/link";
import * as Bookmark from "./_utils";
import { createBookmark, getBookmarks } from "@/_actions/bookmark";

export default async function BookmarkList() {
  const bookmarks = await getBookmarks();

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
              <time>{bookmark.createdAt}</time>
            </li>
          )}
        </List>
      </ul>
    </>
  );
}
