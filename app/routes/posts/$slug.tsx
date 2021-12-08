import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getPost } from "../../../api/post";
import type { Post } from "../../../api/post";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export default function PostSlug() {
  const post: Post = useLoaderData();
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}
