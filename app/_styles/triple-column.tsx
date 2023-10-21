import { css } from "../_styled-system/css";
import { SizeToken, SpacingToken } from "../_styled-system/tokens";

export const container = (gap: SpacingToken) =>
  css({
    p: gap,
    gap,
    display: "flex",
    justifyContent: "center",
    maxInlineSize: "8xl",
    marginInline: "auto",
  });

export const aside = () =>
  css({
    flex: "auto",
  });

export const main = (inlineSize: SizeToken) =>
  css({
    inlineSize,
  });
