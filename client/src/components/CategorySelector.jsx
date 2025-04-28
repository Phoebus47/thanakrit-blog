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
      </Tabs>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-full flex justify-between items-center px-3 py-2 font-bold txt-shadow-neon-orange">
            <span>{category}</span>
            <ExpandMoreIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
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
  );
}
