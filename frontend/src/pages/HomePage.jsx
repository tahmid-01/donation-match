import Hero from "../components/Hero";
import TopDonors from "../components/TopDonors";
import RecentRequests from "../components/RecentRequests";
import Layout from "../Layout";
import { useState } from "react";
import { DonationTypeButton } from "./../components/DonationTypeButton";

export default function HomePage() {
 const [showBloodGroups, setShowBloodGroups] = useState(false);
 const [selectedNav, setSelectedNav] = useState("Feed");
 const [selectedGroup, setSelectedGroup] = useState("All");
 const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

 const handleGroupClick = (group) => {
  setSelectedGroup(group);
  setShowBloodGroups(false);
 };

 return (
  <Layout>
   {({ loggedIn }) => (
    <>
     {loggedIn ? (
      <div className="w-full max-w-7xl mx-auto px-8 pt-3 pb-7">
       <div className="inline-flex rounded-md shadow-sm" role="group">
        {[{ dir: "Feed" }, { dir: "My Lists" }, { dir: "Settings" }].map(
         ({ dir }, i, arr) => (
          <button
           key={dir}
           type="button"
           className={`px-5 py-2 font-medium text-gray-900 border border-gray-200 ${
            i === 0
             ? "rounded-l-lg"
             : i === arr.length - 1
             ? "rounded-r-lg"
             : ""
           } ${
            selectedNav === dir
             ? "bg-black text-white"
             : "bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-700"
           }`}
           onClick={() => setSelectedNav(dir)}
          >
           {dir}
          </button>
         )
        )}
       </div>
      </div>
     ) : (
      <Hero />
     )}
     {selectedNav === "Feed" && (
      <section
       className="bg-white rounded-t-[3rem] shadow-[0_0_8px_0_rgba(0,0,0,0.15)]"
       id="home--donation"
      >
       <div
        className="w-full max-w-7xl px-8 mx-auto flex justify-center gap-3 pt-12 pb-5"
        id="home--donation-type-group"
       >
        <DonationTypeButton
         type={"All"}
         selected={selectedGroup === "All"}
         onClick={() => handleGroupClick("All")}
        />
        <div className="relative">
         <button
          onClick={() => setShowBloodGroups(!showBloodGroups)}
          className={`flex gap-1.5 items-center px-5 py-2 border-2 rounded-xl leading-none text-center whitespace-nowrap ${
           bloodGroups.includes(selectedGroup)
            ? "border-orange-500 bg-orange-500 text-white"
            : "border-gray-200 bg-transparent text-black hover:bg-gray-100"
          }`}
         >
          Blood{" "}
          <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           strokeWidth={1.5}
           stroke="currentColor"
           className={`size-5 transform transition-transform duration-300 ${
            showBloodGroups ? "rotate-180" : "rotate-0"
           }`}
          >
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
           />
          </svg>
         </button>

         {showBloodGroups && (
          <div className="absolute right-0 z-10 mt-2 w-24 bg-white rounded-md shadow-lg">
           <div className="py-1">
            {bloodGroups.map((group) => (
             <button
              key={group}
              className={`block w-full px-4 py-2 text-sm ${
               selectedGroup === group
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 hover:bg-orange-100 hover:text-orange-500"
              }`}
              onClick={() => handleGroupClick(group)}
             >
              {group}
             </button>
            ))}
           </div>
          </div>
         )}
        </div>
        {["Food", "Cloth"].map((type) => (
         <DonationTypeButton
          key={type}
          type={type}
          selected={selectedGroup === type}
          onClick={() => handleGroupClick(type)}
         />
        ))}
       </div>
       <TopDonors />
       <RecentRequests />
      </section>
     )}
     {selectedNav === "Settings" && (
      <section
       className="bg-white rounded-t-[3rem] shadow-[0_0_8px_0_rgba(0,0,0,0.15)]"
       id="home--settings"
      >
       {" "}
       <div className="w-full max-w-7xl px-8 mx-auto pt-12 pb-11">
        <div className="grid lg:grid-cols-3 gap-8">
         <aside>
          <div className="w-full max-w-[200px] flex flex-col items-center">
           <img
            src="https://randomuser.me/api/portraits"
            alt=""
            className="w-full aspect-square rounded-full bg-gray-300"
           />
           <div className="flex gap-2">
            <button className="mt-3 bg-orange-500 text-white px-3 py-1 rounded-md">
             Change
            </button>
            <button className="mt-3 bg-red-500 text-white px-3 py-1 rounded-md">
             Remove
            </button>
           </div>
          </div>
         </aside>
         <div className="lg:col-span-2">
          <h2 className="text-xl xl:text-2xl font-semibold">Edit Profile</h2>
          <p className="text-gray-600 text-sm mt-2">
           Update your profile information
          </p>

          <div className="grid grid-cols-2 gap-8 mt-8">
           <div>
            <label htmlFor="name" className="text-sm text-gray-600">
             Name
            </label>
            <input
             type="text"
             id="name"
             className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1"
            />
           </div>
           <div>
            <label htmlFor="email" className="text-sm text-gray-600">
             Email
            </label>
            <input
             type="email"
             id="email"
             className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1"
            />
           </div>
           <div>
            <label htmlFor="phone" className="text-sm text-gray-600">
             Phone
            </label>
            <input
             type="tel"
             id="phone"
             className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1"
            />
           </div>
           <div>
            <label htmlFor="address" className="text-sm text-gray-600">
             Address
            </label>
            <input
             type="text"
             id="address"
             className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1"
            />
           </div>
          </div>
          <button className="mt-7 bg-orange-500 text-white px-5 py-2 rounded-md">
           Save Changes
          </button>
         </div>
        </div>
       </div>
      </section>
     )}
     {selectedNav === "My Lists" && (
      <section
       className="bg-white rounded-t-[3rem] min-h-screen shadow-[0_0_8px_0_rgba(0,0,0,0.15)]"
       id="home--lists"
      ></section>
     )}
    </>
   )}
  </Layout>
 );
}
