"use client";

import { FC } from "react";
import { updateTitle } from "./updateTitle";

export const SubmitFetchedTitle: FC<{
  fetchedTitle: string;
  id: number;
}> = ({ fetchedTitle, id }) => {
  const update = updateTitle.bind(null, id, fetchedTitle);
  return (
    <div>
      <span>ページから抽出されたタイトル: 「{fetchedTitle}」</span>
      <button
        onClick={async () => {
          await update();
        }}
      >
        このタイトルを使う
      </button>
    </div>
  );
};
