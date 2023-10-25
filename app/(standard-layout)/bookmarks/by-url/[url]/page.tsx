import { notFound, redirect } from "next/navigation";
import { db } from "@/_db/kysely";
import { css } from "@/_styled-system/css";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { List } from "@/_components/list";
import { ResuView } from "@/_components/resu-view";
import { sql } from "kysely";

export const runtime = "edge";

const newURL = (string: string): URL | undefined => {
  try {
    return new URL(string);
  } catch (_) {
    return undefined;
  }
};

async function CreatePage(url: string) {
  "use server";

  const bookmark = await db.transaction().execute(async (db) => {
    const collection = await db
      .insertInto("ResuCollection")
      .values({})
      .executeTakeFirstOrThrow();
    if (collection.insertId === undefined ) throw new Error("what");
    return await db
      .insertInto("Bookmark")
      .values({ url, title: "", collectionId: Number(collection.insertId) })
      .executeTakeFirstOrThrow();
  });
  revalidatePath(`/references/by-url/${encodeURIComponent(url)}`);
}

async function NotFound(url: string) {
  const create = CreatePage.bind(null, url);
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

async function FancyExternalLink({ url }: { url: URL }) {
  const document = new DOMParser().parseFromString(
    await (await fetch(url)).text(),
    "text/html",
  );

  return <a className={css({ display: "block" })}>{document.title}</a>;
}

export default async function BookmarkByUrl({
  params,
}: {
  params: { url: string };
}) {
  const url = newURL(decodeURIComponent(params.url));
  if (url === undefined) notFound();

  const bookmark = await db
    .selectFrom("Bookmark")
    .select(["id", "title", "collectionId"])
    .where("url", "=", url.toString())
    .executeTakeFirst();

  if (bookmark === undefined) {
    return await NotFound(url.toString());
  }

  const resus = await db
    .selectFrom("Resu")
    .select(["id", "createdAt", "content", "quoteId"])
    .where("Resu.collectionId", "=", bookmark.collectionId)
    .execute();
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
