import React, { useState } from "react";
import axios from "axios";

const SignUpUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    instituteName: "",
    dob: "",
    gender: "",
    course: "",
    studentId: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", formData);
      setSuccessMessage("Form submitted successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting form. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-xl mx-auto text-whitesmoke bg-[rgba(11,15,13,0.582)] rounded-lg border border-white/10 backdrop-blur-md backdrop-saturate-[180%] p-6">
      <h2 className="text-center text-2xl font-bold mb-6 text-black tracking-wide relative after:content-[''] after:block after:h-1 after:w-20 after:bg-green-600 after:mx-auto after:mt-2 after:rounded-md">
        Student Registration Form
      </h2>

      {successMessage && <p className="text-center font-bold text-sm text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-center font-bold text-sm text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">First Name:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">Last Name:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">Email:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">Phone:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">Address:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">City:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">State:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">Date of Birth:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">Gender:</label>
          <select
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">Course:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">Student ID:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="flex-1 mr-4 font-bold text-gray-800 text-sm">Institute Name:</label>
          <input
            className="flex-2 p-3 border border-gray-300 rounded-md text-base focus:border-green-600 focus:ring-0 focus:outline-none"
            type="text"
            name="instituteName"
            value={formData.instituteName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-6">
          <button
            id="button"
            type="submit"
            className="bg-black text-white py-4 px-5 rounded-md w-full text-lg hover:opacity-60 focus:ring-0 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpUser;
