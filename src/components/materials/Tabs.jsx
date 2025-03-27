import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/components/lib/utils";
import { BlogCard } from "./BlogCard";
import { useState, useEffect, useCallback } from "react";
import { SearchBar } from "./Searchbar";
import axios from "axios";

export function StyledTabs() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ รีเซ็ต state เมื่อเปลี่ยนหมวดหมู่
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setPosts([]);
  }, [category]);

  // ✅ ฟังก์ชันดึงข้อมูลโพสต์จาก API
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const categoryParam = category === "Highlight" ? "" : category;
      const response = await axios.get(
        "https://blog-post-project-api.vercel.app/posts",
        {
          params: {
            page: page,
            limit: 6,
            category: categoryParam,
          },
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

  // ✅ ดึงโพสต์เมื่อ `page` หรือ `category` เปลี่ยน
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
      <Tabs value={category} onValueChange={setCategory} className="w-full">
        {/* Header ของ Tabs */}
        <div className="flex justify-between items-center bg-slate-900/80 border border-neon-orange rounded-lg px-4 py-3 shadow-neon-orange gap-10">
          <TabsList className="w-full bg-transparent border-b border-neon-orange flex">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className={cn(
                  "tabs-trigger text-neon-orange txt-shadow-neon-orange hover:text-neon-yellow hover:bg-neon-orange/50",
                  category === cat &&
                    "cursor-not-allowed bg-neon-orange text-white"
                )}
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          <SearchBar />
        </div>

        {/* รายการโพสต์ */}
        <TabsContent value={category}>
          <h2 className="text-lg font-bold mt-4">{`Blogs in ${category}`}</h2>

          {isLoading && posts.length === 0 ? (
            <p className="text-gray-500 mt-4">Loading...</p>
          ) : error ? (
            <p className="text-red-500 mt-4">Something went wrong. Please try again.</p>
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-8 mt-4">
                {posts.map((blog) => (
                  <BlogCard
                    key={blog.id}
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
            <p className="text-gray-500 mt-4">
              No posts found in this category.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
