import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function AddModal() {
 const [category, setCategory] = useState("Blood (A+)");
 const [unit, setUnit] = useState("mL");
 const fields = {
  request: [
   {
    label: "Phone",
    type: "tel",
    className: "col-span-full",
    required: true,
   },
   {
    label: "Category",
    type: "select",
    className: "col-span-full",
    required: true,
    value: category,
    onChange: (e) => setCategory(e.target.value),
    options: [
     "Blood (A+)",
     "Blood (A-)",
     "Blood (B+)",
     "Blood (B-)",
     "Blood (AB+)",
     "Blood (AB-)",
     "Blood (O+)",
     "Blood (O-)",
     "Cloth",
     "Food",
    ],
   },
   {
    label: "Amount",
    type: "number",
    value: "",
   },
   {
    label: "Unit",
    type: "select",
    value: unit,
    onChange: (e) => setUnit(e.target.value),
    options: {
     "Blood (A+)": ["mL", "L", "bag"],
     "Blood (A-)": ["mL", "L", "bag"],
     "Blood (B+)": ["mL", "L", "bag"],
     "Blood (B-)": ["mL", "L", "bag"],
     "Blood (AB+)": ["mL", "L", "bag"],
     "Blood (AB-)": ["mL", "L", "bag"],
     "Blood (O+)": ["mL", "L", "bag"],
     "Blood (O-)": ["mL", "L", "bag"],
     Cloth: ["kg", "pcs"],
     Food: ["kg", "pcs", "L", "plate"],
    },
   },
   {
    label: "Description",
    type: "text",
    textArea: true,
    className: "col-span-full",
   },
   {
    toggle: "Address",
    fields: [
     {
      label: "Country",
      type: "text",
      required: true,
     },
     {
      label: "State",
      type: "text",
     },
     {
      label: "City",
      type: "text",
      required: true,
     },
     {
      label: "Street",
      type: "text",
     },
     {
      label: "Zip",
      type: "text",
     },
    ],
   },
  ],
  donate: [
   {
    label: "Name",
    type: "text",
   },
   {
    label: "Email",
    type: "email",
   },
   {
    label: "Phone",
    type: "tel",
   },
   {
    label: "Address",
    type: "text",
   },
  ],
 };
 useEffect(() => {
  gsap.to(".fixed", { duration: 0, opacity: 0 });
  gsap.to(".fixed", { duration: 0.5, opacity: 1, ease: "power2.inOut" });
 }, []);
 return (
  <div className="fixed top-0 left-0 inset-0 z-50 bg-black bg-opacity-50 flex justify-center overflow-y-auto">
   <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg mt-20">
    <div className="flex justify-between items-center">
     <h1 className="text-2xl font-semibold">New Request</h1>
     <button className="text-orange-500">Close</button>
    </div>
    <div className="grid lg:grid-cols-2 gap-8">
     <form>
      <div className="mt-5 grid grid-cols-2 gap-4">
       {fields.request.map((field, index) => (
        <div key={index} className={field.className}>
         {field.toggle ? (
          <>
           <input
            type="checkbox"
            id={field.toggle.toLowerCase().replaceAll(" ", "-") + "-toggle"}
            className="mr-2"
            onChange={(e) => {
             const element = document.getElementById(
              field.toggle.toLowerCase().replaceAll(" ", "-")
             );
             if (e.target.checked) {
              element.classList.remove("hidden");
             } else {
              element.classList.add("hidden");
             }
            }}
           />
           <label
            htmlFor={
             field.toggle.toLowerCase().replaceAll(" ", "-") + "-toggle"
            }
           >
            {field.toggle}
           </label>
           <div
            className="hidden w-full grid grid-cols-1 gap-4 mt-2"
            id={field.toggle.toLowerCase().replaceAll(" ", "-")}
           >
            {field.fields.map((subField, subIndex) => (
             <div key={subIndex}>
              <label
               htmlFor={subField.label.toLowerCase().replaceAll(" ", "-")}
               className="text-sm text-gray-600"
              >
               {subField.label}
               {subField.required && <span className="text-red-500">*</span>}
              </label>
              <input
               type={subField.type}
               id={subField.label.toLowerCase().replaceAll(" ", "-")}
               className="block w-full border border-gray-200 rounded-md px-3 py-2 mt-1"
              />
             </div>
            ))}
           </div>
          </>
         ) : (
          <>
           <label
            htmlFor={field.label.toLowerCase().replaceAll(" ", "-")}
            className="text-sm text-gray-600"
           >
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
           </label>
           {field.type === "select" ? (
            <select
             id={field.label.toLowerCase().replaceAll(" ", "-")}
             className="block w-full border border-gray-200 rounded-md px-3 py-2 mt-1"
             value={field.value}
             onChange={field.onChange}
            >
             {(Array.isArray(field.options)
              ? field.options
              : field.options[category]
             ).map((option, optIndex) => (
              <option key={optIndex}>{option}</option>
             ))}
            </select>
           ) : field.textArea ? (
            <textarea
             id={field.label.toLowerCase().replaceAll(" ", "-")}
             className="block w-full border border-gray-200 rounded-md px-3 py-2 mt-1"
            />
           ) : (
            <input
             type={field.type}
             id={field.label.toLowerCase().replaceAll(" ", "-")}
             className="block w-full border border-gray-200 rounded-md px-3 py-2 mt-1"
            />
           )}
          </>
         )}
        </div>
       ))}
      </div>
      <button className="mt-7 bg-orange-500 text-white px-5 py-2 rounded-md">
       Submit
      </button>
     </form>
    </div>
   </div>
  </div>
 );
}
