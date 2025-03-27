import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import { cn } from "@/components/lib/utils";
import { BlogCard } from "./BlogCard";
import { useState, useEffect, useCallback } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AnotherSearchBar } from "./Searchbar";
import axios from "axios";

export function CategoryDropDown() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // รีเซ็ตค่าเมื่อเปลี่ยน category
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setPosts([]); // ล้างโพสต์เก่าก่อนโหลดใหม่
  }, [category]);

  // โหลดโพสต์
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);

    try {
      const categoryParam = category === "Highlight" ? "" : category;
      const response = await axios.get(
        "https://blog-post-project-api.vercel.app/posts",
        {
          params: { page: page, limit: 6, category: categoryParam },
        }
      );

      setPosts((prevPosts) =>
        page === 1
          ? response.data.posts
          : [...prevPosts, ...response.data.posts]
      );
      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [category, page]);

  // โหลดข้อมูลใหม่เมื่อ page หรือ category เปลี่ยน
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="w-full mt-4 text-neon-orange txt-shadow-neon-orange">
      <AnotherSearchBar />

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="w-full flex justify-between items-center px-3 py-2 font-bold txt-shadow-neon-orange">
              <span>{category}</span>
              <ExpandMoreIcon />
            </NavigationMenuTrigger>

            {/* รายการ Category */}
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setCategory(cat)}
                      value={cat}
                      className={cn(
                        "block w-full text-left rounded-md p-3 text-sm font-medium transition-colors txt-shadow-neon-orange",
                        category === cat
                          ? "bg-neon-orange text-white cursor-not-allowed"
                          : "hover:bg-neon-orange/50 hover:text-neon-yellow"
                      )}
                      disabled={category === cat}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* รายการ Blog ที่กรองแล้ว */}
      <h2 className="text-lg font-bold mt-4">{`Blogs in ${category}`}</h2>

      {isLoading && posts.length === 0 ? (
        <p className="text-gray-500 mt-4">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">Something went wrong. Please try again.</p>
      ) : posts.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 gap-4 mt-4">
            {posts.map((blog) => (
              <li key={blog.id}>
                <BlogCard
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
