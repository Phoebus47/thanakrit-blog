import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export function useFetchPosts(category, page, searchQuery = "") {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const categoryParam = category === "Highlight" ? undefined : category; // ไม่กรอง category ถ้าเป็น Highlight
      const response = await axios.get(
        "https://blog-post-project-api.vercel.app/posts",
        {
          params: {
            page: page,
            limit: 6, // ปรับจำนวนโพสต์ต่อหน้า
            category: categoryParam,
            search: searchQuery, // รองรับการค้นหา
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
  }, [category, page, searchQuery]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, hasMore, isLoading, error, fetchPosts };
}
