import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function StyledTabs() {
  return (
    <Tabs defaultValue="highlight" className="w-full max-w-lg mt-4">
      <TabsList
        className={cn(
          "grid w-full grid-cols-4",
          "bg-transparent border-b border-neon-orange"
        )}
      >
        <TabsTrigger value="highlight" className="neon-tab text-neon-orange txt-shadow-neon-orange hover:text-neon-yellow">Highlight</TabsTrigger>
        <TabsTrigger value="showcase" className="neon-tab text-neon-orange txt-shadow-neon-orange hover:text-neon-yellow">Showcase</TabsTrigger>
        <TabsTrigger value="inspiration" className="neon-tab text-neon-orange txt-shadow-neon-orange hover:text-neon-yellow">Inspiration</TabsTrigger>
        <TabsTrigger value="general" className="neon-tab text-neon-orange txt-shadow-neon-orange hover:text-neon-yellow">General</TabsTrigger>
      </TabsList>

      <TabsContent value="highlight">
        <div className="p-4 text-neon-yellow txt-shadow-neon-orange">Featured articles, top picks, and more.</div>
      </TabsContent>
      <TabsContent value="showcase">
        <div className="p-4 text-neon-yellow txt-shadow-neon-orange">Curated projects, portfolios, and inspiration.</div>
      </TabsContent>
      <TabsContent value="inspiration">
        <div className="p-4 text-neon-yellow txt-shadow-neon-orange">Creative ideas, design trends, and sources.</div>
      </TabsContent>
      <TabsContent value="general">
        <div className="p-4 text-neon-yellow txt-shadow-neon-orange">General articles and content updates.</div>
      </TabsContent>
    </Tabs>
  );
}
