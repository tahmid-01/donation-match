
export function DonorCard({ name, donationType, donations, imageSrc }) {
 return (
  <div className="flex flex-col w-full">
   <div className="flex flex-col grow pb-4 w-full rounded-3xl bg-back">
    <img
     loading="lazy"
     src={imageSrc}
     alt={`Profile photo of ${name}`}
     className="object-cover aspect-square rounded-t-3xl bg-black/10"
    />
    <div className="flex flex-col px-5 mt-4 mb-3">
     <div className="text-xl font-semibold text-black">
      {name}
     </div>
     <div className="text-xl font-light text-black">
      <span className="font-medium">Donate:</span> {donationType}
     </div>
     <div className="flex gap-5 justify-between self-stretch">
      <div className="text-lg font-medium leading-loose text-orange-500">
       Ready to Donate!
      </div>
     </div>
    </div>
    <hr className="border-[1.5px] border-gray-300" />

    <div className="flex items-center justify-between gap-4 px-5">
     <div className="flex flex-col">
      <div className="mt-2 text-2xl font-bold text-black">{donations}</div>
      <div className="text-xl text-zinc-500">Donations</div>
     </div>
     <button className="text-md font-medium text-center text-black border-2 border-orange-500 border-solid bg-orange-500 bg-opacity-20 rounded-[50px] px-5 py-1 hover:bg-orange-500 hover:text-white">
      Request
     </button>
    </div>
   </div>
  </div>
 );
}
