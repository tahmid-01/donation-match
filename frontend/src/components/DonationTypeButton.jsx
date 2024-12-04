export function DonationTypeButton({ type, onClick, selected }) {
    return (
     <button
      className={`px-6 py-2 border-2 border-solid rounded-xl leading-none text-center whitespace-nowrap ${
       selected
        ? "border-orange-500 bg-orange-500 text-white"
        : "border-gray-200 bg-transparent text-black hover:bg-gray-100"
      }`}
      onClick={onClick}
     >
      {type}
     </button>
    );
   }
   