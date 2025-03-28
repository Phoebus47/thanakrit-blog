export function BlogCard({
  image,
  category,
  title,
  description,
  author,
  date,
}) {
  return (
    <div className="flex flex-col gap-4">
      <a href="#" className="relative h-[212px] sm:h-[360px]">
        <img className="w-full h-full object-cover rounded-md" src={image} />
      </a>
      <div className="flex flex-col">
        <div className="flex">
          <span className="bg-none border shadow-neon-blue rounded-full px-3 py-1 text-sm font-semibold inset-ring text-neon-blue txt-shadow-neon-blue hover:border-neon-blue hover:bg-neon-blue hover:text-white mb-2">
            {category}
          </span>
        </div>
        <a href="#">
          <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline">
            {title}
          </h2>
        </a>
        <p className="text-white txt-shadow-neon-yellow text-sm mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        <div className="flex items-center text-sm">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt="Thompson P."
          />
          <span>{author}</span>
          <span className="mx-2 text-white">|</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
