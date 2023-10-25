type Props = {
  id: number;
  content: React.ReactNode;
  createdAt: Date;
};

export const ResuView: React.FC<Props> = ({ id, content, createdAt }) => {
  return (
    <li key={id}>
      <h2>{content}</h2>
      <time>{createdAt.toISOString()}</time>
    </li>
  );
};
