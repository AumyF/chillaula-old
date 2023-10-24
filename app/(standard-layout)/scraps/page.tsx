import { db } from "@/_db/kysely";
import { flex } from "@/_styled-system/patterns";
import Link from "next/link";

export const runtime = "edge";

const Scrap = ({ id, title }: { id: number; title: string }) => {
  return (
    <li key={id}>
      <Link href={`/scraps/by-id/${id}`}>{title}</Link>
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
  const scraps = await db.selectFrom("Scrap").select(["id", "title"]).execute();

  const list = (
    <ul>
      {scraps.map((scrap) => (
        <li key={scrap.id}>
          <Link href={`/scraps/by-id/${scrap.id}`}>{scrap.title}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div
        className={flex({
          gap: "4",
          p: "4",
        })}
      >
        <List
          list={scraps}
          fallback={() => <div>まだスクラップがありません</div>}
        >
          {(scrap) => <Scrap {...scrap} />}
        </List>
      </div>
    </>
  );
}
