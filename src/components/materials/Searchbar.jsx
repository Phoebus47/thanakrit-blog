import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

// SearchBar with debounce and search functionality
export function SearchBar() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const findPosts = async (query) => {
    try {
      if (!query) return;
      const response = await axios.get(
        `https://blog-post-project-api.vercel.app/posts?search=${query}`
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    findPosts(""); // Fetch all posts initially
  }, []);

  // Debounce function
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const optimizedFindPosts = useCallback(debounce(findPosts), []);

  const handleSearch = (e) => {
    optimizedFindPosts(e.target.value);
  };

  useEffect(() => {
    setSearchResults(posts);
  }, [posts]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="relative rounded-lg bg-orange-200 hover:bg-orange-300 border border-neon-orange shadow-neon-orange w-full flex items-center">
      <input
        className="text-orange-500 placeholder-orange-400 pl-4 pr-12 py-2 w-full bg-transparent focus:outline-none rounded-lg font-orbitron"
        placeholder="Search…"
        aria-label="search"
        id="search-input-1"
        name="search"
        value={input}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch(e)} // Use handleSearch on Enter
      />
      <button
        onClick={(e) => handleSearch(e)} // Trigger search on button click
        className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 hover:text-neon-orange"
      >
        <SearchIcon />
      </button>
    </div>
  );
}

// AnotherSearchBar with callback for external search handling
export function AnotherSearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    onSearch(input); // Callback to external search handler
  };

  return (
    <div className="relative rounded-lg bg-orange-200 hover:bg-orange-300 border border-neon-orange shadow-neon-orange w-full flex items-center">
      <input
        type="text"
        className="text-orange-500 placeholder-orange-400 pl-4 pr-12 py-2 w-full bg-transparent focus:outline-none rounded-lg font-orbitron"
        placeholder="Search…"
        aria-label="search"
        id="search-input-2" // Unique id for this input field
        name="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter
      />
      <button
        onClick={handleSearch} // Trigger search on button click
        className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 hover:text-neon-orange"
      >
        <SearchIcon />
      </button>
    </div>
  );
}