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

/** 配列からリスト要素を生成する。空配列の場合のフォールバックを提供する */
const List = <T,>(props: {
  list: readonly T[];
  children: (item: T, index: number) => React.ReactNode;
  fallback: () => React.ReactNode;
}) => {
  return props.list.length > 0
    ? props.list.map(props.children)
    : props.fallback();
};

export default async function ScrapList() {
  const threads = await db.selectFrom("Thread").select(["id", "title"]).execute();

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
