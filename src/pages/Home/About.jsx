import React from 'react';
import PageTitle from '../../components/PageTitle';

const About = () => {

  const teamMembers = [
    {
      image: "https://res.cloudinary.com/dth5ysuhs/image/upload/v1735148444/Screenshot_201_fmoghw.png",
      name: "Piyush Anand",
      position: "CEO & Founder"
    },
    {
      image: "https://res.cloudinary.com/dth5ysuhs/image/upload/v1735148443/Screenshot_202_kcbbxk.png",
      name: "Dhruv Maheshwari",
      position: "CTO"
    },
    {
        image: "https://res.cloudinary.com/dth5ysuhs/image/upload/v1735148442/Screenshot_203_v8gaqb.png",
        name: "Gautam Sharma",
        position: "CFO"
    },
    {
      name: "Devansh Chimaniya",
      position: "Head of Operations"
    },
    {
      name: "Amit Kumar",
      position: "Lead Developer"
    }
  ];

  return (
    <div className="min-h-screen">
        <PageTitle title="InvenQuity | About us" />
      <section>
        <div className="max-w-6xl mx-auto pt-16">
          <div>
            {/* Hero Section */}
            <div className="text-center text-indigo-900 mb-16">
              <h1 className="text-6xl font-bold mb-6">About InvenQuity</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Revolutionizing inventory management through innovation and simplicity
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">Our Mission</h3>
                <p className="text-black/90">
                  To empower businesses with intelligent inventory solutions that drive growth and efficiency.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">Our Vision</h3>
                <p className="text-black/90">
                  To become the global standard for modern inventory management systems.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">Our Values</h3>
                <p className="text-black/90">
                  Innovation, reliability, and customer success drive everything we do.
                </p>
              </div>
            </div>

            {/* Story Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl mt-12">
              <h2 className="text-3xl font-bold text-indigo-600 mb-6">Our Story</h2>
              <div className="text-black/90 space-y-4">
                <p>
                  Founded in 2024, InvenQuity emerged from a simple observation: businesses needed a better way to manage their inventory.
                </p>
                <p>
                  Today, we serve thousands of businesses worldwide, helping them streamline their operations and boost productivity through our innovative solutions.
                </p>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl mt-12">
              <h2 className="text-3xl font-bold text-indigo-600 mb-6">Our Team</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                      )}
                    </div>
                    <h4 className="text-blue-900 font-bold">{member.name}</h4>
                    <p className="text-black/80">{member.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;