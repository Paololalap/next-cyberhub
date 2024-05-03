'use client'
import React from "react";
import Image from "next/image";
import formatDateToWords from "@/constants/DATE_TO_WORDS";
const Moreinfo = ({ title, author, date, tags, description, body, imageL }) => {
  return (
    <div className="flex flex-col bg-white p-8 sm:mx-40 sm:h-max sm:shadow-lg">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <div className="mb-4 text-gray-700">{author}</div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-gray-600">{formatDateToWords(date)}</div>
        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="item mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <Image
          src={imageL}
          alt="Content Image"
          width={1600}
          height={334}
          sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
          className="rounded-lg shadow-md"
        />
      </div>

      <p className="mb-4 text-gray-600">{description}</p>

      <p className="mb-4 text-gray-600">{body}</p>
    </div>
  );
};

export default Moreinfo;
