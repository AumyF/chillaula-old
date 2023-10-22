import { css } from "@/_styled-system/css";
import * as TripleColumn from "@/_styles/triple-column";
import Link from "next/link";

export default async function StandardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={TripleColumn.container}>
      <div className={TripleColumn.aside}>
        <header className={css({ marginInlineStart: "auto" })}>
          <h1
            className={css({
              fontSize: "2xl",
              fontWeight: "bold",
            })}
          >
            Chillaula
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
                  href="/scraps"
                  className={css({
                    display: "block",
                    paddingBlock: "2",
                  })}
                >
                  スクラップ
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
      </div>
      <main className={TripleColumn.main}>{children}</main>
      <footer className={TripleColumn.aside}>
        <p>I'm footer.</p>
        <small>&copy; 2023-present, Aumy</small>
      </footer>
    </div>
  );
}
