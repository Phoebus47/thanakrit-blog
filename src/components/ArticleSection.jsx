import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { CategorySelector } from "./CategorySelector";
import { debounce } from "lodash";

// StyledTabs
export function StyledTabs() {
  const [category, setCategory] = useState("Highlight");
  const [page, setPage] = useState(1);
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  const { posts, hasMore, isLoading, error, fetchPosts } = useFetchPosts(
    category,
    page
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category, page, fetchPosts]);

  return (
    <div className="w-full mt-4 text-neon-orange txt-shadow-neon-orange">
      <div className="flex justify-between items-center bg-slate-900/80 border border-neon-orange rounded-lg px-4 py-3 shadow-neon-orange gap-10">
        <CategorySelector
          type="tabs"
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
        />
        <SearchBar />
      </div>

      {/* รายการโพสต์ */}

      <h2 className="text-lg font-bold mt-4">{`Blogs in ${category}`}</h2>

      {isLoading && posts.length === 0 ? (
        <p className="text-gray-500 mt-4">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">
          Something went wrong. Please try again.
        </p>
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-8 mt-4">
            {posts.map((blog, index) => (
              <BlogCard
                key={`blog-${index}`}
                postId={blog.id}
                title={blog.title}
                image={blog.image}
                category={blog.category}
                description={blog.description}
                author={blog.author}
                date={new Date(blog.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-8">
              <button
                className="text-neon-orange txt-shadow-neon-orange border border-neon-orange rounded-lg px-4 py-2 hover:text-neon-yellow hover:bg-neon-orange/50 active:bg-neon-orange"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "View More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500 mt-4">No posts found in this category.</p>
      )}
    </div>
  );
}

// CategoryDropDown
export function CategoryDropDown() {
  const [category, setCategory] = useState("Highlight");
  const [page, setPage] = useState(1);
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  const { posts, hasMore, isLoading, error, fetchPosts } = useFetchPosts(
    category,
    page
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category, page, fetchPosts]);

  return (
    <div className="w-full mt-4 text-neon-orange txt-shadow-neon-orange">
      <SearchBar />

      {/* Navigation Menu */}
      <CategorySelector
        type="dropdown"
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        className="w-full"
      />
      {/* รายการ Blog ที่กรองแล้ว */}
      <h2 className="text-lg font-bold mt-4">{`Blogs in ${category}`}</h2>

      {isLoading && posts.length === 0 ? (
        <p className="text-gray-500 mt-4">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">
          Something went wrong. Please try again.
        </p>
      ) : posts.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 gap-4 mt-4">
            {posts.map((blog, index) => (
              <li key={`blog-${index}`}>
                <BlogCard
                  postId={blog.id}
                  title={blog.title}
                  image={blog.image}
                  category={blog.category}
                  description={blog.description}
                  author={blog.author}
                  date={new Date(blog.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                />
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="text-neon-orange txt-shadow-neon-orange border border-neon-orange rounded-lg px-4 py-2 hover:text-neon-yellow hover:bg-neon-orange/50 active:bg-neon-orange"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "View More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500 mt-4">No posts found in this category.</p>
      )}
    </div>
  );
}

export function SearchBar({ onSearch }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // เก็บตำแหน่งที่เลือกใน dropdown
  const [isFilled, setIsFilled] = useState(false); // ตรวจสอบว่าได้เติมค่าแล้วหรือยัง
  const navigate = useNavigate();

  // Debounced function to fetch suggestions
  const fetchSuggestions = useCallback(
    debounce(async (keyword) => {
      if (keyword.length > 0) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://blog-post-project-api.vercel.app/posts?search=${keyword}`
          );
          // Filter suggestions based on keyword
          const filteredSuggestions = response.data.posts.filter(
            (post) => post.title.toLowerCase().includes(keyword.toLowerCase()) // กรอง title ที่มี keyword
          );
          setSuggestions(filteredSuggestions);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]); // หากไม่มีคำค้นหาจะล้างคำแนะนำ
      }
    }, 500),
    []
  );

  // Handle the search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
    fetchSuggestions(value); // Trigger debounced search
    onSearch && onSearch(value); // Pass searchKeyword to parent if needed
  };

  // Handle keydown for arrow navigation and Enter key
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Move down the list
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      // Move up the list
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      // If a suggestion is selected, fill the input with the selected suggestion
      if (selectedIndex >= 0 && !isFilled) {
        setSearchKeyword(suggestions[selectedIndex].title); // Fill input with selected suggestion
        setIsFilled(true); // Mark as filled
      } else {
        // If already filled, navigate to the post or perform search
        if (selectedIndex >= 0) {
          navigate(`/post/${suggestions[selectedIndex].id}`);
        } else {
          navigate(`/search?query=${searchKeyword}`);
        }
      }
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (selectedIndex >= 0) {
      navigate(`/post/${suggestions[selectedIndex].id}`);
    } else {
      navigate(`/search?query=${searchKeyword}`);
    }
  };

  // Handle dropdown item click
  const handleDropdownItemClick = (suggestion) => {
    setSearchKeyword(suggestion.title); // Autofill the input with the selected suggestion's title
    setSelectedIndex(suggestions.indexOf(suggestion)); // Set the selected index
    setShowDropdown(false); // Close the dropdown
    setIsFilled(true); // Mark as filled when a suggestion is clicked
  };

  useEffect(() => {
    // Clean up the debounced function on unmount
    return () => {
      fetchSuggestions.cancel();
    };
  }, [fetchSuggestions]);

  return (
    <div className="relative rounded-lg bg-orange-200 hover:bg-orange-300 border border-neon-orange shadow-neon-orange w-full flex items-center">
      <Input
        className="text-orange-500 placeholder-orange-400 pl-4 pr-12 py-2 w-full bg-transparent focus:outline-none rounded-lg font-orbitron"
        type="text"
        name="search"
        placeholder="Search…"
        aria-label="search"
        value={searchKeyword}
        onChange={handleSearch}
        onKeyDown={handleKeyDown} // Handle keydown for arrow keys and enter
        onFocus={() => setShowDropdown(true)}
        onBlur={(e) => {
          if (!e.relatedTarget || !e.relatedTarget.closest(".dropdown-item")) {
            setShowDropdown(false);
          }
        }}
      />
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-orange-200 shadow-neon-orange z-10">
          {isLoading ? (
            <p className="p-2 text-gray-500">Loading...</p>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                className={`dropdown-item w-full items-center p-2 hover:bg-orange-300 hover:rounded-lg cursor-pointer ${
                  selectedIndex === index ? "bg-orange-300 rounded-lg" : ""
                }`} // Highlight the selected suggestion
                onClick={() => handleDropdownItemClick(suggestion)} // Select suggestion
              >
                {suggestion.title}
              </button>
            ))
          ) : (
            <p className="p-2 text-gray-500">No results found</p>
          )}
        </div>
      )}
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 hover:text-neon-orange"
        onClick={handleSearchClick} // Search or select suggestion
      >
        <SearchIcon />
      </button>
    </div>
  );
}

// BlogCard
export function BlogCard({
  postId, // รับค่า postId
  image,
  category,
  title,
  description,
  author,
  date,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Dynamic Link */}
      <Link to={`/post/${postId}`} className="relative h-[212px] sm:h-[360px]">
        <img
          className="w-full h-full object-cover rounded-md"
          src={image || "https://via.placeholder.com/300"}
          alt={title}
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex">
          <span className="bg-none border shadow-neon-blue rounded-full px-3 py-1 text-sm font-semibold inset-ring text-neon-blue txt-shadow-neon-blue hover:border-neon-blue hover:bg-neon-blue hover:text-white mb-2">
            {category || "Uncategorized"}
          </span>
        </div>
        <Link to={`/post/${postId}`}>
          <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline">
            {title || "Untitled"}
          </h2>
        </Link>
        <p className="text-white txt-shadow-neon-yellow text-sm mb-4 flex-grow line-clamp-3">
          {description || "No description available."}
        </p>
        <div className="flex items-center text-sm">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={author || "Unknown"}
          />
          <span>{author || "Unknown Author"}</span>
          <span className="mx-2 text-white">|</span>
          <span>{date || "Unknown Date"}</span>
        </div>
      </div>
    </div>
  );
}

// ArticleSection
function ArticleSection() {
  return (
    <main className="max-w-10/12 mx-auto bg-slate-950/70 border border-neon-orange inset-ring shadow-neon-orange p-6 md:p-8 rounded-lg w-full">
      <h1 className="text-3xl font-semibold text-neon-yellow txt-shadow-neon-orange text-left mb-4">
        Latest Articles
      </h1>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center w-full space-y-4">
        <CategoryDropDown />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-col md:gap-6">
        <div className="flex justify-between items-center">
          <StyledTabs />
        </div>
      </div>
    </main>
  );
}

export default ArticleSection;
