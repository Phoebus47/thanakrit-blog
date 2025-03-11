import React from "react";

function HeroSection() {
  return (
    <main className="container px-4 py-8 lg:py-16 mx-auto">
      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden items-center">
        <div className="mb-8">
          <h1 className="text-5xl font-semibold mb-4 text-center">
            Stay <br className="hidden lg:block" />
            Informed, <br />
            Stay Inspired
          </h1>
          <p className="text-lg text-gray-500 text-center">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>
        <img
          src="/src/assets/person-with-cat.jpg"
          alt="Person with a cat"
          className="h-[400px] object-cover rounded-lg shadow-lg mb-8"
        />
        <div>
          <h2 className="text-l font-light mb-2">-Author</h2>
          <h3 className="text-2xl font-semibold mb-4">Thompson P.</h3>
          <p className="text-gray-500 mb-4">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing
            insights on feline companionship and wellness.
          </p>
          <p className="text-gray-500">
            When I&apos;m not writing, I spend time volunteering at my local
            animal shelter, helping cats find loving homes.
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row items-center">
        <div className="w-1/3 pr-8">
          <h1 className="text-5xl font-semibold mb-4 text-right">
            Stay <br />
            Informed, <br />
            Stay Inspired
          </h1>
          <p className="text-lg text-gray-500 text-right">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>
        <img
          src="/src/assets/person-with-cat.jpg"
          alt="Person with a cat"
          className="h-[530px] object-cover rounded-lg shadow-lg w-1/3 mx-4"
        />
        <div className="w-1/3 pl-8">
          <h2 className="text-l font-light mb-2">-Author</h2>
          <h3 className="text-2xl font-semibold mb-4">Thompson P.</h3>
          <p className="text-gray-500 mb-4">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing
            insights on feline companionship and wellness.
          </p>
          <p className="text-gray-500">
            When I&apos;m not writing, I spend time volunteering at my local
            animal shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </main>
  );
}

export default HeroSection;
