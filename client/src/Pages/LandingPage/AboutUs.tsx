import React from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center mt-[100px] px-12 py-5">
      <h2 className="text-3xl font-semibold mb-8">About Us</h2>
      <div>
        <p className="text-gray-600 mb-8">Our platform is designed to provide a seamless experience for our users. With our automated calendar booking system, you can easily schedule meetings and appointments. Our embedded video call feature allows you to conduct video calls directly within our platform, making it easy to connect with others. We prioritize security and reliability, ensuring that your data is protected. Additionally, our platform provides access to industry experts and thought leaders who can guide you towards success.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="fa-calendar-alt"
            title="Automated Calendar Booking System"
            description="Easily schedule meetings and appointments with our automated calendar booking system."
            link="Learn More"
          />
          <FeatureCard
            icon="fa-video"
            title="Embedded Video Call Feature"
            description="Conduct video calls directly within our platform for a seamless experience."
            link="Sign Up"
          />
          <FeatureCard
            icon="fa-shield-alt"
            title="Secure and Reliable Platform"
            description="Our platform is built with security and reliability in mind, ensuring your data is protected."
            link="Learn More"
          />
          <FeatureCard
            icon="fa-user-tie"
            title="Access to Industry Experts"
            description="Get access to industry experts and thought leaders who can guide you towards success."
            link="Learn More"
          />
          <FeatureCard
            icon="fa-lightbulb"
            title="Personalized Guidance and Support"
            description="Receive personalized guidance and support to help you achieve your goals."
            link="Sign Up"
          />
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <i className={`fa ${icon} text-4xl text-gray-800 mb-4`}></i>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {/* <Link to={link} className="block mt-4 text-blue-500 hover:underline">
        {link}
      </Link> */}
    </div>
  );
};

export default AboutUs;
