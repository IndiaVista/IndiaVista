import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";
import { close, menu } from "../../constants/index.js";
import logo from "../../assets/Landing_page/IndiaVista_logo.png";
import icon from "../../assets/HomeImages/icon.jpg";

const NavBar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [filter, setFilter] = useState("Filter by");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

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
    { title: "Home", id: "home" },
    { title: "Events", id: "events" },
    { title: "Features", id: "features" },
    { title: "Gallery", id: "gallery" },
  ];

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  return (
    <nav
    className={`w-full h-16 flex justify-between items-center fixed z-50 px-8 py-4 ${
      isScrolled
        ? "bg-white shadow-md"  // Full white background when scrolled
        : "bg-black bg-opacity-5"  // Transparent black when not scrolled
    } `}
  >
    {/* Nav content goes here */}
  
      {/* Logo and Home Link */}
      <Link to="/" onClick={() => scrollToSection("home")}>
        <img src={logo} alt="IndiaVista Logo" className="w-[120px] h-auto" />
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="list-none hidden lg:flex flex-row items-center space-x-6">
        {navbar.map((nav) => (
          <li
            key={nav.id}
            className={`font-medium text-[16px] cursor-pointer ${
              active === nav.title ? "text-black":"text-black"
            } hover:text-black`}
            onClick={() => {
              setActive(nav.title);
              scrollToSection(nav.id);
            }}black
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 md:max-w-md lg:flex hidden">
        {/* Dropdown Filter */}
        <div className="relative w-32">
          {/* Dropdown Button */}
          <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 border border-orange-700 rounded-md bg-transparent text-black  focus:ring-orange-100"
      >
        <span>{filter}</span>
        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

          {/* Dropdown Options */}
          {isOpen && (
            <ul className="absolute w-full mt-1 bg-white border border-orange-300 rounded-md shadow-lg">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    setFilter(option.label);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer text-black hover:bg-orange-400 bg-opacity-5"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Search Input */}
        <input
  type="text"
  className={`flex-grow px-4 py-2 rounded-md 
  ${isScrolled ? "border border-blue-700" : "border border-white-300"} bg-white bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-white`}
  placeholder="Search..."
/>
        {/* Search Button */}
        <button className="px-4 py-2 text-black bg-white bg-opacity-5 border border-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white ">
          Search
        </button>
      </div>

      {/* Get Started Button */}
      <Link to="/auth" className="hidden lg:block">
        <img
          src={icon} // Replace this with the correct path to your user profile icon
          alt="User Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
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
              <button className=" text-black w-40 py-2 rounded-lg  mt-4">
                Dashboard
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
