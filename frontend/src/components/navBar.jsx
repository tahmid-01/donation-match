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
 const [name, setName] = useState(null);
 const [email, setEmail] = useState(null);
 const [profilePic, setProfilePic] = useState(null);

 const [showMobileNav, setShowMobileNav] = useState(false);

 const profile = JSON.parse(localStorage.getItem("profile"));

 const navItems = [
  { text: "Home", to: "/", isActive: location.pathname === "/" },
  {
   text: "About",
   to: "/about",
   isActive: location.pathname === "/about",
  },
  {
   text: "Donors",
   to: "/view/donates",
   isActive: location.pathname === "/view/donates",
  },
  {
   text: "Requests",
   to: "/view/requests",
   isActive: location.pathname === "/view/requests",
  },
 ];

 const NavComponents = ({ hiddenForMobile }) => (
  <>
   <div className={hiddenForMobile && "hidden lg:flex"}>
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
   </div>
   <div className={hiddenForMobile && "hidden lg:flex"}>
    {loggedIn ? (
     <div className="flex items-center gap-1">
      <Link to="/profile">
       <button className="py-1 pl-1 pr-2 border border-gray-500/30 hover:border-orange-600 transition-colors duration-200 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-left">
        <div className="flex items-center gap-1">
         <img
          src={profilePic || "/images/avatar.png"}
          alt="Profile"
          className="w-8 h-8 rounded-full"
         />
         <div>
          <p className="text-xs leading-[0.8rem]">{name || "Unknown"}</p>
          <p className="text-xs text-gray-500">
           {email || "an error occured!"}
          </p>
         </div>
        </div>
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
       className="py-2 px-4 lg:px-8 text-base font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200 rounded-[92px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
       aria-label="Sign In"
      >
       Sign In
      </button>
     </Link>
    )}
   </div>
  </>
 );

 useEffect(() => {
  if (profile) {
   setName(profile?.display_name);
   setEmail(profile?.email);
   setProfilePic(profile?.profile_photo);
  }
 }, [profile]);

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
  <>
   <nav
    className={`w-full sticky z-50 top-0 left-0 ${
     scrolled
      ? "bg-white/90 backdrop-blur shadow"
      : "bg-transparent shadow-none"
    } py-4 transition-all`}
   >
    <div className="w-full max-w-7xl px-4 lg:px-8 mx-auto flex items-center justify-between">
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

     <NavComponents hiddenForMobile />
     <div className="lg:hidden">
      <button
       className="text-3xl text-black"
       aria-label="Open"
       onClick={() => {
        setShowMobileNav(true);
       }}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-6"
       >
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M4 6h16M4 12h16m-7 6h7"
        />
       </svg>
      </button>
     </div>
    </div>
   </nav>
   <div
    className="fixed top-0 left-0 w-full h-screen bg-white/90 backdrop-blur shadow-md z-50 lg:hidden p-8"
    style={{ display: showMobileNav ? "block" : "none" }}
   >
    <button
     className="absolute top-8 right-8 text-3xl text-black"
     aria-label="Close"
     onClick={() => setShowMobileNav(false)}
    >
     <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-6 h-6"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       d="M6 18L18 6M6 6l12 12"
      />
     </svg>
    </button>
    <div className="flex flex-col gap-8 mt-12">
     <NavComponents />
    </div>
   </div>
  </>
 );
}

export default Navbar;
