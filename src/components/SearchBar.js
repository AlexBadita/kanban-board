import React from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
        onChange={(e) => onSearch(e.target.value.toLowerCase())}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
}

export default SearchBar;
