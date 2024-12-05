import { Link } from "react-router-dom";
import Layout from "../Layout";
import RequestCard from "../components/RequestCard";
import { getAllRequests } from "../utils/API";
import { useEffect, useState } from "react";

export default function RequestsPage() {
 const [requests, setRequests] = useState(null);
 useEffect(() => {
  getAllRequests(
   (d) => {
    setRequests(d.data);
   },
   () => {
    setRequests(false);
   }
  );
 }, []);
 return (
  <Layout>
   <div className="w-full min-h-[80vh] max-w-7xl px-4 lg:px-8 mx-auto flex flex-col pb-5">
    <div className="w-full mt-5 flex flex-col gap-3 md:flex-row items-center justify-between">
     <div className="self-start text-2xl lg:text-4xl font-semibold leading-none">
      All Requests
     </div>
     <Link to="/request">
      <button className="text-sm font-semibold text-white bg-orange-600 px-3 lg:px-4 py-2 gap-2 rounded-lg flex items-center">
       New Request{" "}
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
         d="M12 4.5v15m7.5-7.5h-15"
        />
       </svg>
      </button>
     </Link>
    </div>
    <div className="mt-10">
     <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.isArray(requests) ? (
       requests.length > 0 ? (
        requests.map((request, index) => (
         <div key={index} className="w-full">
          <RequestCard
           id={request._id}
           name={request.user.name}
           need={request.category}
           date={request.date}
           mobile={request.phone}
           whiteBg
          />
         </div>
        ))
       ) : (
        <div className="col-span-full text-center p-4 bg-white rounded-lg shadow-md">
         <p className="text-gray-500 text-lg font-semibold">
          No requests available
         </p>
        </div>
       )
      ) : requests === false ? (
       <div className="col-span-full text-center p-4 bg-red-100 rounded-lg shadow-md">
        <p className="text-red-500 text-lg font-semibold">
         Failed to load requests
        </p>
       </div>
      ) : (
       <div className="col-span-full text-center p-4 bg-blue-100 rounded-lg shadow-md">
        <p className="text-blue-500 text-lg font-semibold">Loading...</p>
       </div>
      )}
     </div>
    </div>
   </div>
  </Layout>
 );
}
