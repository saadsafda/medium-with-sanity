import Link from "next/link";
import React from "react";
import { urlFor } from "../utils/config";

const Post = ({ blogs }) => {
  return (
    <div className="text-gray-600 body-font">
      <div className="flex flex-col text-center w-full pt-4">
        <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
          Recent post
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {blogs &&
          blogs.map((e, i) => {
            return (
              <Link key={i} href={`blogs/${e.slug.current}`}>
                <div className="group border rounded-lg overflow-hidden cursor-pointer">
                  <img
                    alt="team"
                    className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                    src={urlFor(e.mainImage).url()}
                  />
                  <div className="flex justify-between p-5">
                    <div>
                      <h1 className="text-lg font-bold">{e.title}</h1>
                      <p className="text-xs">
                        {e.description} by <b>{e.author.name}</b>
                      </p>
                    </div>
                    {e.author.image ? (
                      <img
                        src={urlFor(e.author.image).url()}
                        alt="author"
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full text-sm items-center font-bold flex justify-center bg-gray-300 capitalize flex-shrink-0 object-cover object-center">
                        {e.author.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Post;
