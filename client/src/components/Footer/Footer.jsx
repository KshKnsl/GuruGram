import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 h-fit pt-12 md:pt-12 lg:pt-12">
      <div className="container mx-auto p-3 md:p-3 lg:p-8">
        <div className="flex flex-wrap justify-between mb-4">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 md:p-6 lg:p-8">
            <h5 className="text-lg font-bold mb-2">About GuruGram</h5>
            <p className="text-gray-600">
              Our mentoring platform connects candidates with industry experts
              to provide personalized guidance and support.
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 md:p-6 lg:p-8">
            <h5 className="text-lg font-bold mb-2">Quick Links</h5>
            <ul className="list-none mb-0">
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Mentor Sign-up
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Candidate Sign-up
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Login
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 md:p-6 lg:p-8">
            <h5 className="text-lg font-bold mb-2">Stay Connected</h5>
            <ul className="list-none mb-0">
                <li className="mb-2 flex items-center">
                    <a href="https://www.facebook.com/gurugramofficial" target="_blank" className="text-gray-600 hover:text-gray-900 mr-2">
                    <i className="fab fa-facebook-f" />
                    </a>
                    <div className="text-sm text-gray-600">Facebook</div>
                </li>
                <li className="mb-2 flex items-center">
                    <a href="https://twitter.com/gurugram" target="_blank" className="text-gray-600 hover:text-gray-900 mr-2">
                    <i className="fab fa-twitter" />
                    </a>
                    <div className="text-sm text-gray-600">Twitter</div>
                </li>
                <li className="mb-2 flex items-center">
                    <a href="https://www.linkedin.com/company/gurugram/" target="_blank" className="text-gray-600 hover:text-gray-900 mr-2">
                    <i className="fab fa-linkedin-in" />
                    </a>
                    <div className="text-sm text-gray-600">LinkedIn</div>
                </li>
                <li className="mb-2 flex items-center">
                    <a href="https://www.instagram.com/gurugramofficial/" target="_blank" className="text-gray-600 hover:text-gray-900 mr-2">
                    <i className="fab fa-instagram" />
                    </a>
                    <div className="text-sm text-gray-600">Instagram</div>
                </li>
                </ul>
          </div>
        </div>
        <hr className="border-gray-300" />
        <p className="text-gray-600 text-center mb-4">
          &copy; 2024 GuruGram. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
