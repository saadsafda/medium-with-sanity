import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import PortableText from "react-portable-text";
import Comments from "../../components/Comments";
import Thanks from "../../components/Thanks";
import { config, sanityClient, urlFor } from "../../utils/config";
import { Store } from "../../utils/Store";

const Blog = ({ post }) => {
  const [submitted, setSubmitted] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("/api/createComment", data)
      .then((res) => {
        console.log(res);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()}
        alt=""
      />

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          {post.author.image ? (
            <img
              src={urlFor(post.author.image).url()}
              alt="author"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full text-sm items-center font-bold flex justify-center bg-gray-300 capitalize flex-shrink-0 object-cover object-center">
              {post.author.name.slice(0, 1)}
            </div>
          )}
          <p className="font-extralight text-sm ">
            Blog post by{" "}
            <span className="text-green-600">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            className=""
            dataset={config.dataset}
            projectId={config.projectId}
            content={post.body}
            serializers={{
              h1: (props) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              em: (props) => <i className="italic" {...props} />,
              highlight: (props) => (
                <span className="bg-yellow-200 rounded" {...props} />
              ),
              li: ({ children }) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              code: ({ children }) => (
                <div className="bg-gray-200 p-2 rounded">
                  <code className="language-js">{children}</code>
                </div>
              ),
              blockquote: ({ children }) => (
                <figure className="border-0 border-l-4 pl-3 my-4 rounded">
                  <blockquote className="language-js">{children}</blockquote>
                </figure>
              ),
              link: ({ href, children }) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg mx-auto my-5 border border-yellow-500" />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-yellow-500">
              Enjoyed this article?
            </p>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Leave a comment below!
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            {submitted ? (
              <Thanks />
            ) : (
              userInfo && (
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  <input
                    {...register("_id")}
                    type="hidden"
                    name="_id"
                    value={post._id}
                  />
                  <input
                    {...register("name")}
                    type="hidden"
                    id="name"
                    name="name"
                    value={userInfo.name}
                  />
                  <input
                    {...register("email")}
                    type="hidden"
                    name="email"
                    value={userInfo.email}
                  />
                  <div className="flex items-center border-b border-yellow-500 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      {...register("comment", { required: true })}
                      id="comment"
                      name="comment"
                    />
                    <button
                      className="flex-shrink-0 bg-yellow-500 hover:bg-yellow-700 border-yellow-500 hover:border-yellow-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                  {errors.comment && (
                    <p className="text-red-500">
                      -The comment feild is requrid
                    </p>
                  )}
                </form>
              )
            )}
          </div>
          {post.comments.length > 0 && <Comments array={post.comments} />}
        </div>
      </section>
    </div>
  );
};

export default Blog;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
          current
        }
      }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
