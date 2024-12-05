import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/API";

const NavigationLink = ({ text, to, isActive }) => {
 return (
  <Link
   to={to}
   className={`gap-2.5 self-stretch text-[20px] my-auto cursor-pointer hover:text-orange-400 transition-colors duration-200 ${
    isActive ? "font-semibold text-orange-500" : "text-neutral-500"
   }`}
  >
   <div role="button" tabIndex={0}>
    {text}
   </div>
  </Link>
 );
};

function Navbar({ loggedIn }) {
 const location = useLocation();
 const [scrolled, setScrolled] = useState(false);
 const navItems = [
  { text: "Home", to: "/", isActive: location.pathname === "/" },
  {
   text: "About",
   to: "/about",
   isActive: location.pathname === "/about",
  },
  {
   text: "Donors",
   to: "/view/donors",
   isActive: location.pathname === "/view/donors",
  },
  {
   text: "Requests",
   to: "/view/requests",
   isActive: location.pathname === "/view/requests",
  },
 ];
 useEffect(() => {
  window.addEventListener("scroll", () => {
   if (window.scrollY > 10) {
    setScrolled(true);
   } else {
    setScrolled(false);
   }
  });
 }, []);
 return (
  <nav
   className={`w-full sticky z-50 top-0 left-0 ${
    scrolled ? "bg-white/90 backdrop-blur shadow" : "bg-transparent shadow-none"
   } py-4 transition-all`}
  >
   <div className="w-full max-w-7xl px-8 mx-auto flex items-center justify-between">
    <Link to="/">
     <div
      className="text-xl font-medium text-black flex items-center gap-1"
      role="heading"
      aria-level={1}
     >
      <img
       src="/images/logo/logo.png"
       alt="logo"
       className="w-10 h-10 -mt-2 object-cover"
      />
      <p>
       <span className="text-orange-500">Do</span>nationMatch
      </p>
     </div>
    </Link>

    <div className="items-center gap-12 text-xl hidden lg:flex">
     {navItems.map((item, index) => (
      <NavigationLink
       key={index}
       text={item.text}
       to={item.to}
       isActive={item.isActive}
      />
     ))}
    </div>

    {loggedIn ? (
     <div className="flex items-center gap-1">
      <Link to="/profile">
       <button className="py-1 px-4 border border-gray-500/30 hover:border-orange-600 transition-colors duration-200 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-left">
        <p className="text-xs leading-[0.8rem]">Abdullah</p>
        <p className="text-xs text-gray-500">abdullah@gmail.com</p>
       </button>
      </Link>
      <button
       className="py-3 px-3  text-white bg-red-500 hover:bg-orange-600 transition-colors duration-200 rounded-[92px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
       aria-label="Logout"
       onClick={() => {
        logout(() => {
         window.location.href = "/";
        });
       }}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
       >
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
        />
       </svg>
      </button>
     </div>
    ) : (
     <Link to="/login">
      <button
       className="py-2 px-8 text-base font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200 rounded-[92px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
       aria-label="Sign In"
      >
       Sign In
      </button>
     </Link>
    )}
   </div>
  </nav>
 );
}

export default Navbar;
