import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function CategorySelector({
  type = "tabs",
  categories,
  category,
  onCategoryChange,
}) {
  const handleCategoryChange = (newCategory) => {
    if (newCategory !== category) {
      onCategoryChange(newCategory);
    }
  };

  if (type === "tabs") {
    return (
      <Tabs
        value={category}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="w-full bg-gradient-to-r from-slate-900/80 via-yellow-900/10 to-yellow-100/0 border-b border-neon-orange shadow-[0_0_16px_#ffe066] flex">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className={cn(
                "tabs-trigger text-neon-orange txt-shadow-neon-orange hover:text-yellow-400 hover:bg-gradient-to-r hover:from-orange-300 hover:to-yellow-200 hover:shadow-[0_0_12px_#ffe066] transition-all duration-200",
                category === cat &&
                  "cursor-not-allowed bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300 text-slate-900 shadow-[0_0_16px_#ffe066] border border-yellow-300"
              )}
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-full flex justify-between items-center px-3 py-2 font-bold txt-shadow-neon-orange bg-gradient-to-r from-orange-200/80 via-yellow-100/60 to-yellow-100/0 border border-yellow-300 shadow-[0_0_16px_#ffe066] rounded-lg mt-4 hover:from-yellow-200 hover:to-orange-100 hover:shadow-[0_0_32px_#ffe066] transition-all duration-300">
            <span>{category}</span>
            <ExpandMoreIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 bg-gradient-to-br from-slate-900/90 via-yellow-900/20 to-yellow-100/0 border border-yellow-300/30 shadow-[0_0_24px_#ffe066] rounded-lg">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={cn(
                      "block w-full text-left rounded-md p-3 text-sm font-medium transition-colors txt-shadow-neon-orange",
                      category === cat
                        ? "bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300 text-slate-900 shadow-[0_0_12px_#ffe066] cursor-not-allowed"
                        : "hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-100 hover:text-yellow-700 hover:shadow-[0_0_16px_#ffe066]"
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
  );
}
