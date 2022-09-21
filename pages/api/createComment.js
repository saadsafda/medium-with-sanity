import sanityClient from "@sanity/client";
import { config } from "../../utils/config";

const newConfig = {
  ...config,
  useCdn: true,
  token: process.env.SANITY_AUTH_TOKEN,
};

const client = sanityClient(newConfig);

export default async function createComment(req, res) {
  const { _id, name, email, comment } = req.body;
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    return res.status(500).json({ message: `Couldn't submit comment`, err });
  }
  return res.status(200).json({ message: "Comment Submitted" });
}
