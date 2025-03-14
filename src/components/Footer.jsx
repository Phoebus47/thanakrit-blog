import { LinkedIn, GitHub, Google } from "@mui/icons-material";

function Footer() {
  return (
    <footer>
      <div className="footer flex flex-row items-center justify-between gap-4 p-12 bg-gray-800 text-white">
        <div className="flex flex-row items-center justify-start gap-4">
          <p>Get in Touch</p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/thanakrit-thanyawatsakul/"
              aria-label="LinkedIn Profile"
            >
              <LinkedIn />
            </a>
            <a href="https://github.com/Phoebus47" aria-label="GitHub Profile">
              <GitHub />
            </a>
            <a
              href="mailto:thanakrit.than.biz@gmail.com"
              aria-label="Send Email"
            >
              <Google />
            </a>
          </div>
          <p className="text-center text-gray-500 text-sm py-4">
            © 2025 Thanakrit. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <a
            href="https://thanakrit-blog.vercel.app/"
            aria-label="Home Page"
            className="underline"
          >
            Home Page
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
