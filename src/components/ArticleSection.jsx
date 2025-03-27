import { StyledTabs } from "./materials/Tabs";
import { CategoryDropDown } from "./materials/CategoryDropDown";

function ArticleSection() {
  return (
    <main className="max-w-10/12 mx-auto bg-slate-950/70 border border-neon-orange inset-ring shadow-neon-orange p-6 md:p-8 rounded-lg w-full">
      <h1 className="text-3xl font-semibold text-neon-yellow txt-shadow-neon-orange text-left mb-4">
        Latest Articles
      </h1>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center w-full space-y-4">
        <CategoryDropDown />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-col md:gap-6">
        <div className="flex justify-between items-center">
          <StyledTabs />
        </div>
      </div>
    </main>
  );
}

export default ArticleSection;
