import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar() {
  return (
    <div className="relative rounded-lg bg-orange-200 hover:bg-orange-300 border border-neon-orange shadow-neon-orange w-full">
      <div className="absolute left-0 top-0 flex items-center justify-center h-full px-4 pointer-events-none text-orange-500">
        <SearchIcon />
      </div>
      <input
        className="text-orange-500 placeholder-orange-400 pl-12 pr-4 py-2 w-full bg-transparent focus:outline-none rounded-lg font-orbitron"
        placeholder="Search…"
        aria-label="search"
        id="search-input-1"   // Unique id for this input field
        name="search"       
      />
    </div>
  );
}

export function AnotherSearchBar() {
  return (
    <div className="relative rounded-lg bg-orange-200 hover:bg-orange-300 border border-neon-orange shadow-neon-orange w-full">
      <div className="absolute left-0 top-0 flex items-center justify-center h-full px-4 pointer-events-none text-orange-500">
        <SearchIcon />
      </div>
      <input
        className="text-orange-500 placeholder-orange-400 pl-12 pr-4 py-2 w-full bg-transparent focus:outline-none rounded-lg font-orbitron"
        placeholder="Search…"
        aria-label="search"
        id="search-input-2"   // Unique id for this input field
        name="search"       
      />
    </div>
  );
}