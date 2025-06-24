import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { SmilePlus, Copy, Loader2, X } from "lucide-react";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "react-share";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@contexts/authentication";
import remarkGfm from "remark-gfm";

export function ViewPost({ onLoadingChange }) {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const param = useParams();
  const navigate = useNavigate();
  const { state } = useAuth();
  const user = state.user;

  useEffect(() => {
    if (onLoadingChange) onLoadingChange(true);
    getPost();
  }, []);

  const getPost = async () => {
    if (onLoadingChange) onLoadingChange(true);
    try {
      // Fetch post data from backend API
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts/${param.postId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Post not found');
      }

      const postData = await response.json();

      if (postData) {
        setImg(postData.image || "");
        setTitle(postData.title || "");
        setDate(postData.date || "");
        setDescription(postData.description || "");
        setCategory(postData.category || "");
        setContent(postData.content || "");
        setLikes(postData.likes_count || 0);
      }

      // Fetch comments from backend API (ต้องสร้าง API endpoint)
      const commentsResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/comments/${param.postId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        setComments(commentsData || []);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post data:", error);
      setIsLoading(false);
      navigate("*");
    } finally {
      if (onLoadingChange) onLoadingChange(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 container md:px-8 pb-20 md:pb-28 md:pt-8 lg:pt-16">
      <div className="space-y-4 px-4">
        <img
          src={img || "https://via.placeholder.com/800x400"}
          alt={title}
          className="rounded-lg object-cover w-full h-[260px] sm:h-[340px] md:h-[587px] mb-6"
        />
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-3/4 space-y-8 px-4">
          <article className="bg-gradient-to-br from-slate-900/80 via-fuchsia-900/40 to-blue-900/30 rounded-2xl p-6 shadow-[0_0_32px_4px_#ffe066] border border-yellow-300/30">
            <div className="flex items-center justify-start mb-4 gap-4">
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300 text-slate-900 font-semibold rounded-full px-3 py-1 text-sm shadow-[0_0_8px_#ffe066] border border-yellow-200/60">
                {category || "Uncategorized"}
              </span>
              <span className="text-yellow-200 txt-shadow-neon-orange text-sm font-semibold">
                {date
                  ? new Date(date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Date not available"}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_#ffe066] mb-2">
              {title}
            </h1>
            <p className="text-yellow-100/90 txt-shadow-neon-orange mb-4">
              {description || "No description available"}
            </p>
            <div className="markdown">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4 text-neon-yellow txt-shadow-neon-orange" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mb-3 text-neon-orange txt-shadow-neon-orange" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-semibold mb-2 text-neon-yellow" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 text-white" {...props} />,
                  a: ({node, ...props}) => <a className="text-neon-blue hover:text-neon-yellow underline" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4" {...props} />,
                  li: ({node, ...props}) => <li className="mb-2" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-neon-orange pl-4 italic mb-4" {...props} />,
                  code: ({node, inline, ...props}) => 
                    inline ? 
                      <code className="bg-slate-800 px-2 py-1 rounded text-neon-green" {...props} /> :
                      <code className="block bg-slate-800 p-4 rounded mb-4 text-neon-green overflow-x-auto" {...props} />
                }}
              >
                {content ? content.replace(/\\n/g, '\n').replace(/\\"/g, '"') : "No content available"}
              </ReactMarkdown>
            </div>
          </article>

          <div className="xl:hidden">
            <AuthorBio />
          </div>

          <Share
            likesAmount={likes}
            setDialogState={setIsDialogOpen}
            user={user}
            setLikes={setLikes}
          />
          <Comment
            setDialogState={setIsDialogOpen}
            commentList={comments}
            user={user}
            setComments={setComments}
          />
        </div>

        <div className="hidden xl:block xl:w-1/4">
          <div className="sticky top-4">
            <AuthorBio />
          </div>
        </div>
      </div>
      <CreateAccountModal
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
      />
    </div>
  );
}

function Share({ likesAmount, setDialogState, user, setLikes }) {
  const param = useParams();
  const [isLiking, setIsLiking] = useState(false);

  const handleLikeClick = async () => {
    if (!user) {
      return setDialogState(true);
    }

    setIsLiking(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: param.postId,
          user_id: user.id
        })
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.count);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const shareLink = encodeURI(window.location.href);

  return (
    <div className="md:px-4">
      <div className="bg-slate-950/50 rounded-2xl py-4 px-4 md:rounded-sm flex flex-col space-y-4 md:gap-16 md:flex-row md:items-center md:space-y-0 md:justify-between mb-10">
        <button
          onClick={handleLikeClick}
          disabled={isLiking}
          className={`flex items-center justify-center space-x-2 px-11 py-3 rounded-full font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300 text-slate-900 shadow-[0_0_12px_#ffe066] border border-yellow-200/60 hover:from-yellow-400 hover:to-orange-400 hover:shadow-[0_0_24px_#ffe066] transition-all duration-300 ${
            isLiking
              ? "bg-gray-800 cursor-not-allowed text-gray-500 border-gray-300"
              : ""
          }`}
        >
          <SmilePlus className="w-5 h-5" />
          <span className="font-medium">
            {likesAmount}
          </span>
        </button>
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              toast.custom((t) => (
                <div className="bg-neon-green text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full shadow-neon-green">
                  <div>
                    <h2 className="font-bold text-lg mb-1">Copied!</h2>
                    <p className="text-sm">
                      This article has been copied to your clipboard.
                    </p>
                  </div>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="text-white hover:text-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              ));
            }}
            className="bg-gradient-to-r from-neon-orange to-neon-pink flex flex-1 items-center justify-center space-x-2  px-6 md:px-11 py-3 rounded-full text-white border border-neon-pink shadow-[0_0_16px_#ff3ec9] hover:scale-105 hover:shadow-[0_0_32px_#ffe066] transition-all duration-300 group"
          >
            <Copy className="w-5 h-5 text-slate-900 transition-colors group-hover:text-neon-yellow" />
            <span className="text-slate-900 font-medium transition-colors group-hover:text-neon-yellow">
              Copy
            </span>
          </button>
          <a
            href={`https://www.facebook.com/share.php?u=${shareLink}`}
            target="_blank"
            className="bg-gradient-to-r from-neon-orange to-neon-blue p-3 rounded-full border border-neon-blue shadow-[0_0_12px_#00fff7] text-white hover:scale-110 hover:shadow-[0_0_32px_#ff3ec9] transition-all duration-300"
          >
            <FacebookIcon className="h-6 w-6" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`}
            target="_blank"
            className="bg-gradient-to-r from-neon-blue to-neon-pink p-3 rounded-full border border-neon-pink shadow-[0_0_12px_#ff3ec9] text-white hover:scale-110 hover:shadow-[0_0_32px_#00fff7] transition-all duration-300"
          >
            <LinkedinIcon className="h-6 w-6" />
          </a>
          <a
            href={`https://www.twitter.com/share?&url=${shareLink}`}
            target="_blank"
            className="bg-gradient-to-r from-neon-pink to-neon-orange p-3 rounded-full border border-neon-orange shadow-[0_0_12px_#ffe066] text-white hover:scale-110 hover:shadow-[0_0_32px_#ffe066] transition-all duration-300"
          >
            <TwitterIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Comment({ setDialogState, commentList, setComments, user }) {
  const [newComment, setNewComment] = useState("");
  const [isError, setIsError] = useState(false);
  const param = useParams();

  const handleSendComment = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setDialogState(true);
      return;
    }

    if (!newComment.trim()) {
      setIsError(true);
      return;
    }

    setIsError(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: param.postId,
          user_id: user.id,
          comment_text: newComment
        })
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([newCommentData, ...commentList]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <div className="space-y-4 px-4 mb-16 bg-gradient-to-br from-slate-900/80 via-fuchsia-900/30 to-blue-900/30 border border-pink-400/40 shadow-[0_0_24px_#ff3ec9] rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-neon-pink txt-shadow-neon-pink">
          Comment
        </h3>
        <form className="space-y-2 relative" onSubmit={handleSendComment}>
          <Textarea
            value={newComment}
            onFocus={() => {
              setIsError(false);
              if (!user) {
                return setDialogState(true);
              }
            }}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What are your thoughts?"
            className={`w-full p-4 h-24 resize-none py-3 rounded-md placeholder:text-neon-blue bg-slate-900/80 text-white focus-visible:ring-0 focus-visible:ring-offset-0 ${
              isError ? "border-red-500" : "border-pink-400/40"
            }`}
          />
          {isError && (
            <p className="text-red-500 text-sm absolute">
              Please type something before sending.
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-2 font-bold bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-orange text-neon-purple rounded-full shadow-[0_0_16px_#ff3ec9] border border-pink-400/60 hover:from-neon-yellow hover:to-neon-pink hover:shadow-[0_0_32px_#ffe066] transition-all duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="space-y-6 px-4">
        {commentList.map((comment, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 mb-4 bg-slate-900/70 border border-neon-blue/40 rounded-xl p-3 shadow-[0_0_12px_#00fff7]"
          >
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={comment.users?.profile_pic || "/images/avartar.webp"}
                  alt={comment.users?.name || "User"}
                  className="rounded-full w-12 h-12 object-cover border-2 border-neon-blue shadow-[0_0_8px_#00fff7]"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col items-start justify-between">
                  <h4 className="font-semibold text-neon-blue txt-shadow-neon-blue">
                    {comment.users?.name || "Unknown User"}
                  </h4>
                  <span className="text-sm text-neon-yellow/80">
                    {new Date(comment.created_at)
                      .toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                      .replace(", ", " at ")}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-neon-pink/90">{comment.comment_text}</p>
            {index < commentList.length - 1 && (
              <hr className="border-neon-blue/30 my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthorBio() {
  return (
    <div className="bg-gradient-to-br from-blue-900/80 via-fuchsia-900/40 to-purple-900/60 p-6 text-white txt-shadow-neon-purple rounded-2xl shadow-[0_0_24px_#00fff7] border border-fuchsia-400/40">
      <div className="flex items-center mb-4">
        <div className="flex items-center w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg mr-4">
          <img
            src="/images/avartar.webp"
            alt="Author"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-0">
          <p className="text-sm text-cyan-300 txt-shadow-neon-blue m-0">
            Author
          </p>
          <h3 className="text-2xl font-bold text-white mt-0">Thanakrit T.</h3>
        </div>
      </div>
      <hr className="border-cyan-700 mb-4" />
      <div className="text-white space-y-4">
        <p>
          A front-end developer and tech enthusiast with a passion for crafting
          sleek, high-performance user experiences. I specialize in modern web
          technologies, bringing futuristic aesthetics to life through clean,
          efficient code.
        </p>
        <p>
          When I'm not coding, you'll find me exploring the latest in cyberpunk
          design, experimenting with new UI trends, or immersing myself in the
          ever-evolving world of web development.
        </p>
      </div>
    </div>
  );
}

function CreateAccountModal({ dialogState, setDialogState }) {
  const navigate = useNavigate();
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogContent className="bg-slate-950 text-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-lg flex flex-col items-center border border-neon-orange shadow-neon-orange">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center text-neon-yellow txt-shadow-neon-orange">
          Create an account to continue
        </AlertDialogTitle>
        <button
          onClick={() => navigate("/sign-up")}
          className="rounded-full text-black bg-gradient-to-r from-neon-orange to-neon-yellow hover:from-neon-yellow hover:to-neon-orange hover:text-white transition-colors py-4 text-lg w-52 shadow-[0_0_16px_#ffe066]"
        >
          Create account
        </button>
        <AlertDialogDescription className="flex flex-row gap-1 justify-center font-medium text-center pt-2 text-neon-orange">
          Already have an account?
          <a
            onClick={() => navigate("/login")}
            className="text-neon-yellow hover:text-neon-orange transition-colors underline font-semibold cursor-pointer"
          >
            Log in
          </a>
        </AlertDialogDescription>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none bg-transparent hover:bg-transparent hover:text-neon-red transition-colors cursor-pointer">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-16 h-16 animate-spin text-neon-orange" />
        <p className="text-lg font-semibold text-neon-yellow txt-shadow-neon-orange">Loading...</p>
      </div>
    </div>
  );
}
