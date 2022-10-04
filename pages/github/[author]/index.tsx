import { useRouter } from "next/router";

export const Github = () => {
  const router = useRouter();
  const author = router.query.author;

  return (
    <div className="github">
      <div className="home__content">{author}</div>
    </div>
  );
};

export default Github;
