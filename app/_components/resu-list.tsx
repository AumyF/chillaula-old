import { css } from "@/_styled-system/css";
import { List } from "./list";
import { flex } from "@/_styled-system/patterns";

type Resu = Readonly<{
  id: number;
  content: React.ReactNode;
  createdAt: Date;
}>;

export const ResuList: React.FC<{
  fallback?: React.ReactElement;
  resus: readonly Resu[];
}> = ({ resus, fallback }) => {
  return (
    <ul
      className={flex({
        direction: "column",
        gap: "2",
      })}
    >
      <List
        list={resus}
        fallback={() => fallback ?? <div>まだレスがありません</div>}
      >
        {({ id, content, createdAt }) => (
          <li
            key={id}
            className={css({
              bg: "bgWeak",
              p: "2",
              rounded: "sm",
              borderColor: "border",
              borderWidth: "thin",
            })}
          >
            <h2>{content}</h2>
            <time>{createdAt.toISOString()}</time>
          </li>
        )}
      </List>
    </ul>
  );
};
