import { LinkedIn, GitHub, Google } from "@mui/icons-material";

function Footer() {
  return (
    <footer className="text-neon-purple txt-shadow-neon-purple p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 max-w-10/12 mx-auto">
        {/* Contact Section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 border border-neon-purple inset-ring-neon-purple shadow-neon-purple p-6 md:p-8 rounded-lg w-11/12 md:w-auto">
          <p className="text-lg font-semibold">Get in Touch</p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/thanakrit-thanyawatsakul/"
              aria-label="LinkedIn Profile"
              className="hover:text-gray-300 transition"
            >
              <LinkedIn fontSize="large" />
            </a>
            <a
              href="https://github.com/Phoebus47"
              aria-label="GitHub Profile"
              className="hover:text-gray-300 transition"
            >
              <GitHub fontSize="large" />
            </a>
            <a
              href="mailto:thanakrit.than.biz@gmail.com"
              aria-label="Send Email"
              className="hover:text-gray-300 transition"
            >
              <Google fontSize="large" />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col items-center justify-center">
          <a
            href="https://thanakrit-blog.vercel.app/"
            aria-label="Home Page"
            className="underline hover:text-gray-300 transition"
          >
            Home Page
          </a>
          <p className="text-center text-gray-500 text-sm pt-2">
            © 2025 Thanakrit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
