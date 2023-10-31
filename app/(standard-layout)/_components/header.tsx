"use client";

import { css } from "@/_styled-system/css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const link = css({
  display: "block",
  paddingBlock: "2",
  paddingInlineStart: "2",
  rounded: "md",
  transition: "50ms background-color ease-in-out",
  "&:hover": {
    bg: "bgHover",
  },
  "&[data-currentpage=true]": {
    fontWeight: "bold",
  },
});

export const Header: React.FC = () => {
  const pathname = usePathname();

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
            <Link href="/" data-currentpage={pathname === "/"} className={link}>
              ホーム
            </Link>
          </li>
          <li>
            <Link
              href="/threads"
              data-currentpage={pathname === "/threads"}
              className={link}
            >
              スレッド
            </Link>
          </li>
          <li>
            <Link
              href="/bookmarks"
              data-currentpage={pathname === "/bookmarks"}
              className={link}
            >
              ブックマーク
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
