import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export function ViewPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();

  useEffect(() => {
    if (!postId) {
      console.error("Post ID is missing from the URL");
      return;
    }

    axios
      .get(`https://blog-post-project-api.vercel.app/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setPost(null);
        setLoading(false);
      });
  }, [postId]);

  return (
    <>
      <div className="container mx-auto px-4 py-8 markdown">
        <div className="max-w-full mx-auto">
          {loading ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : post ? (
            <>
              {post.image && (
                <img
                  src={`http://localhost:3001/proxy?url=${encodeURIComponent(
                    post.image
                  )}`}
                  alt="..."
                  className="w-full mb-8 rounded-lg shadow-lg markdown.img"
                />
              )}
              <div className="bg-slate-950/50 rounded-lg p-4 shadow-lg mb-4">
                <h1 className="text-neon-orange txt-shadow-neon-orange text-3xl font-semibold">
                  {post.title}
                </h1>
                <p className="text-white txt-shadow-neon-orange mb-8">
                  {post.description}
                </p>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4 shadow-lg">
                <ReactMarkdown
                  components={{
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-2xl text-neon-yellow txt-shadow-neon-orange mb-2"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p
                        className="text-white txt-shadow-neon-orange mb-4"
                        {...props}
                      />
                    ),
                    img: ({ node, ...props }) => {
                      const proxiedSrc = props.src?.startsWith("http")
                        ? `/api/image-proxy?url=${encodeURIComponent(
                            props.src
                          )}`
                        : props.src;

                      return (
                        <img
                          className="w-full rounded-lg shadow-lg my-4"
                          src={proxiedSrc}
                          alt={props.alt || ""}
                        />
                      );
                    },
                    a: ({ node, ...props }) => (
                      <a
                        className="text-neon-pink underline hover:text-white"
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc list-inside text-white mb-4"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-1" {...props} />
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <p className="text-red-500 text-center">Post not found.</p>
          )}
          <Link
            to="/"
            className="inline-block mt-8 text-neon-pink underline hover:text-white transition duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
