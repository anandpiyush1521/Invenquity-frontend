import React, { useState, useEffect } from "react";
import "./Home.css";
import PageTitle from "../../components/PageTitle";

function Home() {
  // Greeting Logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  // State for dynamic gradient colors
  const [waveColor, setWaveColor] = useState("from-blue-400 to-purple-500");

  // Wave color transitions
  const colors = [
    "from-blue-400 to-purple-500",
    "from-pink-400 to-red-500",
    "from-green-400 to-teal-500",
    "from-yellow-400 to-orange-500",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 3000); // Change wave color every 3 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div>
      <PageTitle title="InvenQuity | Home" />
      <section
        className={`relative flex flex-col items-center justify-center h-[80vh] bg-gradient-to-r ${waveColor} text-white transition-all duration-1000 p-10 rounded-lg shadow-lg m-8`}
      >
        {/* Wave Pattern */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,128L40,144C80,160,160,192,240,186.7C320,181,400,139,480,112C560,85,640,75,720,96C800,117,880,171,960,165.3C1040,160,1120,96,1200,90.7C1280,85,1360,139,1400,165.3L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            ></path>
          </svg>
        </div>

        {/* Greeting Section */}
        <h1 className="text-7xl mb-4 text-green-900 font-bold">{getGreeting()},</h1>
        <h2 className="text-5xl font-bold mb-6">
          Welcome to <span className="text-black">Inven<u className="text-blue-900">Quity</u></span>
        </h2>

        {/* Description Section */}
        <p className="text-lg text-center max-w-2xl mb-6 text-gray-200 font-bold">
          Simplify your inventory tracking with InvenQuity – your go-to platform for seamless management, optimization, and insights to fuel your business growth.
        </p>

        {/* Buttons Section */}
        <div className="flex gap-4">
        <a href="https://github.com/anandpiyush1521/Invenquity" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition duration-300">
          Source Code
        </a>
        </div>
      </section>
    </div>
  );
}

export default Home;
