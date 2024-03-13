import React from "react";
import Headline from "@/components/headline"
const Newspage = () => {
  return (
    <div id="page" className="bg-[#ffffff]  h-screen items-center">
      <div
        id="news-container"
        className="items-center bg-transparent flex-col justify-center   "
      >
        <div
          id="news-container-title"
          className="text-center text-2xl font-semibold p-5 flex-col justify-center items-center"
        >
          <span>News and Updates</span>
          <hr className="border-2 border-solid border-black w-64 mx-auto" />
        </div>
        <Headline></Headline>
      </div>
    </div>
  );
};

export default Newspage;
