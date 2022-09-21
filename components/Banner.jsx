import React from "react";

function Banner() {
  return (
    <div className="body-font bg-[#FFC017] border-solid border-black border border-t-0 border-x-0">
      <div className="container flex flex-wrap px-5 pt-10 py-24 mx-auto justify-between items-center">
        <div className="md:pr-12 md:py-8 mb-10 md:mb-0 pb-10">
          <h1 className="sm:text-8xl text-2xl font-normal title-font font-serif text-gray-900 mb-9">
            Stay curious.
          </h1>
          <p className="text-2xl leading-6 w-4/5 mb-12">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <a className="text-white font-bold bg-black rounded-full py-1 text-lg px-12 inline-flex items-center mt-4">
            Start reading
          </a>
        </div>
        <div className="hidden xl:flex flex-row font-sans font-semibold text-lg">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-start-2 col-span-4 animate-pulse ...">M</div>
            <div className="col-start-1 col-end-3 ...">MMMM</div>
            <div className="col-end-7 col-span-2 animate-pulse ...">M</div>
            <div className="col-start-1 col-end-7  animate-pulse ...">M</div>
            <div className="col-start-2 col-span-4 ...">M</div>
            <div className="col-start-1 col-end-3 ...">M</div>
            <div className="col-end-7 col-span-2 ...">M</div>
            <div className="col-start-1 col-end-7 animate-pulse ...">M</div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-start-2 col-span-4 ...">M</div>
            <div className="col-start-1 col-end-3 ...">MM</div>
            <div className="col-end-7 col-span-2 animate-pulse ...">M</div>
            <div className="col-start-1 col-end-7 animate-pulse ...">M M</div>
            <div className="col-start-2 col-span-4 ...">MMM</div>
            <div className="col-start-1 col-end-3 ...">M</div>
            <div className="col-end-7 col-span-2 ...">M</div>
            <div className="col-span-2 ...">M</div>
            <div className="...">M</div>
            <div className="...">M</div>
            <div className="col-span-2 ...">M</div>
            <div className="col-start-1 col-end-7 ...">MMMM</div>
            <div className="col-start-1 col-end-3 ...">M</div>
            <div className="col-end-7 col-span-2 ...">M</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="...">M</div>
            <div className="animate-pulse ...">M</div>
            <div className="...">M</div>
            <div className="col-span-2 ...">M</div>
            <div className=" animate-pulse ...">M</div>
            <div className="col-span-2 ...">MM</div>
            <div className="animate-pulse ...">M</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
