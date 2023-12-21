import { notFound } from "next/navigation";
import { css } from "@/_styled-system/css";
import { db } from "@/_db/kysely";
import { revalidatePath } from "next/cache";
import { ResuList } from "@/_components/resu-list";
import * as Bookmark from "../../_utils";
import { ResuComposer } from "@/_components/resu-composer";
import { parseHTML } from "linkedom/worker";
import { SubmitFetchedTitle } from "./SubmitFetchedTitle";

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
      .values({
        url,
        title: "",
        collectionId: Number(collection.insertId),
        authorId: 1,
      })
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
    .innerJoin("User", "User.id", "authorId")
    .select([
      "Resu.id",
      "Resu.createdAt",
      "content",
      "quoteId",
      "User.name as authorName",
    ])
    .where("Resu.collectionId", "=", id)
    .execute();
}

const fields = [
  "Bookmark.id",
  "title",
  "url",
  "collectionId",
  "User.name as authorName",
] as const;

async function queryBookmarkByUrl(url: string) {
  const bookmark = await db
    .selectFrom("Bookmark")
    .innerJoin("User", "Bookmark.authorId", "User.id")
    .select(fields)
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
    .innerJoin("User", "Bookmark.authorId", "User.id")
    .select(fields)
    .where("Bookmark.id", "=", id)
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
        console.error(`bookmark invalid id ${id}`);
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
    console.error(
      `bookmark notfound  ${params.fieldname}: ${params.fieldvalue}`,
    );
    notFound();
  }
  async function createResuOnBookmark(formData: FormData) {
    "use server";
    const collection = await db
      .insertInto("ResuCollection")
      .values({})
      .executeTakeFirstOrThrow();
    const a = await db
      .insertInto("Resu")
      .values({
        authorId: 1,
        content: formData.get("content")!.toString(),
        collectionId: Number(collection.insertId),
      })
      .executeTakeFirstOrThrow();

    revalidatePath(`/bookmarks/${params.fieldname}/${params.fieldvalue}`);
  }

  const { bookmark, resus } = result;

  const fetchedTitle = bookmark.title
    ? undefined
    : await fetch(bookmark.url).then(async (response) => {
      const text = await response.text();
      const html = parseHTML(text);
      return html.document.querySelector("title")?.innerText;
    });
  return (
    <>
      <hgroup>
        <h1
          className={css({
            fontSize: "3xl",
            fontWeight: "bold",
          })}
        >
          {Bookmark.title(bookmark)}
        </h1>
        <p>ID: {bookmark.id}</p>
      </hgroup>
      {fetchedTitle&&<SubmitFetchedTitle fetchedTitle={fetchedTitle ?? ""} id={bookmark.id} />}
      <ResuComposer createResu={createResuOnBookmark}></ResuComposer>
      <ResuList resus={resus} />
    </>
  );
}
