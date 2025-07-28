import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">FastingApp</h2>
          <p className="text-sm">Helping you fast smarter.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <ScrollLink
                to="how-it-works"
                smooth={true}
                duration={500}
                offset={-60}
                className="hover:text-white transition cursor-pointer"
              >
                How It Works
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="pricing"
                smooth={true}
                duration={500}
                offset={-60}
                className="hover:text-white transition cursor-pointer"
              >
                Pricing
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="testimonials"
                smooth={true}
                duration={500}
                offset={-60}
                className="hover:text-white transition cursor-pointer"
              >
                Testimonials
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="faq"
                smooth={true}
                duration={500}
                offset={-60}
                className="hover:text-white transition cursor-pointer"
              >
                FAQs
              </ScrollLink>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img src="/twitter-icon.svg" alt="Twitter" className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img
                src="/linkedin-icon.svg"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold">FastingApp</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
