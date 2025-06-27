import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

interface TabsProps {
  className?: string;
  [key: string]: any;
}

interface TabsListProps {
  className?: string;
  [key: string]: any;
}

interface TabsTriggerProps {
  className?: string;
  value: string;
  [key: string]: any;
}

interface TabsContentProps {
  className?: string;
  value: string;
  [key: string]: any;
}

function Tabs({
  className,
  ...props
}: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props} />
  );
}

function TabsList({
  className,
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props} />
  );
}

function TabsTrigger({
  className,
  value,
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      aria-controls={props["aria-controls"] || "tab-content"}
      aria-selected={props["aria-selected"] || "false"}
      className={cn(
        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-orange/90 data-[state=active]:to-neon-yellow/80 data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-neon-yellow data-[state=active]:shadow-[0_0_16px_var(--tw-shadow-color)] focus-visible:ring-neon-yellow/80 focus-visible:outline-none dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-neon-orange/70 dark:data-[state=active]:to-neon-yellow/60 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      style={{ "--tw-shadow-color": "rgba(255, 255, 0, 1)" } as React.CSSProperties}
      {...props} />
  );
}

function TabsContent({
  className,
  value,
  ...props
}: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      value={value}
      className={cn("flex-1 outline-none", className)}
      {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
