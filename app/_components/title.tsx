import { css } from "@/_styled-system/css";
import { PropsWithChildren } from "react";

export const Title: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <h1
      className={css({
        fontSize: "3xl",
        fontWeight: "bold",
      })}
    >
      {children}
    </h1>
  );
};
