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
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "6"
      });

      if (category && category !== "Highlight") {
        const categoryMap = { "Cat": "1", "Inspiration": "2", "General": "3" };
        if (categoryMap[category]) {
          params.append('category', categoryMap[category]);
        }
      }

      if (searchQuery) {
        params.append('keyword', searchQuery);
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts?${params}`);
      
      if (!response.ok) throw new Error('Failed to fetch posts');
      
      const data = await response.json();

      setPosts((prevPosts) =>
        page === 1 ? data.posts : [...prevPosts, ...data.posts]
      );
      
      setHasMore(data.pagination.hasMore);
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
