import client from "../../../utils/client";

export default async function handler(req, res) {
  const query = `*[_type=="post"]`;
  const blogs = await client.fetch(query);
  if (blogs) {
    console.log(blogs.body);
    res.status(200).json(blogs);
  } else {
    res.status(401).send({ message: "Invalid request" });
  }
}
