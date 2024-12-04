import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import animations from "./utils/animations";
import { onAuth } from "./utils/API";

export default function Layout({ children }) {
 const [loggedIn, setLoggedin] = useState(false);

 useEffect(() => {
  animations();
 }, []);
 useEffect(() => {
  window.scrollTo({
   top: 0,
   behavior: "smooth",
  });
  if (localStorage.getItem("t$n")) {
   onAuth(
    () => {
     setLoggedin(true);
    },
    () => {
     setLoggedin(false);
    }
   );
  }
 }, [loggedIn]);

 return (
  <div className="bg-back flex flex-col min-h-screen">
   <Navbar loggedIn={loggedIn} />
   <main>
    {typeof children === "function" ? children({ loggedIn }) : children}
   </main>
   <Footer />
  </div>
 );
}
