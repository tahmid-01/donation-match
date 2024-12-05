import { useState } from "react";
import Layout from "../Layout";
import { createRequest } from "../utils/API";

export default function NewRequest() {
 const [category, setCategory] = useState("Blood (A+)");
 const [unit, setUnit] = useState("mL");
 const fields = [
  {
   label: "Phone",
   type: "tel",
   className: "col-span-full",
   required: true,
   placeholder: "+880-**********",
   pattern: "[+]{1}[0-9]{1,}-[0-9]{10,}",
   maxLength: 15,
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
   label: "Relation to Patient",
   type: "select",
   required: true,
   options: [
    "Self (Man)",
    "Self (Woman)",
    "Spouse",
    "Father",
    "Mother",
    "Son",
    "Daughter",
    "Brother",
    "Sister",
    "Relative (Man)",
    "Relative (Woman)",
    "Unknown",
   ],
  },
  {
   label: "Description",
   type: "text",
   textArea: true,
   className: "col-span-full",
  },
  {
   toggle: "Address",
   className: "col-span-full",
   fields: [
    {
     label: "Country",
     type: "text",
    },
    {
     label: "State",
     type: "text",
    },
    {
     label: "City",
     type: "text",
    },
    {
     label: "Street",
     type: "text",
    },
    {
     label: "Zip",
     type: "number",
    },
   ],
  },
 ];

 const handleSubmit = (e) => {
  e.preventDefault();

  const data = {
   category,
   relationship: e.target[4].value,
   amount: {
    value: null,
   },
   phone: {
    code: document.getElementById("phone").value.split("-")[0],
    number: document.getElementById("phone").value.split("-")[1],
   },
  };

  if (document.getElementById("country").value) {
   data.address.country = document.getElementById("country").value;
  }
  if (document.getElementById("state").value) {
   data.address.state = document.getElementById("state").value;
  }
  if (document.getElementById("city").value) {
   data.address.city = document.getElementById("city").value;
  }
  if (document.getElementById("street").value) {
   data.address.street = document.getElementById("street").value;
  }
  if (document.getElementById("zip").value) {
   data.address.zip = document.getElementById("zip").value;
  }

  if (document.getElementById("amount").value) {
   data.amount.value = document.getElementById("amount").value;
  }
  if (document.getElementById("unit").value) {
   data.amount.unit = document.getElementById("unit").value;
  }

  if (document.getElementById("description").value) {
   data.description = document.getElementById("description").value;
  }

  createRequest(
   data,
   () => {
    alert("Request created successfully!");
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
  <Layout>
   <div className="inset-0 z-50 bg-back flex justify-center overflow-y-auto py-20">
    <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg">
     <h1 className="text-2xl font-semibold">New Request</h1>
     <div className="grid lg:grid-cols-2 mt-7 gap-8">
      <form onSubmit={handleSubmit}>
       <div className="mt-2 grid grid-cols-2 gap-4">
        {fields.map((field, index) => (
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
             className="hidden w-full grid grid-cols-2 gap-4 mt-2"
             id={field.toggle.toLowerCase().replaceAll(" ", "-")}
            >
             {field.fields.map((subField, subIndex) => (
              <div key={subIndex}>
               <label
                htmlFor={subField.label.toLowerCase().replaceAll(" ", "-")}
                className="text-sm text-gray-600"
               >
                {subField.label}
                {subField.required && (
                 <span className="text-red-500 ml-1">*</span>
                )}
               </label>
               <input
                type={subField.type}
                required={subField.required}
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
             {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === "select" ? (
             <select
              id={field.label.toLowerCase().replaceAll(" ", "-")}
              className="block w-full border border-gray-200 rounded-md px-3 py-2 mt-1"
              value={field.value}
              required={field.required}
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
              placeholder={field.placeholder}
              pattern={field.pattern}
              required={field.required}
              maxLength={field.maxLength}
              className="block w-full border border-gray-200 rounded-md px-3 py-2 mt-1"
             />
            )}
           </>
          )}
         </div>
        ))}
       </div>
       <button
        type="submit"
        className="mt-10 bg-orange-500 text-white px-7 py-2.5 rounded-md hover:bg-orange-600"
       >
        Submit
       </button>
      </form>
     </div>
    </div>
   </div>
  </Layout>
 );
}
