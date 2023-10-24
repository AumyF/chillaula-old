import { notFound, redirect } from "next/navigation";
import { db } from "@/_db/kysely";
import { css } from "@/_styled-system/css";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

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

  await db
    .insertInto("Reference")
    .values({ url, title: url })
    .executeTakeFirstOrThrow();
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

  const scrap = await db
    .selectFrom("Reference")
    .select(["id", "title"])
    .where("url", "=", url.toString())
    .executeTakeFirst();

  if (scrap === undefined) {
    return await NotFound(url.toString());
  }

  return (
    <>
      <hgroup>
        <h1
          className={css({
            fontSize: "3xl",
            fontWeight: "bold",
          })}
        >
          {scrap.title}
        </h1>
        <p>ID: {scrap.id}</p>
      </hgroup>
      <Suspense fallback={<p>loading...</p>}>
        <FancyExternalLink url={url} />
      </Suspense>
    </>
  );
}
