import React, { useEffect, useState, useContext } from 'react';
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from 'react-router-dom';
import user from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import DataContext from '../context/DataContext';

const Header = () => {
  const navigation = [
    { label: "Movies", href: "movie" },
    { label: "TV Shows", href: "tv" }
  ];

  const { isAdultContent, toggleAdultContent } = useContext(DataContext);

  const navigate = useNavigate();
  const [searchinput, setsearchinput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // ✅ Mobile menu state
  const [showMobileSearch, setShowMobileSearch] = useState(false); // ✅ Search icon toggle for small screens

  const handlechange = (e) => {
    e.preventDefault();
    setsearchinput(e.target.value);
  };

  useEffect(() => {
    if (searchinput) navigate(`search/q=${searchinput}`);
  }, [searchinput]);

  const handleclick = () => {
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 backdrop-blur-md bg-neutral-900/70 border-b border-neutral-800 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">

        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-300 text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        {/* Logo */}
        <div
          onClick={handleclick}
          className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all"
        >
          <img src={logo} alt="logo" className="w-[120px] md:w-[140px]" />
        </div>

        {/* ✅ Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 ml-8">
          {navigation.map((nav) => (
            <NavLink
              key={nav.label}
              to={nav.href}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? "text-red-500"
                    : "text-neutral-300 hover:text-white"
                }`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>

        {/* Search + Icons */}
        <div className="flex items-center gap-5 ml-auto">

          {/* ✅ Mobile Search Icon */}
          <button
            className="block sm:hidden text-neutral-300 text-2xl"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <IoSearchOutline />
          </button>

          {/* ✅ Desktop Search */}
          <div className="relative hidden sm:block">
            <IoSearchOutline className="absolute left-3 top-2.5 text-neutral-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-neutral-800 text-neutral-200 pl-9 pr-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition-all w-48 sm:w-56 md:w-64"
              onChange={handlechange}
              value={searchinput}
            />
          </div>

          {/* User Icon */}
          <div className="cursor-pointer hover:scale-105 transition-transform">
            <img
              src={user}
              alt="user"
              width={38}
              className="rounded-full border border-neutral-600 hover:border-red-500 transition-all"
            />
          </div>

          {/* Adult Toggle */}
          <button
            onClick={toggleAdultContent}
            className={`px-3 py-1 rounded-full font-bold text-sm transition-all shadow-sm ${
              isAdultContent
                ? "bg-gradient-to-r from-red-600 to-orange-600 text-white"
                : "bg-gradient-to-r from-green-600 to-emerald-500 text-white"
            } hover:scale-105`}
          >
            {isAdultContent ? "19" : "17"}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Search Bar (Dropdown) */}
      {showMobileSearch && (
        <div className="px-4 pb-3 sm:hidden">
          <div className="relative mt-2">
            <IoSearchOutline className="absolute left-3 top-3 text-neutral-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-neutral-800 text-neutral-200 pl-9 pr-3 py-2 rounded-lg outline-none w-full focus:ring-2 focus:ring-red-500"
              onChange={handlechange}
              value={searchinput}
            />
          </div>
        </div>
      )}

      {/* ✅ Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex flex-col gap-4">
          {navigation.map((nav) => (
            <NavLink
              key={nav.label}
              to={nav.href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-semibold transition-all ${
                  isActive ? "text-red-500" : "text-neutral-300 hover:text-white"
                }`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
