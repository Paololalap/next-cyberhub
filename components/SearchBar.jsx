"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ tags }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() || selectedTags.length) {
      router.push(`?q=${searchTerm}&page=1&tags=${selectedTags.join(",")}`);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() || selectedTags.length) {
      router.push(`?q=${e.target.value}&page=1&tags=${selectedTags.join(",")}`);
    } else {
      router.push(`?page=1`);
    }
  };

  const toggleTag = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    if (searchTerm.trim() || newSelectedTags.length) {
      router.push(`?q=${searchTerm}&page=1&tags=${newSelectedTags.join(",")}`);
    } else {
      router.push(`?page=1`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSearch}
        className="mx-auto mt-5 flex w-full max-w-md items-center overflow-hidden rounded-lg bg-white shadow-md"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          className="w-full p-4 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#8a1438] p-4 text-white transition duration-300 hover:bg-[#8a1438]/50 focus:outline-none"
        >
          Search
        </button>
      </form>
      <div className="flex w-screen max-w-[75rem] items-center justify-center">
        <div className="mt-4 flex justify-start gap-2 overflow-x-auto pb-2">
          {tags.map((tag) => (
            <div
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`cursor-pointer whitespace-nowrap rounded-full px-3 py-1 text-sm ${
                selectedTags.includes(tag)
                  ? "bg-[#8a1438] text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-gray-300`}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
