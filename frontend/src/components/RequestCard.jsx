import { Link } from "react-router-dom";

export default function RequestCard({ id, name, need, date, mobile }) {
 return (
  <div className="flex overflow-hidden flex-col grow mb-5 w-full rounded-3xl bg-back max-md:mt-10">
   <div className="flex flex-col px-5 mt-4 mb-3">
    <div className="text-xl font-semibold text-black">{name}</div>
    <div className="flex gap-2 justify-between items-start text-orange-500">
     <div className="font-medium flex flex-col text-lg">
      <div>
       <span className="text-xl text-black">Need:</span>{" "}
       <span className="font-light text-black">{need}</span>
      </div>
      <div>
       <span className="text-xl text-black">Date:</span>
       <span className="font-light text-black">
        {" "}
        {new Date(date).toDateString()}
       </span>
      </div>
     </div>
    </div>
   </div>
   <hr className="border-[1.5px] border-gray-300" />

   <div className="flex items-center justify-between gap-4 px-5 py-2">
    <div className="flex flex-col text-gray-500">
     <div className="font-medium text-xs">
      {mobile &&
       mobile.code &&
       mobile.number &&
       `(${mobile.code}) ${mobile.number}`}
     </div>
    </div>
    <Link to={`/request/${id}`}>
     <button className="text-md font-medium text-center text-black border-2 border-orange-500 border-solid bg-orange-500 bg-opacity-20 rounded-[50px] px-5 py-1 hover:bg-orange-500 hover:text-white">
      Donate
     </button>
    </Link>
   </div>
  </div>
 );
}
