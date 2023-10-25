import * as TripleColumn from "@/_styles/triple-column";
import { Header } from "./_components/header";
import { cx } from "@/_styled-system/css";
import { flex } from "@/_styled-system/patterns";

export default async function StandardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={TripleColumn.container}>
      <div className={TripleColumn.aside}>
        <Header></Header>
      </div>
      <main
        className={cx(
          TripleColumn.main,
          flex({
            direction: "column",
            gap: "4",
          }),
        )}
      >
        {children}
      </main>
      <footer className={TripleColumn.aside}>
        <p>I&apos;m footer.</p>
        <small>&copy; 2023-present, Aumy</small>
      </footer>
    </div>
  );
}
