"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`?q=${searchTerm}&page=1`);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim()) {
      router.push(`?q=${e.target.value}&page=1`);
    } else {
      router.push(`?page=1`);
    }
  };

  return (
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
  );
}
