import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { CategorySelector } from "./CategorySelector";
import { debounce } from "lodash";
import axios from "axios";

interface SearchBarProps {
  onSearch?: (value: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFilled, setIsFilled] = useState(false);
  const navigate = useNavigate();

  // แก้ไข fetchSuggestions ให้ใช้ backend API
  const fetchSuggestions = useCallback(
    debounce(async (keyword: string) => {
      if (keyword.length > 0) {
        setIsLoading(true);
        try {
          const response = await axios.get(`/posts?keyword=${keyword}&limit=5`);
          
          const data = response.data;
          setSuggestions(data.posts || []);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500),
    []
  );

  // Handle the search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);
    fetchSuggestions(value); // Trigger debounced search
    onSearch && onSearch(value); // Pass searchKeyword to parent if needed
  };

  // Handle keydown for arrow navigation and Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  const handleDropdownItemClick = (suggestion: any) => {
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
    <div className="relative rounded-lg bg-neon-yellow/10 hover:bg-neon-yellow/20 border border-neon-orange shadow-neon-orange w-full flex items-center">
      <Input
        className="text-neon-orange pl-4 pr-12 py-2 w-full bg-transparent border border-neon-orange shadow-[0_0_12px_#ffe066] focus:outline-none focus:border-neon-yellow focus:shadow-[0_0_24px_#ffe066] rounded-lg font-orbitron placeholder:text-neon-yellow placeholder:font-semibold transition-all duration-300"
        type="text"
        name="search"
        placeholder="Search…"
        aria-label="search"
        value={searchKeyword}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(true)}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          if (!e.relatedTarget || !(e.relatedTarget as HTMLElement).closest(".dropdown-item")) {
            setShowDropdown(false);
          }
        }}
      />
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-gradient-to-br from-slate-900/90 via-yellow-900/30 to-yellow-100/0 border border-yellow-300/30 shadow-[0_0_24px_#ffe066] z-10">
          {isLoading ? (
            <p className="p-2 text-neon-yellow">Loading...</p>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                className={`dropdown-item w-full items-center p-2 text-neon-yellow font-semibold bg-transparent hover:bg-yellow-300/20 hover:text-neon-orange hover:rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedIndex === index
                    ? "bg-yellow-300/20 text-neon-orange rounded-lg"
                    : ""
                }`}
                onClick={() => handleDropdownItemClick(suggestion)}
              >
                {suggestion.title}
              </button>
            ))
          ) : (
            <p className="p-2 text-neon-yellow">No results found</p>
          )}
        </div>
      )}
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 text-neon-yellow hover:text-neon-orange drop-shadow-[0_0_8px_#ffe066] transition-all duration-200"
        aria-label="Search"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleSearchClick}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

// StyledTabs
export function StyledTabs() {
  const [category, setCategory] = useState("Highlight");
  const [page, setPage] = useState(1);
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  const { posts, hasMore, isLoading, error, fetchPosts } = useFetchPosts(
    category,
    page,
    "" // Add empty searchQuery parameter
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    fetchPosts();
  }, [category, page, fetchPosts]);

  return (
    <div className="w-full mt-4 text-neon-orange txt-shadow-neon-orange">
      <div className="flex justify-between items-center bg-gradient-to-r from-slate-900/80 via-yellow-900/10 to-yellow-100/0 border border-neon-orange rounded-lg px-4 py-3 shadow-[0_0_24px_#ffe066] gap-10">
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

      {isLoading && (!Array.isArray(posts) || posts.length === 0) ? (
        <p className="text-gray-500 mt-4">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">
          Something went wrong. Please try again.
        </p>
      ) : Array.isArray(posts) && posts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-8 mt-4">
            {posts.map((blog, index) => (
              <BlogCard
                key={`blog-${blog.id || index}`}
                postId={blog.id}
                title={blog.title}
                image={blog.image}
                category={blog.category}
                description={blog.description}
                users={blog.users}
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
    page,
    "" // Add empty searchQuery parameter
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [category]);

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
        className="w-full bg-gradient-to-r from-slate-900/80 via-yellow-900/10 to-yellow-100/0 border border-neon-orange shadow-[0_0_16px_#ffe066] rounded-lg font-bold text-neon-orange txt-shadow-neon-orange"
      />
      {/* รายการ Blog ที่กรองแล้ว */}
      <h2 className="text-lg font-bold mt-4">{`Blogs in ${category}`}</h2>

      {isLoading && (!Array.isArray(posts) || posts.length === 0) ? (
        <p className="text-gray-500 mt-4">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">
          Something went wrong. Please try again.
        </p>
      ) : Array.isArray(posts) && posts.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 gap-4 mt-4">
            {posts.map((blog, index) => (
              <li key={`blog-${blog.id || index}`}>
                <BlogCard
                  postId={blog.id}
                  title={blog.title}
                  image={blog.image}
                  category={blog.category}
                  description={blog.description}
                  users={blog.users}
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

interface BlogCardProps {
  postId: string;
  image?: string;
  category: string;
  title: string;
  description: string;
  users?: any; // Can be refined later with proper User type
  date: string;
}

export function BlogCard({
  postId, // รับค่า postId
  image, // รูปที่ใช้ (ถ้ามี)
  category,
  title,
  description,
  users, // เปลี่ยนจาก user เป็น users
  date,
}: BlogCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Dynamic Link */}
      <Link to={`/post/${postId}`} className="relative h-[212px] sm:h-[360px]">
        <img
          className="w-full h-full object-cover rounded-md"
          src={image}
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
            className="w-8 h-8 rounded-full object-cover mr-2"
            src={users?.profile_pic || "/images/avartar.webp"} // Use users profile pic
            alt={users?.name || "Unknown"}
          />
          <span>{users?.name || "Unknown Author"}</span>
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
    <main className="max-w-10/12 mx-auto bg-gradient-to-br from-orange-100/10 via-yellow-100/5 to-yellow-100/0 border border-orange-300 shadow-[0_0_32px_4px_#ffe066] p-6 md:p-8 rounded-2xl w-full backdrop-blur-md">
      <h1 className="text-4xl font-semibold bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300 bg-clip-text text-transparent txt-shadow-neon-orange text-left mb-4 drop-shadow-[0_0_18px_#ffe066]">
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
