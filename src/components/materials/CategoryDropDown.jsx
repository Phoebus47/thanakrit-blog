import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function CategoryDropDown() {
  return (
    <div className="w-full max-w-md mt-4 text-neon-orange txt-shadow-neon-orange">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="txt-shadow-neon-orange">Category <ExpandMoreIcon /></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4">
                <CategoryItem href="/highlight" title="Highlight">
                  <p className="text-white">
                    Featured articles, top picks, and more.
                  </p>
                </CategoryItem>
                <CategoryItem href="/showcase" title="Showcase">
                  <p className="text-white">
                    Curated projects, portfolios, and inspiration.
                  </p>
                </CategoryItem>
                <CategoryItem href="/inspiration" title="Inspiration">
                  <p className="text-white">
                    Creative ideas, design trends, and sources.
                  </p>
                </CategoryItem>
                <CategoryItem href="/general" title="General">
                  <p className="text-white">
                    General articles and content updates.
                  </p>
                </CategoryItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const CategoryItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

CategoryItem.displayName = "CategoryItem";
