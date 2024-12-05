import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { getDonationById } from "../utils/API";

export default function Donor() {
 const { id } = useParams();
 const [donor, setDonor] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);

 useEffect(() => {
  getDonationById(
   id,
   (res) => {
    setDonor(res.data);
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
      Failed to load donor information or unavailable
     </div>
    )}

    {donor && !loading && !error && (
     <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
      <img
       src={donor.user.profile_photo}
       alt={donor.user.name}
       className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-200"
      />
      <h1 className="text-2xl font-semibold text-gray-800">
       {donor.user.name || "Anonymous"}
      </h1>
      <p className="mt-2">
       Donations made:{" "}
       <span className="text-gray-500 font-medium">
        {donor.user.donation_count}
       </span>
      </p>

      <div className="mt-4 text-left">
       <h2 className="text-lg font-medium">Donation Details:</h2>
       <p className="mt-1">
        Category: <span className="text-gray-500">{donor.category}</span>
       </p>
       <p>
        Amount:{" "}
        <span className="text-gray-500">
         {donor.amount && donor.amount.value && donor.amount.unit
          ? `${donor.amount.value}${donor.amount.unit}`
          : "Not specified"}
        </span>
       </p>
       <p>
        Description:{" "}
        <span className="text-gray-500">
         {donor.desciption || "No description provided"}
        </span>
       </p>
       <p>
        Expiration:{" "}
        <span className="text-gray-500">
         {new Date(donor.expire_date).toLocaleDateString()}
        </span>
       </p>
       <p>
        Phone number:{" "}
        <span className="text-gray-500">
         {donor.phone.code}-{donor.phone.number}
        </span>
       </p>
      </div>

      <div className="mt-4 flex justify-between gap-4">
       <a
        href={`tel:${donor.phone.code}${donor.phone.number}`}
        className="text-lg font-medium text-orange-500 hover:underline"
       >
        Contact donor
       </a>
       <a
        href={`mailto:${donor.email}`}
        className="text-lg font-medium text-blue-500 hover:underline"
       >
        Email donor
       </a>
      </div>
     </div>
    )}
   </div>
  </Layout>
 );
}
