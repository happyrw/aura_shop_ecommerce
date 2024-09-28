import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
    apiVersion: "2023-09-01",
    useCdn: true,
    token: process.env.SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

// eslint-disable-next-line
export const urlFor = (source: any) => builder.image(source);
