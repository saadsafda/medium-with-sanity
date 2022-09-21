import imageUrlBuilder from "@sanity/image-url";
import { createCurrentUserHook, createClient } from "next-sanity";

export const config = {
  projectId: "tghrr5u3",
  dataset: "production",
};

export const sanityClient = createClient({
  ...config,
  useCdn: false,
});

export const urlFor = (source) => imageUrlBuilder(config).image(source);

export const useCurrentUser = createCurrentUserHook(config);
