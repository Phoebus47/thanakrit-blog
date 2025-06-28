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

      console.log("Making API request to:", `/posts?${params}`); // Debug log
      const response = await axios.get<Post[] | PostsResponse>(`/posts?${params}`);
      
      const data = response.data;
      
      console.log("API Response:", data); // Debug log
      
      // Handle different response structures and ensure type safety
      let newPosts: Post[] = [];
      let calculatedHasMore = false;
      
      if (Array.isArray(data)) {
        // Direct array response
        newPosts = data;
        calculatedHasMore = data.length >= 6;
        console.log("Array response detected, posts:", newPosts.length, "hasMore:", calculatedHasMore);
      } else {
        // Object response (PostsResponse type)
        const postData = data as PostsResponse;
        newPosts = postData.posts || postData.data || [];
        
        // Type-safe pagination check
        const pagination = postData.pagination;
        if (pagination && typeof pagination.hasMore === 'boolean') {
          calculatedHasMore = pagination.hasMore;
        } else if (typeof postData.hasMore === 'boolean') {
          calculatedHasMore = postData.hasMore;
        } else {
          calculatedHasMore = newPosts.length >= 6;
        }
        console.log("Object response detected, posts:", newPosts.length, "hasMore:", calculatedHasMore);
      }
      
      // Ensure newPosts is always an array
      if (!Array.isArray(newPosts)) {
        console.warn("newPosts is not an array, resetting to empty array:", newPosts);
        newPosts = [];
      }
      
      setPosts((prevPosts) =>
        page === 1 ? newPosts : [...prevPosts, ...newPosts]
      );
      
      setHasMore(calculatedHasMore);
      
      console.log("Posts loaded:", newPosts.length, "HasMore:", calculatedHasMore); // Debug log
    } catch (error) {
      console.error("Error fetching posts:", error);
      
      // More detailed error logging
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url
        });
        
        if (error.response?.status === 404) {
          setError("Posts not found.");
        } else if (error.response?.status && error.response.status >= 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(`Error: ${error.response?.statusText || error.message}`);
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [category, page, searchQuery]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, hasMore, isLoading, error, fetchPosts };
}
