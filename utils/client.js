import sanityClient from "@sanity/client";
import {config} from "./config";
const client = sanityClient({
  ...config,
  useCdn: true,
});
export default client;
