import { StyledTabs } from "./materials/Tabs";
import SearchBar from "./materials/Searchbar";
import { CategoryDropDown } from "./materials/CategoryDropDown";
import { BlogCard } from "./materials/BlogCard";
import { blogPosts } from "@/data/blogPosts";

function ArticleSection() {
  return (
    <main className="max-w-6xl mx-auto bg-slate-950/70 border border-neon-orange inset-ring shadow-neon-orange p-6 md:p-8 rounded-lg w-full">
      <h1 className="text-3xl font-semibold text-neon-yellow txt-shadow-neon-orange text-left mb-4">
        Explore the Latest Articles
      </h1>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col items-center w-full space-y-4">
        <SearchBar />
        <CategoryDropDown />
        <div className="grid grid-cols-1 gap-4 text-neon-yellow txt-shadow-neon-orange">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-col lg:gap-6">
        {/* Menubar รวม StyledTabs + SearchBar (จัดให้ SearchBar ตรงกับ Highlight) */}
        <div className="flex justify-between items-center bg-slate-900/80 border border-neon-orange rounded-lg px-4 py-3 shadow-neon-orange">
          <StyledTabs />
          <div className="w-[300px] flex justify-end">
            <SearchBar />
          </div>
        </div>

        {/* Blog Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neon-yellow txt-shadow-neon-yellow">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default ArticleSection;