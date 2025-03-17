import { StyledTabs } from "./materials/Tabs";
import SearchBar from "./materials/Searchbar";
import { CategoryDropDown } from "./materials/CategoryDropDown";

function ArticleSection() {
    return (
      <main className="max-w-6xl mx-auto bg-slate-950/70 border border-neon-orange inset-ring shadow-neon-orange p-6 md:p-8 rounded-lg w-full md:w-auto">
        <h1 className="text-3xl font-semibold text-neon-yellow txt-shadow-neon-orange m-auto text-left mb-4">
          Explore the Latest Articles
        </h1>
        {/* Mobile Layout */}
        <div className="flex flex-col items-center lg:hidden">
          
          <SearchBar />
          <CategoryDropDown />
        </div>
  
        {/* Desktop Layout (เรียงข้างกัน) */}
        <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between">
          <StyledTabs />
          <div className="flex-grow max-w-md ml-4"> 
            <SearchBar />
          </div>
        </div>
      </main>
    );
  }

export default ArticleSection;
