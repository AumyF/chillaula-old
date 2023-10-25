import { notFound } from "next/navigation";
import { db } from "@/_db/kysely";
import { css } from "@/_styled-system/css";

export const runtime = "edge";

export default async function Thread({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id, 10);
  if (Number.isNaN(id)) {
    notFound();
  }
  const scrap = await db
    .selectFrom("Thread")
    .select(["id", "title"])
    .where("id", "=", id)
    .executeTakeFirst();

  if (scrap === undefined) {
    notFound();
  }

  return (
    <>
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
    </>
  );
}
