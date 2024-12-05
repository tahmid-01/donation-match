import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../utils/API";

export default function SignUpPage() {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();
  signup(
   name,
   email,
   password,
   () => {
    window.location.href = "/login";
   },
   (err) => {
    alert(err.error || err);
   }
  );
 };

 return (
  <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-4 lg:px-8">
   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="mt-6 text-center text-3xl xl:text-4xl font-extrabold text-gray-900">
     Sign Up
    </h2>
   </div>

   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
     <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
       <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-700"
       >
        Full name
       </label>
       <input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
       />
      </div>

      <div>
       <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
       >
        Email address
       </label>
       <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       />
      </div>

      <div>
       <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
       >
        Password
       </label>
       <input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       />
      </div>

      <div>
       <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
       >
        Sign up
       </button>
      </div>
     </form>

     <div className="mt-6">
      <p className="text-center text-sm text-gray-600">
       Already have an account?{" "}
       <Link
        to="/login"
        className="font-medium text-orange-600 hover:text-orange-500"
       >
        Log in
       </Link>
      </p>
     </div>
    </div>
   </div>
  </div>
 );
}
