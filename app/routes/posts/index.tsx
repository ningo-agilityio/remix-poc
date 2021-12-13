import { useEffect, useState } from 'react'
import { Link, useLoaderData, useTransition } from "remix";
import { getPosts } from "../../post";
import type { Post } from "../../post";

export const loader = async () => {
  return await getPosts();
};

export default function Posts() {
  const [loading, setLoading] = useState(false)
  const posts = useLoaderData<Post[]>();
  const transition = useTransition()

  useEffect(() => {
    // if it's not idle then it's submitting a form and loading the next location loaders
    setLoading(transition.state !== "idle")
  }, [transition.state])

  return (
    <div>
      <h1>Posts</h1>
      {
        loading ? `Loading...` :
          < ul >
            {
              posts.map((post: Post) => (
                <li key={post.slug}>
                  <Link to={post.slug}>{post.title}</Link>
                </li>
              ))
            }
          </ul>
      }
    </div >
  );
}
