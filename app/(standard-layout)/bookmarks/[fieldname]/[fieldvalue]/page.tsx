import { notFound } from "next/navigation";
import { css } from "@/_styled-system/css";
import { ResuView } from "@/_components/resu-view";
import { List } from "@/_components/list";
import { db } from "@/_db/kysely";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

async function createBookmarkOnUrl(url: string) {
  "use server";

  const bookmark = await db.transaction().execute(async (db) => {
    const collection = await db
      .insertInto("ResuCollection")
      .values({})
      .executeTakeFirstOrThrow();
    if (collection.insertId === undefined) throw new Error("what");
    return await db
      .insertInto("Bookmark")
      .values({ url, title: "", collectionId: Number(collection.insertId) })
      .executeTakeFirstOrThrow();
  });
  revalidatePath(`/bookmarks/url/${encodeURIComponent(url)}`);
}

async function UrlNotFound(url: string) {
  const create = createBookmarkOnUrl.bind(null, url);
  return (
    <>
      <h1
        className={css({
          fontSize: "3xl",
          fontWeight: "bold",
        })}
      >
        Not Found
      </h1>
      <p>URL {url} のページが見つかりませんでした。</p>
      <form action={create}>
        <button type="submit" className={css({})}>
          「{url}」を作成
        </button>
      </form>
    </>
  );
}

async function queryResus(id: number) {
  return await db
    .selectFrom("Resu")
    .select(["id", "createdAt", "content", "quoteId"])
    .where("Resu.collectionId", "=", id)
    .execute();
}

async function queryBookmarkByUrl(url: string) {
  const bookmark = await db
    .selectFrom("Bookmark")
    .select(["id", "title", "collectionId"])
    .where("url", "=", url)
    .executeTakeFirst();

  if (bookmark === undefined) {
    return undefined;
  }

  const resus = await queryResus(bookmark.collectionId);
  return { bookmark, resus };
}
async function queryBookmarkById(id: number) {
  const bookmark = await db
    .selectFrom("Bookmark")
    .select(["id", "title", "collectionId"])
    .where("id", "=", id)
    .executeTakeFirst();

  if (bookmark === undefined) {
    return undefined;
  }
  const resus = await queryResus(bookmark.collectionId);
  return { bookmark, resus };
}

export default async function BookmarkPage({
  params,
}: {
  params: { [_ in "fieldvalue" | "fieldname"]: string };
}) {
  let result: Awaited<ReturnType<typeof queryBookmarkById>>;
  switch (params.fieldname) {
    case "url": {
      const url = params.fieldvalue;
      const r = await queryBookmarkByUrl(url);
      if (r === undefined) {
        return await UrlNotFound(url);
      }
      result = r;
      break;
    }
    case "id": {
      const id = Number.parseInt(params.fieldvalue);
      if (Number.isNaN(id)) {
        notFound();
      }
      result = await queryBookmarkById(id);
      break;
    }
    default: {
      console.error(`invalid field name: ${params.fieldname}`);
      notFound();
    }
  }

  if (result === undefined) {
    notFound();
  }

  const { bookmark, resus } = result;
  return (
    <>
      <hgroup>
        <h1
          className={css({
            fontSize: "3xl",
            fontWeight: "bold",
          })}
        >
          {bookmark.title}
        </h1>
        <p>ID: {bookmark.id}</p>
      </hgroup>
      <ul>
        <List list={resus} fallback={() => <div>まだレスがありません</div>}>
          {(resu) => <ResuView {...resu}></ResuView>}
        </List>
      </ul>
    </>
  );
}
