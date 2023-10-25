import { css } from "@/_styled-system/css";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className={css({ marginInlineStart: "auto" })}>
      <h1
        className={css({
          fontSize: "2xl",
          fontWeight: "bold",
        })}
      >
        <Link href="/">Chillaula</Link>
      </h1>
      <nav
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "4",
        })}
      >
        <ul
          className={css({
            display: "flex",
            paddingBlock: "2",
            gap: "2",
            flexDirection: "column",
          })}
        >
          <li>
            <Link
              href="/threads"
              className={css({
                display: "block",
                paddingBlock: "2",
              })}
            >
              スレッド
            </Link>
          </li>
          <li>
            <Link
              href="/bookmarks"
              className={css({
                display: "block",
                paddingBlock: "2",
              })}
            >
              ブックマーク
            </Link>
          </li>
          {new Array(4).fill(undefined).map((_, i) => (
            <li key={i}>
              <a
                className={css({
                  display: "block",
                  paddingBlock: "2",
                })}
                href="/"
              >
                ナビゲーション{i}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
