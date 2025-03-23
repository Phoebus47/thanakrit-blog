import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/data/blogPosts";
import { BlogCard } from "./BlogCard";
import { useState } from "react";
import { SearchBar } from "./Searchbar";

export function StyledTabs() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [selectedCategory, setSelectedCategory] = useState("Highlight");

  const filteredPosts = blogPosts.filter(
    (post) => post.category === selectedCategory
  );

  return (
    <div className="w-full max-w mt-4 text-neon-orange txt-shadow-neon-orange">
      <Tabs
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="w-full"
      >
        <div className="flex justify-between items-center bg-slate-900/80 border border-neon-orange rounded-lg px-4 py-3 shadow-neon-orange gap-10">
          <TabsList className="w-full bg-transparent border-b border-neon-orange">
            {categories.map((item) => (
              <TabsTrigger
                key={item}
                value={item}
                className={cn(
                  "tabs-trigger text-neon-orange txt-shadow-neon-orange hover:text-neon-yellow hover:bg-neon-orange/50",
                  selectedCategory === item &&
                    "cursor-not-allowed bg-neon-orange text-white"
                )}
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <SearchBar />
        </div>

        <TabsContent value={selectedCategory}>
          <div className="mt-4">
            <h2 className="text-lg font-bold">
              {selectedCategory ? `Blogs in ${selectedCategory}` : "All Items"}
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))
              ) : (
                <p className="text-gray-500">
                  No posts found in this category.
                </p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
