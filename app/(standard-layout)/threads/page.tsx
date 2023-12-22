import { List } from "@/_components/list";
import { supabase } from "@/_db/supabase";
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
  const result = await supabase.from("Thread").select("id, title");
  if (result.error) {
    console.log(result);
    throw new Error("fetching error");
  }
  const threads = result.data;

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
