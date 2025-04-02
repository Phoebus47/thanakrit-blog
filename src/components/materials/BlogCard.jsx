// import { Link } from "react-router-dom";


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