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
        <div className="h-[400px] w-auto max-w-[400px] mb-8 flex items-center justify-center">
  <img
    src="https://imgur.com/2uO8uEZ.jpg"
    alt="Thanakrit T."
    loading="lazy"
    className="w-full h-full object-cover rounded-lg fade-mask"
    onLoad={(e) => e.target.style.opacity = 1}
    style={{ opacity: 0, transition: "opacity 0.5s ease-in-out" }}
  />
</div>
        <div>
          <h2 className="text-white text-l font-light mb-2">-Author</h2>
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
        <div className="h-[400px] w-[400px] max-w-[400px] mb-8 flex items-center justify-center">
  <img
    src="https://imgur.com/2uO8uEZ.jpg"
    alt="Thanakrit T."
    loading="lazy"
    className="w-full h-full object-cover rounded-lg fade-mask"
    onLoad={(e) => e.target.style.opacity = 1}
    style={{ opacity: 0, transition: "opacity 0.5s ease-in-out" }}
  />
</div>
        <div className="w-1/3 pl-8">
          <h2 className="text-white text-l font-light mb-2">-Author</h2>
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
