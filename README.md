# Remix POC Blogs
## Features:
  + User can see blog list
  + User can add new blog
## Tech stacks:
  + [Remix Docs](https://remix.run/docs)
  + [Vercel](https://vercel.com/docs)
  + [AWS S3](https://aws.amazon.com/pm/serv-s3/?trk=ps_a134p000004f2aOAAQ&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_US&sc_publisher=Google&sc_category=Storage&sc_country=US&sc_geo=NAMER&sc_outcome=acq&sc_detail=aws%20s3&sc_content=S3_e&sc_matchtype=e&sc_segment=488982706719&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Storage|S3|US|EN|Text&s_kwcid=AL!4422!3!488982706719!e!!g!!aws%20s3&ef_id=CjwKCAiA-9uNBhBTEiwAN3IlNNyA326uRziH62a7O7mYkod6SGusPBUn6Isk-4PgE8703XftuFnULRoCb2AQAvD_BwE:G:s&s_kwcid=AL!4422!3!488982706719!e!!g!!aws%20s3)
## Used hooks/apis/components:
### **Clients**
  + [useLoaderData](https://remix.run/docs/en/v1/api/remix#useloaderdata): This hook returns the JSON parsed data from your route loader function
  + [useTransition](https://remix.run/docs/en/v1/api/remix#usetransition): This hook tells you everything you need to know about a page transition to build pending navigation indicators and optimistic UI on data mutations
  + [useActionData](https://remix.run/docs/en/v1/api/remix#useactiondata): This hook returns the JSON parsed data from your route action. It returns undefined if there hasn't been a submission at the current location yet.
  + [Link](https://remix.run/docs/en/v1/guides/accessibility#links): Renders a standard anchor tag, meaning that you get its accessibility behaviors from the browser for free!
  + [Outlet](https://reactrouter.com/docs/en/v6/api#outlet): An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. 
### **Server**
  + [loader](https://remix.run/docs/en/v1/api/conventions#loader): Each route can define a "loader" function that will be called on the server before rendering to provide data to the route.
  + [links](https://remix.run/docs/en/v1/tutorials/blog): Each route can export a links function that returns array of <link> tags, except in object form instead of HTML. This allows Remix to merge all of your rendered routes links together and render them in the <Links/> element at the top of your document

## Deployment
- **Results**: https://remix-poc.vercel.app/

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
yarn install
```

Afterwards, start the Remix development server like so:

```sh
yarn run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.

To **deploy**:

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).
