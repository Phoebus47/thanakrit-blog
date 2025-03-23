import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { blogPosts } from "@/data/blogPosts";
import { BlogCard } from "./BlogCard";
import { AnotherSearchBar, SearchBar } from "./Searchbar";

export function CategoryDropDown() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [category, setCategory] = useState("Highlight");

  // กรองข้อมูลโพสต์เพียงครั้งเดียว
  const filteredPosts = blogPosts.filter((post) => post.category === category);

  return (
    <div className="w-full mt-4 text-neon-orange txt-shadow-neon-orange">
      <div className="mb-4">
        <AnotherSearchBar />
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="w-full flex justify-between items-center px-1 font-bold txt-shadow-neon-orange">
              <span>Category</span> <ExpandMoreIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4">
                {categories.map((item) => (
                  <li key={item}>
                    <NavigationMenuLink asChild>
                      <button
                        className={cn(
                          "block w-full select-none space-y-1 txt-shadow-neon-orange rounded-md p-3 leading-none no-underline outline-none transition-colors",
                          category === item
                            ? "bg-neon-orange text-white cursor-not-allowed"
                            : "hover:bg-neon-orange/50 hover:text-neon-yellow"
                        )}
                        onClick={() => setCategory(item)}
                        disabled={category === item}
                        aria-selected={category === item}
                      >
                        <div className="text-sm font-medium">{item}</div>
                      </button>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* แสดงรายการที่ตรงกับ Category ที่เลือก */}
      <div className="mt-4">
        <h2 className="text-lg font-bold">{`Items in ${category}`}</h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <BlogCard key={post.id} {...post} />)
          ) : (
            <p className="text-gray-500">No posts found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}
