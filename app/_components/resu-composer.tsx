import { css } from "@/_styled-system/css";
import { flex } from "@/_styled-system/patterns";
import { Button } from "./button";

type Props = { createResu: (formData: FormData) => void };

export const ResuComposer: React.FC<Props> = ({ createResu }) => {
  return (
    <form
      action={createResu}
      className={flex({
        direction: "column",
        gap: "2",
      })}
    >
      <label
        className={flex({
          direction: "column",
          gap: "1",
        })}
      >
        <span
          className={css({
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "gray.600",
          })}
        >
          Content
        </span>
        <textarea
          defaultValue="hogeho"
          name="content"
          className={css({
            display: "block",
            rounded: "md",
            borderColor: "gray",
            borderWidth: "1px",
          })}
        />
      </label>
      <Button type="submit">Resu!</Button>
    </form>
  );
};
