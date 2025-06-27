import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { Post, PostsResponse, UseFetchPostsReturn } from "../types";

export function useFetchPosts(
  category: string, 
  page: number, 
  searchQuery: string = ""
): UseFetchPostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "6"
      });

      if (category && category !== "Highlight") {
        const categoryMap: Record<string, string> = { 
          "Cat": "1", 
          "Inspiration": "2", 
          "General": "3" 
        };
        if (categoryMap[category]) {
          params.append('category', categoryMap[category]);
        }
      }

      if (searchQuery) {
        params.append('keyword', searchQuery);
      }

      const response = await axios.get(`/posts?${params}`);
      
      const data: PostsResponse = response.data;

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
