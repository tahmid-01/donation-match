import RequestCard from "./RequestCard";
import requestsData from "../data/requestsData.json";
import { Link } from "react-router-dom";

export default function RecentRequests() {
 return (
  <div className="w-full max-w-7xl px-8 mx-auto flex overflow-hidden flex-col">
   <div className="w-full mt-5 flex items-center justify-between">
    <div className="z-10 self-start text-4xl font-semibold leading-none max-md:text-4xl">
     Recent Requests
    </div>
    <button className="text-sm font-semibold text-white bg-orange-600 px-4 py-2 gap-2 rounded-lg flex items-center">
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
   </div>
   <div className="mt-11 w-full max-md:mt-10 max-md:max-w-full">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
     {requestsData.map((request, index) => (
      <div key={index} className="w-full">
       <RequestCard {...request} />
      </div>
     ))}
    </div>
    <div className="flex mb-8 flex-col items-start ">
     <Link to="/view/requests" className="self-end mt-5 hover:text-sky-600">
      <button>View More..</button>
     </Link>
    </div>
   </div>
  </div>
 );
}
