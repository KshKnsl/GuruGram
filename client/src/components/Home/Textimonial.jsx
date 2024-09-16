import React from 'react';

function Testimonial() {
  return (
    <div className="flex flex-col items-center my-16">
      <h2 className="text-3xl font-semibold mb-8">What Our Mentees Say</h2>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            image="https://via.placeholder.com/150"
            quote="I was able to land my dream job thanks to the guidance and support of my mentor. The platform made it easy to connect with industry experts and get personalized feedback."
            name="Emily R."
            title="Software Engineer at Google"
          />
          <TestimonialCard
            image="https://via.placeholder.com/150"
            quote="The platform helped me to clarify my career goals and create a roadmap to achieve them. I'm now working in my dream industry and loving every minute of it!"
            name="David K."
            title="Marketing Manager at Amazon"
          />
          <TestimonialCard
            image="https://via.placeholder.com/150"
            quote="I was struggling to find a job after graduating, but the platform connected me with a mentor who helped me to improve my resume and prepare for interviews. I'm now working in my field and loving it!"
            name="Sarah L."
            title="Data Analyst at Microsoft"
          />
          <TestimonialCard
            image="https://via.placeholder.com/150"
            quote="The platform provided me with access to industry experts and thought leaders who guided me towards success. I'm now running my own business and loving the freedom and flexibility it brings."
            name="John D."
            title="Founder of XYZ Startups"
          />
        </div>
      </div>
    </div>
  );
}

const TestimonialCard = ({ image, quote, name, title }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">

      <div className='w-full flex align-center justify-center'><img src={image} alt={name} className="w-24 h-24 rounded-full mb-4" /></div>
      <p className="text-gray-600 mb-4">{quote}</p>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );
};

export default Testimonial;