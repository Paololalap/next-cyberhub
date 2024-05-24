'use client'
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
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        className="rounded border p-2"
      />
      <button type="submit" className="ml-2 rounded bg-blue-500 p-2 text-white">
        Search
      </button>
    </form>
  );
}
