// import { Input } from "@/components/ui/input";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import SearchIcon from "@mui/icons-material/Search";

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
