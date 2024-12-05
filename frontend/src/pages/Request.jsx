import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { getRequestById } from "../utils/API";

export default function Request() {
 const { id } = useParams();
 const [request, setRequest] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);

 useEffect(() => {
  getRequestById(
   id,
   (res) => {
    setRequest(res.data);
    setLoading(false);
   },
   () => {
    setError(true);
    setLoading(false);
   }
  );
 }, [id]);

 return (
  <Layout>
   <div className="w-full min-h-[90vh] flex justify-center items-center bg-gray-50">
    {loading && (
     <div className="text-lg font-medium text-gray-700">Loading...</div>
    )}

    {error && (
     <div className="text-lg font-medium text-red-500">
      Failed to load request information or unavailable
     </div>
    )}

    {request && !loading && !error && (
     <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
      <img
       src={request.user.profile_photo}
       alt={request.user.name}
       className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-200"
      />
      <h1 className="text-2xl font-semibold text-gray-800">
       {request.user.name || "Anonymous"}
      </h1>
      <p className="mt-2">
       Requests made:{" "}
       <span className="text-gray-500 font-medium">
        {request.user.request_count}
       </span>
      </p>

      <div className="mt-4 text-left">
       <h2 className="text-lg font-medium">Request Details:</h2>
       <p className="mt-1">
        Category: <span className="text-gray-500">{request.category}</span>
       </p>
       <p>
        Amount:{" "}
        <span className="text-gray-500">
         {request.amount && request.amount.value && request.amount.unit
          ? `${request.amount.value}${request.amount.unit}`
          : "Not specified"}
        </span>
       </p>
       <p>
        Description:{" "}
        <span className="text-gray-500">
         {request.desciption || "No description provided"}
        </span>
       </p>
       <p>
        Phone number:{" "}
        <span className="text-gray-500">
         {request.phone.code}-{request.phone.number}
        </span>
       </p>
      </div>

      <div className="mt-4 flex justify-between gap-4">
       <a
        href={`tel:${request.phone.code}${request.phone.number}`}
        className="text-lg font-medium text-orange-500 hover:underline"
       >
        Contact the person
       </a>
       <a
        href={`mailto:${request.email}`}
        className="text-lg font-medium text-blue-500 hover:underline"
       >
        Email the person
       </a>
      </div>
     </div>
    )}
   </div>
  </Layout>
 );
}
