import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder }) => {

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {

    e.preventDefault();

    if (search.trim()) {

      navigate(`/search?q=${search}`);

    }

  };

  return (

    <form
      onSubmit={handleSearch}
      className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 mb-10"
    >

      <FaSearch className="text-gray-400 text-lg" />

      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
      />

    </form>

  );
};

export default SearchBar;