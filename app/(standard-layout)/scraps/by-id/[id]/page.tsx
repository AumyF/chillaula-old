import { notFound } from "next/navigation";
import { db } from "@/_db/kysely";
import * as TripleColumn from "@/_styles/triple-column";
import { css } from "@/_styled-system/css";

export const runtime = "edge";

export default async function Scrap({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id, 10);
  if (Number.isNaN(id)) {
    notFound();
  }
  const scrap = await db
    .selectFrom("Scrap")
    .select(["id", "title"])
    .where("id", "=", id)
    .executeTakeFirst();

  if (scrap === undefined) {
    notFound();
  }

  return (
    <div className={TripleColumn.container}>
      <div className={TripleColumn.aside}></div>
      <main className={TripleColumn.main}>
        <div>
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
        </div>
      </main>
      <div className={TripleColumn.aside}></div>
    </div>
  );
}
