import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-sky-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500" />
    </div>
  );
};

export default Loading;
