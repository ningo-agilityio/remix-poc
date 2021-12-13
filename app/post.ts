import path from "path";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";
import AWS, { S3 } from 'aws-sdk';

require('dotenv').config();

const BUCKET_NAME = 'remixpoc';
const FOLDER_NAME = 'posts-data';

AWS.config.update({
  accessKeyId: process.env.VERCEL_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VERCEL_AWS_SECRET_ACCESS_KEY_ID,
  region: 'us-east-1'
});

export type Post = {
  slug: string;
  title: string;
  html: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

export type NewPost = {
  title: string;
  slug: string;
  markdown: string;
};

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

// relative to the server output not the source!
const postsPath = path.join(__dirname, "..")

const normalizePost = async (data: any[]) => {
  const posts: Post[] = [];

  const promises = data.map(async (filename: any) => {
    const key = (filename as any).Key
    const file = await new S3().getObject({ Bucket: BUCKET_NAME, Key: key }).promise();
    const body = Buffer.from((file as any).Body).toString('utf8');

    const { attributes } = parseFrontMatter(
      body.toString()
    );

    if (!(attributes as any).title) {
      return
    }

    posts.push({
      slug: key.replace(`${FOLDER_NAME}/`, "").replace(/\.md$/, ""),
      title: (attributes as any).title,
      html: body
    });
  })

  await Promise.all(promises as any)

  return posts
}

export async function getPosts() {
  const data = await (new S3().listObjectsV2({
    Bucket: BUCKET_NAME, /* required */
    Prefix: FOLDER_NAME  // Can be your folder name
  }) as any).promise();
  return await normalizePost((data as any).Contents);
}

export async function getPost(slug: string) {
  const file = await new S3().getObject({ Bucket: BUCKET_NAME, Key: `${FOLDER_NAME}/${slug}.md` }).promise();
  const content = Buffer.from((file as any).Body).toString('utf8');
  const { attributes, body } = parseFrontMatter(
    content.toString()
  );
  if (!(attributes as any).title) {
    return
  }

  invariant(
    isValidPostAttributes(attributes),
    `Post ${slug} is missing attributes`
  );
  const html = marked(body);
  return { slug, html, title: attributes.title };
}

export async function createPost(post: NewPost) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  let params = {
    Bucket: BUCKET_NAME,
    Key: `${FOLDER_NAME}/${post.slug}.md`,
    Body: md
  };
  await new AWS.S3().putObject(params).promise();
  return await getPost(post.slug);
}
