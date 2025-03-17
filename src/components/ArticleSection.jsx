import { StyledTabs } from "./materials/Tabs";
import SearchBar from "./materials/Searchbar";
import { CategoryDropDown } from "./materials/CategoryDropDown";
import { BlogCard } from "./materials/BlogCard";
import { blogPosts } from "@/data/blogPosts";

function ArticleSection() {
  return (
    <main className="max-w-6xl mx-auto bg-slate-950/70 border border-neon-orange inset-ring shadow-neon-orange p-6 md:p-8 rounded-lg w-full">
      <h1 className="text-3xl font-semibold text-neon-yellow txt-shadow-neon-orange text-left mb-4">
        Explore the Latest Articles
      </h1>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col items-center w-full space-y-4">
        <SearchBar />
        <CategoryDropDown />
        <div className="grid grid-cols-1 gap-4 text-neon-yellow txt-shadow-neon-orange">
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e739huvlalbfz9eynysc.jpg"
            category="General"
            title="The Art of Mindfulness: Finding Peace in a Busy World"
            description="Discover the transformative power of mindfulness and how it can help you navigate the challenges of modern life with greater ease and contentment."
            author="Thompson P."
            date="11 September 2024"
          />
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/gsutzgam24abrvgee9r4.jpg"
            category="Cat"
            title="The Secret Language of Cats: Decoding Feline Communication"
            description="Unravel the mysteries of cat communication and learn how to better understand your feline friend's needs and desires."
            author="Thompson P."
            date="21 August 2024"
          />
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/zzye4nxfm3pmh81z7hni.jpg"
            category="Inspiration"
            title="Embracing Change: How to Thrive in Times of Transition"
            description="Learn powerful strategies to navigate life's changes with grace and emerge stronger on the other side."
            author="Thompson P."
            date="23 March 2024"
          />
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e0haxst38li4g8i0vpsr.jpg"
            category="General"
            title="The Future of Work: Adapting to a Digital-First Economy"
            description="Explore how technology is reshaping the workplace and learn skills to succeed in the evolving job market."
            author="Thompson P."
            date="23 May 2024"
          />
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/g8qpepvgnz6gioylyhrz.jpg"
            category="Inspiration"
            title="The Power of Habits: Small Changes, Big Results"
            description="Discover how small, consistent habits can lead to significant personal and professional growth over time."
            author="Thompson P."
            date="23 June 2024"
          />
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/koydfh6jpmzhtxvwein3.jpg"
            category="Cat"
            title="Cat Nutrition: A Guide to Feeding Your Feline Friend"
            description="Learn about the nutritional needs of cats and how to provide a balanced diet for optimal health and longevity."
            author="Thompson P."
            date="21 July 2024"
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-col lg:gap-6">
        {/* Menubar รวม StyledTabs + SearchBar (จัดให้ SearchBar ตรงกับ Highlight) */}
        <div className="flex justify-between items-center bg-slate-900/80 border border-neon-orange rounded-lg px-4 py-3 shadow-neon-orange">
          <StyledTabs />
          <div className="w-[300px] flex justify-end">
            <SearchBar />
          </div>
        </div>

        {/* Blog Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neon-yellow txt-shadow-neon-yellow">
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e739huvlalbfz9eynysc.jpg"
            category="General"
            title="The Art of Mindfulness: Finding Peace in a Busy World"
            description="Discover the transformative power of mindfulness and how it can help you navigate the challenges of modern life with greater ease and contentment."
            author="Thompson P."
            date="11 September 2024"
          />
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/gsutzgam24abrvgee9r4.jpg"
            category="Cat"
            title="The Secret Language of Cats: Decoding Feline Communication"
            description="Unravel the mysteries of cat communication and learn how to better understand your feline friend's needs and desires."
            author="Thompson P."
            date="21 August 2024"
          />
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/zzye4nxfm3pmh81z7hni.jpg"
            category="Inspiration"
            title="Embracing Change: How to Thrive in Times of Transition"
            description="Learn powerful strategies to navigate life's changes with grace and emerge stronger on the other side."
            author="Thompson P."
            date="23 March 2024"
          />
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e0haxst38li4g8i0vpsr.jpg"
            category="General"
            title="The Future of Work: Adapting to a Digital-First Economy"
            description="Explore how technology is reshaping the workplace and learn skills to succeed in the evolving job market."
            author="Thompson P."
            date="23 May 2024"
          />
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/g8qpepvgnz6gioylyhrz.jpg"
            category="Inspiration"
            title="The Power of Habits: Small Changes, Big Results"
            description="Discover how small, consistent habits can lead to significant personal and professional growth over time."
            author="Thompson P."
            date="23 June 2024"
          />
          <BlogCard
            image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/koydfh6jpmzhtxvwein3.jpg"
            category="Cat"
            title="Cat Nutrition: A Guide to Feeding Your Feline Friend"
            description="Learn about the nutritional needs of cats and how to provide a balanced diet for optimal health and longevity."
            author="Thompson P."
            date="21 July 2024"
          />
        </div>
      </div>
    </main>
  );
}

export default ArticleSection;

// function ArticleSection() {
//     return (
//       <main className="max-w-6xl mx-auto bg-slate-950/70 border border-neon-orange inset-ring shadow-neon-orange p-6 md:p-8 rounded-lg w-full">
//         <h1 className="text-3xl font-semibold text-neon-yellow txt-shadow-neon-orange text-left mb-4">
//           Explore the Latest Articles
//         </h1>

//         {/* Mobile Layout */}
//         <div className="lg:hidden flex flex-col items-center w-full space-y-4">
//           <SearchBar />
//           <CategoryDropDown />
//           <div className="grid grid-cols-1 gap-4">
//             {blogPosts.map((post, index) => (
//               <BlogCard key={index} {...post} />
//             ))}
//           </div>
//         </div>

//         {/* Desktop Layout */}
//         <div className="hidden lg:flex lg:flex-col lg:gap-6">
//           {/* Menubar รวม StyledTabs + SearchBar (จัดตำแหน่ง SearchBar ให้ตรงกับ Highlight) */}
//           <div className="flex justify-between items-center bg-slate-900/80 border border-neon-orange rounded-lg px-4 py-3 shadow-neon-orange">
//             <StyledTabs />
//             <div className="w-[300px] flex justify-end">
//               <SearchBar />
//             </div>
//           </div>

//           {/* Grid ของ BlogCard */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogPosts.map((post, index) => (
//               <BlogCard key={index} {...post} />
//             ))}
//           </div>
//         </div>
//       </main>
//     );
//   }

// export default ArticleSection;
