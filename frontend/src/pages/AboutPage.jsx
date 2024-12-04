import Layout from "../Layout";

const AboutPage = () => {
 return (
  <Layout>
   <div>
    {/* Hero Section */}
    <section className="relative">
     <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 items-center min-h-[90vh]">
      <div className="px-8 py-16 w-full text-center md:text-left">
       <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
        Empowering Lives Through Giving
       </h1>
       <p className="text-gray-600 pb-6 pt-2">
        Join us in a collective journey of compassion and impact as we work hand
        in hand, transforming lives and nurturing hope around the world.
       </p>
       <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition">
        Make a Donation
       </button>
      </div>
      <div className="w-full h-full flex justify-center">
       <img
        src="/images/Smiling_children.png"
        alt="Smiling children"
        className="w-full h-full object-fit object-left"
       />
      </div>
     </div>
    </section>

    <section className="bg-white">
     <div className="py-16 px-8 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-500 mb-8">Contributors</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
       {[
        {
         name: "Mohammad Sefatullah",
         Role: "Full-Stack Developer",
         image: "/images/sefatullah.jpg",
        },
        {
         name: "Tahmid Hossain",
         Role: "Frontend Developer",
         image: "/images/tahmid.jpg",
        },
        {
         name: "Khaled Hasan Rafi",
         Role: "UI/UX & Graphic Designer",
         image: "/images/rafi.jpg",
        },
       ].map((contributor, index) => (
        <div
         key={index}
         className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
         {/* Image Section */}
         <div className="h-46 w-full overflow-hidden">
          <img
           src={contributor.image}
           alt={contributor.name}
           className="w-full aspect-square object-cover"
          />
         </div>
         {/* Text Section */}
         <div className="p-4 text-center">
          <h3 className="text-lg font-semibold">{contributor.name}</h3>
          <p className="text-gray-600">
           <strong>Role:</strong> {contributor.Role}
          </p>
         </div>
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* Inspiring Stories Section */}
    <section className="py-16">
     <div className="w-full max-w-7xl px-8 mx-auto">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
       Inspiring <span className="text-orange-500">stories</span> from
       supporters
      </h2>
      <p className="text-gray-600 mt-4">
       Discover heartfelt stories from our supporters, sharing their experiences
       and the impact of our work.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
       {/* Story Card */}
       {Array(3)
        .fill(0)
        .map((_, index) => (
         <div
          key={index}
          className="bg-white rounded-3xl shadow px-6 py-8"
         >
          <h3 className="text-lg font-bold text-gray-800">Empowering change</h3>
          <p className="text-gray-500 text-sm mt-2">
           Their work inspires hope and real change, fostering sustainable
           practices for a healthier planet.
          </p>
          <div className="flex items-center mt-4">
           <img
            src="/images/profilepic1.png"
            alt="Sebastian"
            className="w-12 h-12 rounded-full mr-4"
           />
           <div>
            <p className="text-gray-800 font-medium">Sebastian</p>
            <p className="text-gray-600 text-sm">
             Investor Interactions Executive
            </p>
           </div>
          </div>
         </div>
        ))}
      </div>
     </div>
    </section>

    {/* Support Our Mission Section */}
    <section className="bg-white py-16 px-8 text-center">
     <div className="container mx-auto">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
       Support our mission, change lives today
      </h2>
      <p className="text-gray-500 max-w-xl mx-auto">
       Your kindness fuels our efforts to deliver blood, food, and clothing to
       the most vulnerable. Join our mission of care and compassion.
      </p>
     </div>
    </section>
   </div>
  </Layout>
 );
};

export default AboutPage;
