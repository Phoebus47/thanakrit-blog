import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch if not already installed

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://thanakrit-blog.vercel.app";

async function generateSitemap() {
  console.log("🚀 Starting sitemap generation...");

  let currentPage = 1;
  let totalPages = 1;
  const allPosts = [];

  try {
    // Fetch all pages
    do {
      const res = await fetch(
        `https://blog-post-project-api.vercel.app/posts?page=${currentPage}&limit=100`
      );
      const data = await res.json();

      if (!Array.isArray(data.posts)) {
        throw new Error("❌ 'posts' is not an array.");
      }

      allPosts.push(...data.posts);
      totalPages = data.totalPages || 1;
      console.log(`✅ Fetched page ${currentPage} of ${totalPages}`);
      currentPage++;
    } while (currentPage <= totalPages);

    console.log(`📦 Total posts fetched: ${allPosts.length}`);

    // Static Pages
    const staticPages = ["", "about", "blog"];
    const urls = staticPages.map((path) => ({
      loc: `${baseUrl}/${path}`,
      lastmod: new Date().toISOString().split("T")[0],
    }));

    // Blog Posts
    allPosts.forEach((post) => {
      urls.push({
        loc: `${baseUrl}/blog/${post.id}`,
        lastmod: post.updatedAt || new Date().toISOString().split("T")[0],
      });
    });

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map(
        (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>0.8</priority>
  </url>`
      )
      .join("\n")}
</urlset>`;

    fs.writeFileSync("public/sitemap.xml", sitemap);
    console.log("✅ Successfully created sitemap.xml!");
  } catch (err) {
    console.error("❌ Failed to generate sitemap:", err);
  }
}

generateSitemap();
