import { notFound } from "next/navigation";
import { css } from "@/_styled-system/css";
import { ResuList } from "@/_components/resu-list";
import * as Bookmark from "../../_utils";
import { ResuComposer } from "@/_components/resu-composer";
import { parseHTML } from "linkedom/worker";
import { SubmitFetchedTitle } from "./SubmitFetchedTitle";
import { queryBookmarkById } from "@/_actions/bookmark";
import { createResuOnCollection } from "@/_actions/resu";

export default async function BookmarkPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number.parseInt(params.id, 10);

  if (Number.isNaN(id)) {
    console.error(`bookmark invalid id ${id}`);
    notFound();
  }

  const bookmark = await queryBookmarkById(id);

  if (bookmark === null || bookmark.ResuCollection === null) notFound();

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
      {fetchedTitle && (
        <SubmitFetchedTitle
          fetchedTitle={fetchedTitle ?? ""}
          id={bookmark.id}
        />
      )}
      <ResuComposer
        createResu={async function createResu(content) {
          "use server";
          return await createResuOnCollection({
            content,
            collectionId: bookmark.collectionId,
          });
        }}
      ></ResuComposer>
      <ResuList resus={bookmark.ResuCollection.Resu ?? []} />
    </>
  );
}
