import React, { useState, useEffect } from 'react';
import logo from '../../assets/IndiaVista_logo.png'

function Navbar() {
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // To manage the mobile menu

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);

    // Update active link based on scroll position
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 60;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setActiveLink(section.getAttribute('id'));
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#home" className="flex items-center">
              <img src={logo} alt="Logo" className="h-11 w-13" />
            </a>
          </div>

          {/* Hamburger icon for mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Navbar links for desktop */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className={`text-sm font-medium ${activeLink === 'home' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Home
            </a>
            <a
              href="#discover"
              className={`text-sm font-medium ${activeLink === 'discover' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Discover Heritage
            </a>
            <a
              href="#document"
              className={`text-sm font-medium ${activeLink === 'document' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Document Your Trip
            </a>
            <a
              href="#calendar"
              className={`text-sm font-medium ${activeLink === 'calendar' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Cultural Calendar
            </a>
            <a
              href="#gallery"
              className={`text-sm font-medium ${activeLink === 'gallery' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Gallery
            </a>
            <a
              href="#about"
              className={`text-sm font-medium ${activeLink === 'about' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
            >
              About Us
            </a>
            <a
              href="#contact"
              className={`text-sm font-medium ${activeLink === 'contact' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Contact Us
            </a>
          </div>

          <div className="hidden md:block">
            <a
              href="#get-started"
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu (visible when menuOpen is true) */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#home"
              className={`block text-sm font-medium ${activeLink === 'home' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#discover"
              className={`block text-sm font-medium ${activeLink === 'discover' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
              onClick={() => setMenuOpen(false)}
            >
              Discover Heritage
            </a>
            <a
              href="#document"
              className={`block text-sm font-medium ${activeLink === 'document' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
              onClick={() => setMenuOpen(false)}
            >
              Document Your Trip
            </a>
            <a
              href="#calendar"
              className={`block text-sm font-medium ${activeLink === 'calendar' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
              onClick={() => setMenuOpen(false)}
            >
              Cultural Calendar
            </a>
            <a
              href="#gallery"
              className={`block text-sm font-medium ${activeLink === 'gallery' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </a>
            <a
              href="#about"
              className={`block text-sm font-medium ${activeLink === 'about' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="#contact"
              className={`block text-sm font-medium ${activeLink === 'contact' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </a>
            <a
              href="#get-started"
              className="block text-white bg-red-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


// import React, { useState, useEffect } from 'react';

// const Navbar = () => {
//   const [activeLink, setActiveLink] = useState('home');
//   const [isScrolled, setIsScrolled] = useState(false);

//   const handleScroll = () => {
//     const scrollPosition = window.scrollY;
//     if (scrollPosition > 50) {
//       setIsScrolled(true);
//     } else {
//       setIsScrolled(false);
//     }

//     // Update active link based on scroll position
//     const sections = document.querySelectorAll('section');
//     sections.forEach((section) => {
//       const sectionTop = section.offsetTop - 60;
//       const sectionHeight = section.offsetHeight;
//       if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
//         setActiveLink(section.getAttribute('id'));
//       }
//     });
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <nav className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <a href="#home" className="flex items-center">
//               <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
//               <span className="ml-3 text-xl font-semibold text-gray-800">Destinize</span>
//             </a>
//           </div>
//           <div className="hidden md:flex space-x-8">
//             <a
//               href="#home"
//               className={`text-sm font-medium ${activeLink === 'home' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
//             >
//               Home
//             </a>
//             <a
//               href="#discover"
//               className={`text-sm font-medium ${activeLink === 'discover' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
//             >
//               Discover Heritage
//             </a>
//             <a
//               href="#document"
//               className={`text-sm font-medium ${activeLink === 'document' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
//             >
//               Document Your Trip
//             </a>
//             <a
//               href="#calendar"
//               className={`text-sm font-medium ${activeLink === 'calendar' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
//             >
//               Cultural Calendar
//             </a>
//             <a
//               href="#gallery"
//               className={`text-sm font-medium ${activeLink === 'gallery' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
//             >
//               Gallery
//             </a>
//             <a
//               href="#about"
//               className={`text-sm font-medium ${activeLink === 'about' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
//             >
//               About Us
//             </a>
//             <a
//               href="#contact"
//               className={`text-sm font-medium ${activeLink === 'contact' ? 'text-blue-500 underline' : 'text-gray-500 hover:text-blue-500'}`}
//             >
//               Contact Us
//             </a>
//           </div>
//           <div className="hidden md:block">
//             <a
//               href="#get-started"
//               className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
//             >
//               Get Started
//             </a>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;