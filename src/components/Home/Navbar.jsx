import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { Link as ScrollLink } from 'react-scroll';
import logoimage from '../../assets/images/logoimg.jpeg';

const navLinks = [
  { label: 'How It Works', path: 'how-it-works' },
  { label: 'Pricing', path: 'pricing' },
  { label: 'Testimonials', path: 'testimonials' },
  { label: 'FAQs', path: 'faq' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    gsap.set(navRef.current, { opacity: 1 });

    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  return (
    <nav ref={navRef} className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo without hover effect */}
          <div className="cursor-pointer">
            <ScrollLink to="hero" smooth={true} duration={500}>
              <img
                src={logoimage}
                alt="Fasting Coach Logo"
                className="h-14 w-14 object-cover rounded-full"
              />
            </ScrollLink>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ label, path }) => (
              <ScrollLink
                key={path}
                to={path}
                smooth={true}
                duration={500}
                offset={-60}
                className="relative text-gray-700 hover:text-red-600 font-medium text-sm uppercase tracking-wide transition group cursor-pointer">
                {label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </ScrollLink>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-red-600 focus:outline-none transition-colors duration-300"
              aria-label="Toggle menu">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white shadow-md border-t">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map(({ label, path }) => (
              <ScrollLink
                key={path}
                to={path}
                smooth={true}
                duration={500}
                offset={-60}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-red-600 transition font-medium cursor-pointer py-2 px-2 rounded hover:bg-red-50">
                {label}
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
