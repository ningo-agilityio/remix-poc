import { Link, useLoaderData } from "remix";
import type { Post } from "@prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { posts: Array<Post> };
export const loader = async () => {
  const data: LoaderData = {
    posts: await db.post.findMany()
  };
  return { data };
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
