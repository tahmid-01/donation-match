const Hero = () => {
 return (
  <section className="w-full max-w-7xl px-8 mx-auto hero-section py-24">
   <div className="w-full grid lg:grid-cols-2 gap-8 justify-between items-center">
    {/* Left Side: Text */}
    <div className="text-content leading-[1.2]">
     <h1 className="text-5xl xl:text-6xl tracking-tighter font-[800] text-black" id="home--hero-title">
      BE THE <span className="text-orange-600">HOPE</span> <br />
      SOMEONE NEEDS
     </h1>
     <p className="mt-6 leading-6 text-gray-600 max-w-[400px]" id="home--hero-desc">
      From life-saving blood to essential food and clothing, your donations
      create real change. Together, we can transform lives.
     </p>
    </div>

    {/* Right Side: Stats Cards */}
    <div className="grid grid-cols-2 gap-4 lg:gap-12 h-[90%] whitespace-nowrap">
     <div className="card flex flex-col items-center justify-center bg-white rounded-lg shadow-md px-14 xl:px-16 h-fit xl:h-full py-14 xl:py-0 text-center" id="home--hero-box">
      <p className="text-3xl xl:text-4xl font-light text-gray-500">10000+</p>
      <p className="text-xl xl:text-2xl font-bold text-black-500 mt-5">
       Donations
      </p>
     </div>
     <div className="card flex flex-col items-center justify-center bg-white rounded-lg shadow-md px-14 xl:px-16 h-fit xl:h-full py-14 xl:py-0 text-center" id="home--hero-box">
      <p className="text-3xl xl:text-4xl font-light text-gray-500">
       1 Million+
      </p>
      <p className="text-xl xl:text-2xl font-bold text-black-500 mt-5">
       Connected
      </p>
     </div>
    </div>
   </div>
  </section>
 );
};

export default Hero;
