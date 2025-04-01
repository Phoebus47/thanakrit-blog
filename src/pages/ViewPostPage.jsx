import { Navbar, Footer } from "../components/WebSection";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function ViewPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://i.imgur.com/UASlokn.jpg";
    img.crossOrigin = "anonymous";
    img.onload = () => setBackgroundLoaded(true);

    if (!document.cookie.includes("yourCookie=value")) {
      document.cookie = "yourCookie=value; path=/; Secure; SameSite=None";
    }
  }, []);

  useEffect(() => {
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
      <div
        className={`font-orbitron ${
          backgroundLoaded
            ? "bg-[url(https://i.imgur.com/UASlokn.jpg)]"
            : "bg-slate-950" // สีพื้นหลังชั่วคราวระหว่างโหลด
        } bg-fixed bg-cover md:bg-contain sm:bg-cover bg-center`}
      >
        <Navbar />
        <div className="container mx-auto px-4 py-8 markdown">
          <div className="max-w-full mx-auto">
            {loading ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : post ? (
              <>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full mb-8 rounded-lg shadow-lg markdown.img"
                  />
                )}
                <h1 className="text-neon-yellow txt-shadow-neon-yellow text-3xl font-semibold mb-4">
                  {post.title}
                </h1>
                <p className="text-white mb-8">{post.description}</p>
                <div className="text-white mb-8">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
              </>
            ) : (
              <p className="text-red-500 text-center">Post not found.</p>
            )}
            <Link
              to="/"
              className="text-neon-pink hover:text-gray-300 transition duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ViewPostPage;
