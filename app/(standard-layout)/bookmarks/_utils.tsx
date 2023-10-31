/** 表示用のタイトル */
export const title = ({ url, title }: { url: string; title: string }) =>
  title || url || "無題のブックマーク";
