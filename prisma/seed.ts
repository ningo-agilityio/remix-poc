import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getPosts().map(post => {
      return db.post.create({ data: post });
    })
  );
}

seed();

function getPosts() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      slug: "90s-mixtape",
      title: `90s Mixtape`
    },
    {
      slug: "my-first-post",
      title: `Isn't it great?`
    }
  ];
}
