import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../utils/API";

export default function LoginPage() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();
  login(
   email,
   password,
   (data) => {
    localStorage.setItem("t$n", data.auth);
    setTimeout(() => {
     window.location.href = "/";
    }, 100);
   },
   (err) => {
    alert(err.error || err);
   }
  );
 };

 return (
  <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="mt-6 text-center text-3xl xl:text-4xl font-extrabold text-gray-900">
     Log In
    </h2>
   </div>

   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
     <form className="space-y-6" onSubmit={handleSubmit}>
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
        autoComplete="current-password"
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
        Log in
       </button>
      </div>
     </form>

     {/*<div className="mt-6">
      <div className="relative">
       <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
       </div>
       <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">Or continue with</span>
       </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
       <div>
        <a
         href="#"
         className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
         <span className="sr-only">Sign in with Google</span>
         <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 488 512"
         >
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
         </svg>
        </a>
       </div>

       <div>
        <a
         href="#"
         className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
         <span className="sr-only">Sign in with Facebook</span>
         <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 320 512"
         >
          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
         </svg>
        </a>
       </div>

       <div>
        <a
         href="#"
         className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
         <span className="sr-only">Sign in with Apple</span>
         <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 384 512"
         >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
         </svg>
        </a>
       </div>
      </div>
     </div>*/}

     <div className="mt-6">
      <p className="text-center text-sm text-gray-600">
       Don't have an account?{" "}
       <Link
        to="/signup"
        className="font-medium text-orange-600 hover:text-orange-500"
       >
        Sign up
       </Link>
      </p>
     </div>
    </div>
   </div>
  </div>
 );
}
