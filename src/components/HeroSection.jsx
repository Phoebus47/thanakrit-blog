import React from "react";

function HeroSection() {
  return (
    <main className="container px-4 py-8 lg:py-16 mx-auto txt-shadow-neon-green">
      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden items-center">
        <div className="mb-8">
          <h1 className="text-5xl font-semibold mb-4 text-center text-neon-green">
            Code the <br className="hidden lg:block" />
            Future, <br />
            Shape the Web
          </h1>
          <p className="text-lg text-white text-center">
            Explore the world of modern web development, futuristic UI, and
            cyberpunk-inspired innovation.
          </p>
        </div>
        <img
          // src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
          src="https://imgur.com/tgra0GZ.jpg"
          alt="Person with a cat"
          className="h-[400px] object-cover rounded-lg shadow-lg mb-8"
        />
        <div>
          <h2 className="text-l font-light mb-2">-Author</h2>
          <h3 className="text-2xl font-semibold mb-4 text-neon-blue txt-shadow-neon-blue">
            Thanakrit T.
          </h3>
          <p className="text-white mb-4">
            A front-end developer and tech enthusiast with a passion for
            crafting sleek, high-performance user experiences. I specialize in
            modern web technologies, bringing futuristic aesthetics to life
            through clean, efficient code.
          </p>
          <p className="text-white">
            When I&apos;m not coding, you&apos;ll find me exploring the latest
            in cyberpunk design, experimenting with new UI trends, or immersing
            myself in the ever-evolving world of web development.
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row items-center">
        <div className="w-1/3 pr-8">
          <h1 className="text-5xl font-semibold mb-4 text-right text-neon-green">
            Code the <br />
            Future, <br />
            Shape the Web
          </h1>
          <p className="text-lg text-white text-right">
            Explore the world of modern web development, futuristic UI, and
            cyberpunk-inspired innovation.
          </p>
        </div>
        <img
          // src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
          src="https://imgur.com/tgra0GZ.jpg"
          alt="Thanakrit T."
          className="h-[530px] object-cover rounded-lg w-1/3 mx-4"
        />
        <div className="w-1/3 pl-8">
          <h2 className="text-l font-light mb-2">-Author</h2>
          <h3 className="text-2xl font-semibold mb-4 text-neon-blue txt-shadow-neon-blue">
            Thanakrit T.
          </h3>
          <p className="text-white mb-4">
            A front-end developer and tech enthusiast with a passion for
            crafting sleek, high-performance user experiences. I specialize in
            modern web technologies, bringing futuristic aesthetics to life
            through clean, efficient code.
          </p>
          <p className="text-white">
            When I&apos;m not coding, you&apos;ll find me exploring the latest
            in cyberpunk design, experimenting with new UI trends, or immersing
            myself in the ever-evolving world of web development.
          </p>
        </div>
      </div>
    </main>
  );
}

export default HeroSection;
