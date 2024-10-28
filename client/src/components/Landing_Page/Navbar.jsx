import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";
import { close , menu  } from "../../constants/index.js"; 
import logo from "../../assets/Landing_page/IndiaVista_logo.png"

const NavBar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    scroller.scrollTo(id, {
      smooth: true,
      offset: -70,
    });
  };

  const navbar = [
    {title: "Home", id:"home"},
    {title: "Discover Heritage", id:"discover"},
    {title: "Cultural Calendar", id:"calendar"},
    {title: "Document Your Trip", id:"document"},
    {title: "Gallery", id:"gallery"},
    {title: "About us", id:"about"},
    {title: "Contact us", id:"contact"}
  ];

  const handleScroll = () => {
    const isTop = window.scrollY === 0;
    setIsScrolled(!isTop);

    const homeSection = document.getElementById("home");
    const discoverSection = document.getElementById("discover");
     const calendarSection = document.getElementById("calendar");
    const documentSection = document.getElementById("document");
    const gallerySection = document.getElementById("gallery");
    const aboutSection = document.getElementById("about");
    const contactSection = document.getElementById("contact");

    const scrollPosition = window.scrollY;
    const offset = 70;

    if (
      scrollPosition >= homeSection.offsetTop - offset &&
      scrollPosition < discoverSection.offsetTop - offset
    ) {
      setActive("Home");
    } else if (
      scrollPosition >= discoverSection.offsetTop - offset &&
      scrollPosition < documentSection.offsetTop - offset 
    ) {
      setActive("Discover Heritage");
    } else if (
      scrollPosition >= documentSection.offsetTop - offset &&
      scrollPosition < calendarSection.offsetTop - offset 
    ) {
      setActive("Document Your Trip");
    } else if (
      scrollPosition >= calendarSection.offsetTop - offset &&
      scrollPosition < gallerySection.offsetTop - offset 
    ) {
      setActive("Cultural Calendar");
    } else if (
      scrollPosition >= gallerySection.offsetTop - offset &&
      scrollPosition < aboutSection.offsetTop - offset 
    ) {
      setActive("Gallery");
    } else if (
      scrollPosition >= aboutSection.offsetTop - offset &&
      scrollPosition < contactSection.offsetTop - offset
    ) {
      setActive("About Us");
    } else if (scrollPosition >= contactSection.offsetTop - offset) {
      setActive("Contact Us");
    }
  };

  return (
    <nav
      className={`w-full flex justify-between items-center fixed z-50 bg-white px-8 py-4 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Logo Section */}
      <div>
        {/* <Link to="/"> */}
          <img
            src={logo}
            alt="Destinize Logo"
            className="w-[120px] h-auto"
            loading="lazy"
          />
        {/* </Link> */}
      </div>

      {/* Desktop Navigation Links */}
      <ul className="list-none hidden lg:flex flex-row items-center space-x-6">
        {navbar.map((nav) => (
          <li
            key={nav.id}
            className={`font-medium text-[16px] cursor-pointer ${
              active === nav.title ? "text-red-600" : "text-gray-500"
            } hover:text-red-600`}
            onClick={() => {
              setActive(nav.title);
              scrollToSection(nav.id);
            }}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      
      <Link to="/auth">
        <button className="hidden lg:block bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-700">
          Get Started
        </button>
      </Link>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden flex items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />

        {/* Mobile Dropdown Menu */}
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-white absolute top-16 right-0 min-w-[140px] w-[200px] rounded-lg shadow-lg`}
        >
          <ul className="list-none flex flex-col space-y-4">
            {navbar.map((nav) => (
              <li
                key={nav.id}
                className={`font-medium text-[16px] cursor-pointer ${
                  active === nav.title ? "text-red-600" : "text-gray-500"
                } hover:text-red-600`}
                onClick={() => {
                  setActive(nav.title);
                  scrollToSection(nav.id);
                }}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            <Link to="/auth">
              <button className="bg-red-600 text-white w-full py-2 rounded-lg shadow mt-4">
                Get Started
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;