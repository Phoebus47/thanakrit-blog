// import { StyledTabs } from "./materials/Tabs";
// import { CategoryDropDown } from "./materials/CategoryDropDown";

// function ArticleSection() {
//   return (
//     <main className="max-w-10/12 mx-auto bg-slate-950/70 border border-neon-orange inset-ring shadow-neon-orange p-6 md:p-8 rounded-lg w-full">
//       <h1 className="text-3xl font-semibold text-neon-yellow txt-shadow-neon-orange text-left mb-4">
//         Latest Articles
//       </h1>

//       {/* Mobile Layout */}
//       <div className="md:hidden flex flex-col items-center w-full space-y-4">
//         <CategoryDropDown />
//       </div>

//       {/* Desktop Layout */}
//       <div className="hidden md:flex md:flex-col md:gap-6">
//         <div className="flex justify-between items-center">
//           <StyledTabs />
//         </div>
//       </div>
//     </main>
//   );
// }

// export default ArticleSection;

// import { Input } from "@/components/ui/input";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect, useCallback } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   NavigationMenu,
//   NavigationMenuList,
//   NavigationMenuItem,
//   NavigationMenuTrigger,
//   NavigationMenuContent,
// } from "@radix-ui/react-navigation-menu";
// import { cn } from "@/lib/utils";
// import { BlogCard } from "./BlogCard";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { AnotherSearchBar } from "./Searchbar";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { SearchBar } from "./Searchbar";

// // StyledTabs
// export function StyledTabs() {
//   const categories = ["Highlight", "Cat", "Inspiration", "General"];
//   const [category, setCategory] = useState("Highlight");
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ รีเซ็ต state เมื่อเปลี่ยนหมวดหมู่
//   useEffect(() => {
//     setPage(1);
//     setHasMore(true);
//     setPosts([]);
//   }, [category]);

//   // ✅ ฟังก์ชันดึงข้อมูลโพสต์จาก API
//   const fetchPosts = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const categoryParam = category === "Highlight" ? "" : category;
//       const response = await axios.get(
//         "https://blog-post-project-api.vercel.app/posts",
//         {
//           params: {
//             page: page,
//             limit: 6,
//             category: categoryParam,
//           },
//         }
//       );

//       setPosts((prevPosts) =>
//         page === 1
//           ? response.data.posts
//           : [...prevPosts, ...response.data.posts]
//       );
//       setHasMore(response.data.currentPage < response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [category, page]);

//   // ✅ ดึงโพสต์เมื่อ `page` หรือ `category` เปลี่ยน
//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   const handleLoadMore = () => {
//     if (!isLoading && hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <div className="w-full mt-4 text-neon-orange txt-shadow-neon-orange">
//       <Tabs value={category} onValueChange={setCategory} className="w-full">
//         {/* Header ของ Tabs */}
//         <div className="flex justify-between items-center bg-slate-900/80 border border-neon-orange rounded-lg px-4 py-3 shadow-neon-orange gap-10">
//           <TabsList className="w-full bg-transparent border-b border-neon-orange flex">
//             {categories.map((cat) => (
//               <TabsTrigger
//                 key={cat}
//                 value={cat}
//                 className={cn(
//                   "tabs-trigger text-neon-orange txt-shadow-neon-orange hover:text-neon-yellow hover:bg-neon-orange/50",
//                   category === cat &&
//                     "cursor-not-allowed bg-neon-orange text-white"
//                 )}
//               >
//                 {cat}
//               </TabsTrigger>
//             ))}
//           </TabsList>
//           <SearchBar />
//         </div>

//         {/* รายการโพสต์ */}
//         <TabsContent value={category}>
//           <h2 className="text-lg font-bold mt-4">{`Blogs in ${category}`}</h2>

//           {isLoading && posts.length === 0 ? (
//             <p className="text-gray-500 mt-4">Loading...</p>
//           ) : error ? (
//             <p className="text-red-500 mt-4">Something went wrong. Please try again.</p>
//           ) : posts.length > 0 ? (
//             <>
//               <div className="grid grid-cols-2 gap-8 mt-4">
//                 {posts.map((blog) => (
//                   <BlogCard
//                     key={blog.id}
//                     postId={blog.id}
//                     title={blog.title}
//                     image={blog.image}
//                     category={blog.category}
//                     description={blog.description}
//                     author={blog.author}
//                     date={new Date(blog.date).toLocaleDateString("en-GB", {
//                       day: "numeric",
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   />
//                 ))}
//               </div>

//               {hasMore && (
//                 <div className="text-center mt-8">
//                   <button
//                     className="text-neon-orange txt-shadow-neon-orange border border-neon-orange rounded-lg px-4 py-2 hover:text-neon-yellow hover:bg-neon-orange/50 active:bg-neon-orange"
//                     onClick={handleLoadMore}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Loading..." : "View More"}
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <p className="text-gray-500 mt-4">
//               No posts found in this category.
//             </p>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// // CategoryDropDown
// export function CategoryDropDown() {
//   const categories = ["Highlight", "Cat", "Inspiration", "General"];
//   const [category, setCategory] = useState("Highlight");
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // รีเซ็ตค่าเมื่อเปลี่ยน category
//   useEffect(() => {
//     setPage(1);
//     setHasMore(true);
//     setPosts([]); // ล้างโพสต์เก่าก่อนโหลดใหม่
//   }, [category]);

//   // โหลดโพสต์
//   const fetchPosts = useCallback(async () => {
//     setIsLoading(true);

//     try {
//       const categoryParam = category === "Highlight" ? "" : category;
//       const response = await axios.get(
//         "https://blog-post-project-api.vercel.app/posts",
//         {
//           params: { page: page, limit: 6, category: categoryParam },
//         }
//       );

//       setPosts((prevPosts) =>
//         page === 1
//           ? response.data.posts
//           : [...prevPosts, ...response.data.posts]
//       );
//       setHasMore(response.data.currentPage < response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [category, page]);

//   // โหลดข้อมูลใหม่เมื่อ page หรือ category เปลี่ยน
//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   const handleLoadMore = () => {
//     if (!isLoading && hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <div className="w-full mt-4 text-neon-orange txt-shadow-neon-orange">
//       <AnotherSearchBar />

//       {/* Navigation Menu */}
//       <NavigationMenu>
//         <NavigationMenuList>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger className="w-full flex justify-between items-center px-3 py-2 font-bold txt-shadow-neon-orange">
//               <span>{category}</span>
//               <ExpandMoreIcon />
//             </NavigationMenuTrigger>

//             {/* รายการ Category */}
//             <NavigationMenuContent>
//               <ul className="grid gap-3 p-4">
//                 {categories.map((cat) => (
//                   <li key={cat}>
//                     <button
//                       onClick={() => setCategory(cat)}
//                       value={cat}
//                       className={cn(
//                         "block w-full text-left rounded-md p-3 text-sm font-medium transition-colors txt-shadow-neon-orange",
//                         category === cat
//                           ? "bg-neon-orange text-white cursor-not-allowed"
//                           : "hover:bg-neon-orange/50 hover:text-neon-yellow"
//                       )}
//                       disabled={category === cat}
//                     >
//                       {cat}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//         </NavigationMenuList>
//       </NavigationMenu>

//       {/* รายการ Blog ที่กรองแล้ว */}
//       <h2 className="text-lg font-bold mt-4">{`Blogs in ${category}`}</h2>

//       {isLoading && posts.length === 0 ? (
//         <p className="text-gray-500 mt-4">Loading...</p>
//       ) : error ? (
//         <p className="text-red-500 mt-4">Something went wrong. Please try again.</p>
//       ) : posts.length > 0 ? (
//         <>
//           <ul className="grid grid-cols-1 gap-4 mt-4">
//             {posts.map((blog) => (
//               <li key={blog.id}>
//                 <BlogCard
//                   postId={blog.id}
//                   title={blog.title}
//                   image={blog.image}
//                   category={blog.category}
//                   description={blog.description}
//                   author={blog.author}
//                   date={new Date(blog.date).toLocaleDateString("en-GB", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 />
//               </li>
//             ))}
//           </ul>

//           {hasMore && (
//             <div className="text-center mt-8">
//               <button
//                 onClick={handleLoadMore}
//                 className="text-neon-orange txt-shadow-neon-orange border border-neon-orange rounded-lg px-4 py-2 hover:text-neon-yellow hover:bg-neon-orange/50 active:bg-neon-orange"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Loading..." : "View More"}
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <p className="text-gray-500 mt-4">No posts found in this category.</p>
//       )}
//     </div>
//   );
// }

// // SearchBar with debounce and search functionality
// export function SearchBar() {
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (searchKeyword.length > 0) {
//       setIsLoading(true);
//       const fetchSuggestions = async () => {
//         try {
//           const response = await axios.get(
//             `https://blog-post-project-api.vercel.app/posts?search=${searchKeyword}`
//           );
//           setSuggestions(response.data.posts);
//           setIsLoading(false);
//         } catch (error) {
//           console.error("Error fetching suggestions:", error);
//           setIsLoading(false);
//         }
//       };
//       fetchSuggestions();
//     } else {
//       setSuggestions([]);
//     }
//   }, [searchKeyword]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearchKeyword(e.target.value);
//   };

//   return (
//     <div className="relative rounded-lg bg-orange-200 hover:bg-orange-100 border border-neon-orange shadow-neon-orange w-full flex items-center">
//       <Input
//         className="text-orange-500 placeholder-orange-400 pl-4 pr-12 py-2 w-full bg-transparent focus:outline-none rounded-lg font-orbitron"
//         placeholder="Search…"
//         aria-label="search"
//         id="search-input-1"
//         name="search"
//         value={searchKeyword}
//         onChange={handleSearch}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             navigate(`/post/${searchKeyword}`);
//           }
//         }}
//         onFocus={() => setShowDropdown(true)}
//         onBlur={() => {
//           setTimeout(() => {
//             setShowDropdown(false);
//           }, 200);
//         }}
//       />
//       {!isLoading && showDropdown && suggestions.length > 0 && (
//         <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-orange-200 shadow-neon-orange z-10">
//           {suggestions.map((suggestion) => (
//             <button
//               key={suggestion._id}
//               className="p-2 hover:bg-orange-300 cursor-pointer"
//               onClick={() => {
//                 navigate(`/post/${suggestion._id}`);
//                 setShowDropdown(false);
//               }}
//             >
//               {suggestion.title}
//             </button>
//           ))}
//         </div>
//       )}
//       <button
//         className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 hover:text-neon-orange"
//         onClick={() => navigate(`/post/create`)}
//       >
//         <SearchIcon />
//       </button>
//     </div>
//   );
// }

// // AnotherSearchBar with callback for external search handling
// export function AnotherSearchBar() {
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (searchKeyword.length > 0) {
//       setIsLoading(true);
//       const fetchSuggestions = async () => {
//         try {
//           const response = await axios.get(
//             `https://blog-post-project-api.vercel.app/posts?search=${searchKeyword}`
//           );
//           setSuggestions(response.data.posts);
//           setIsLoading(false);
//         } catch (error) {
//           console.error("Error fetching suggestions:", error);
//           setIsLoading(false);
//         }
//       };
//       fetchSuggestions();
//     } else {
//       setSuggestions([]);
//     }
//   }, [searchKeyword]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearchKeyword(e.target.value);
//   };

//   return (
//     <div className="relative rounded-lg bg-orange-200 hover:bg-orange-300 border border-neon-orange shadow-neon-orange w-full flex items-center">
//       <Input
//         className="text-orange-500 placeholder-orange-400 pl-4 pr-12 py-2 w-full bg-transparent focus:outline-none rounded-lg font-orbitron"
//         placeholder="Search…"
//         aria-label="search"
//         id="search-input-2"
//         name="search"
//         value={searchKeyword}
//         onChange={handleSearch}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             navigate(`/post/${searchKeyword}`);
//           }
//         }}
//         onFocus={() => setShowDropdown(true)}
//         onBlur={() => {
//           setTimeout(() => {
//             setShowDropdown(false);
//           }, 200);
//         }}
//       />
//       {!isLoading && showDropdown && suggestions.length > 0 && (
//         <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-orange-200 shadow-neon-orange z-10">
//           {suggestions.map((suggestion) => (
//             <button
//               key={suggestion._id}
//               className="p-2 hover:bg-orange-300 cursor-pointer"
//               onClick={() => {
//                 navigate(`/post/${suggestion._id}`);
//                 setShowDropdown(false);
//               }}
//             >
//               {suggestion.title}
//             </button>
//           ))}
//         </div>
//       )}
//       <button
//         className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 hover:text-neon-orange"
//         onClick={() => navigate(`/post/create`)}
//       >
//         <SearchIcon />
//       </button>
//     </div>
//   );
// }

// // BlogCard
// export function BlogCard({
//   postId, // รับค่า postId
//   image,
//   category,
//   title,
//   description,
//   author,
//   date,
// }) {
//   return (
//     <div className="flex flex-col gap-4">
//       {/* Dynamic Link */}
//       <Link to={`/post/${postId}`} className="relative h-[212px] sm:h-[360px]">
//         <img
//           className="w-full h-full object-cover rounded-md"
//           src={image || "https://via.placeholder.com/300"}
//           alt={title}
//         />
//       </Link>
//       <div className="flex flex-col">
//         <div className="flex">
//           <span className="bg-none border shadow-neon-blue rounded-full px-3 py-1 text-sm font-semibold inset-ring text-neon-blue txt-shadow-neon-blue hover:border-neon-blue hover:bg-neon-blue hover:text-white mb-2">
//             {category || "Uncategorized"}
//           </span>
//         </div>
//         <Link to={`/post/${postId}`}>
//           <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline">
//             {title || "Untitled"}
//           </h2>
//         </Link>
//         <p className="text-white txt-shadow-neon-yellow text-sm mb-4 flex-grow line-clamp-3">
//           {description || "No description available."}
//         </p>
//         <div className="flex items-center text-sm">
//           <img
//             className="w-8 h-8 rounded-full mr-2"
//             src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
//             alt={author || "Unknown"}
//           />
//           <span>{author || "Unknown Author"}</span>
//           <span className="mx-2 text-white">|</span>
//           <span>{date || "Unknown Date"}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ArticleSection
// function ArticleSection() {
//   return (
//     <main className="max-w-10/12 mx-auto bg-slate-950/70 border border-neon-orange inset-ring shadow-neon-orange p-6 md:p-8 rounded-lg w-full">
//       <h1 className="text-3xl font-semibold text-neon-yellow txt-shadow-neon-orange text-left mb-4">
//         Latest Articles
//       </h1>

//       {/* Mobile Layout */}
//       <div className="md:hidden flex flex-col items-center w-full space-y-4">
//         <CategoryDropDown />
//       </div>

//       {/* Desktop Layout */}
//       <div className="hidden md:flex md:flex-col md:gap-6">
//         <div className="flex justify-between items-center">
//           <StyledTabs />
//         </div>
//       </div>
//     </main>
//   );
// }

// export default ArticleSection;

import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useFetchPosts } from "@/hooks/useFetchPosts";

// StyledTabs
export function StyledTabs() {
  const [category, setCategory] = useState("Highlight");
  const [page, setPage] = useState(1);
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  const { posts, hasMore, isLoading, error, fetchPosts } = useFetchPosts(
    category,
    page
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category, page, fetchPosts]);

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
            <p className="text-red-500 mt-4">
              Something went wrong. Please try again.
            </p>
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-8 mt-4">
                {posts.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    postId={blog.id}
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

// CategoryDropDown
export function CategoryDropDown() {
  const [category, setCategory] = useState("Highlight");
  const [page, setPage] = useState(1);
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  const { posts, hasMore, isLoading, error, fetchPosts } = useFetchPosts(
    category,
    page
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, [category, page, fetchPosts]);

  return (
    <div className="w-full mt-4 text-neon-orange txt-shadow-neon-orange">
      <SearchBar />

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
        <p className="text-red-500 mt-4">
          Something went wrong. Please try again.
        </p>
      ) : posts.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 gap-4 mt-4">
            {posts.map((blog) => (
              <li key={blog.id}>
                <BlogCard
                  postId={blog.id}
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

// SearchBar with debounce and search functionality
export function SearchBar({ onSearch }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchKeyword.length > 0) {
      setIsLoading(true);
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `https://blog-post-project-api.vercel.app/posts?search=${searchKeyword}`
          );
          setSuggestions(response.data.posts);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setIsLoading(false);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchKeyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchKeyword(e.target.value);
    onSearch && onSearch(e.target.value); // Pass searchKeyword to parent if needed
  };

  return (
    <div className="relative rounded-lg bg-orange-200 hover:bg-orange-300 border border-neon-orange shadow-neon-orange w-full flex items-center">
      <Input
        className="text-orange-500 placeholder-orange-400 pl-4 pr-12 py-2 w-full bg-transparent focus:outline-none rounded-lg font-orbitron"
        type="text"
        name="search"
        placeholder="Search…"
        aria-label="search"
        value={searchKeyword}
        onChange={handleSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/post/${searchKeyword}`);
          }
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => {
          setTimeout(() => {
            setShowDropdown(false);
          }, 200);
        }}
      />
      {!isLoading && showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-orange-200 shadow-neon-orange z-10">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion._id}
              className="p-2 hover:bg-orange-300 cursor-pointer"
              onClick={() => {
                navigate(`/post/${suggestion._id}`);
                setShowDropdown(false);
              }}
            >
              {suggestion.title}
            </button>
          ))}
        </div>
      )}
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 hover:text-neon-orange"
        onClick={() => navigate(`/post/create`)}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

// BlogCard
export function BlogCard({
  postId, // รับค่า postId
  image,
  category,
  title,
  description,
  author,
  date,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Dynamic Link */}
      <Link to={`/post/${postId}`} className="relative h-[212px] sm:h-[360px]">
        <img
          className="w-full h-full object-cover rounded-md"
          src={image || "https://via.placeholder.com/300"}
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
            className="w-8 h-8 rounded-full mr-2"
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={author || "Unknown"}
          />
          <span>{author || "Unknown Author"}</span>
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
    <main className="max-w-10/12 mx-auto bg-slate-950/70 border border-neon-orange inset-ring shadow-neon-orange p-6 md:p-8 rounded-lg w-full">
      <h1 className="text-3xl font-semibold text-neon-yellow txt-shadow-neon-orange text-left mb-4">
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
