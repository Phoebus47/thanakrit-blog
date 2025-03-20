import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function StyledTabs() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  return (
    <Tabs defaultValue="highlight" className="w-full max-w-lg">
      <TabsList
        className={cn(
          "grid w-full grid-cols-4",
          "bg-transparent border-b border-neon-orange"
        )}
      >
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className={cn(
              "neon-tab text-neon-orange txt-shadow-neon-orange hover:text-neon-yellow"
            )}
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
