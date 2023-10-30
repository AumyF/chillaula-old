import { List } from "@/_components/list";
import { db } from "@/_db/kysely";
import { flex } from "@/_styled-system/patterns";
import Link from "next/link";

export const runtime = "edge";

const Scrap = ({ id, title }: { id: number; title: string }) => {
  return (
    <li key={id}>
      <Link href={`/threads/by-id/${id}`}>{title}</Link>
    </li>
  );
};

export default async function ScrapList() {
  const threads = await db
    .selectFrom("Thread")
    .select(["id", "title"])
    .execute();

  return (
    <>
      <div
        className={flex({
          gap: "4",
          p: "4",
        })}
      >
        <List
          list={threads}
          fallback={() => <div>まだスクラップがありません</div>}
        >
          {(scrap) => <Scrap {...scrap} />}
        </List>
      </div>
    </>
  );
}
