type Props<T> = {
  list: readonly T[];
  children: (item: T, index: number) => React.ReactNode;
  fallback: () => React.ReactNode;
};

/** 配列からリスト要素を生成する。空配列の場合のフォールバックを提供する */
export const List = <T,>(props: Props<T>) => {
  return props.list.length > 0
    ? props.list.map(props.children)
    : props.fallback();
};
