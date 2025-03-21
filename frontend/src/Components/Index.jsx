import React from 'react';
import Testimonial from './Pages/Testimonial';
import Features from './Pages/Features';
import CallToAction from './Pages/CallToAction';
import '../../theme/styles/main.css'; // Import CSS directly


const Index = () => {
  return (
    <div>

      {/* Banner Section */}
      <section className="relative w-full -mt-6 py-24 bg-gradient-to-b from-[#E4F7F4] to-[#FFFFFF] text-[#011638]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center lg:text-left">
            {/* Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Ace Your Interview with
              <span className="text-[#025C8B]"> AI-Powered </span>
              Preparation!
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              AI-powered mock interviews crafted for you to boost your confidence and success in the job market
            </p>

            {/* Call-to-Action Button */}
            <div className="mt-8">
              <a
                className="inline-block text-lg px-6 py-3 bg-[#011638] text-[#FFFFFF] font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                href="/dashboard"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Testimonial Section */}
      <Testimonial />

      {/* Call To Action Section */}
      <CallToAction />
    </div>
  );
};

export default Index;