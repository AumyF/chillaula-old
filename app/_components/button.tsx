import { css } from "@/_styled-system/css";
import { Button as AriaButton } from "@ariakit/react";

// TODO よく見たら実装がベッタリすぎる
export const Button: React.FC<
  Omit<React.ComponentProps<typeof AriaButton>, "className">
> = (props) => {
  return (
    <AriaButton
      type="submit"
      className={css({
        bg: "teal.300",
        rounded: "lg",
        paddingInline: "4",
        paddingBlock: "1",
        flex: "initial",
        alignSelf: "end",
        fontWeight: "bold",
      })}
    >
      {props.children}
    </AriaButton>
  );
};
