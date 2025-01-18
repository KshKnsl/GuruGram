import React, { useState } from "react";
import axios from "axios";

const SignUpMentor = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    dob: "",
    gender: "",
    field: "",
    workExperience: "",
    workingAt: "",
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
      const response = await axios.post("http://localhost:5000/api/signup", formData);
      setSuccessMessage("Form submitted successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting form. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container max-w-xl bg-white p-8 rounded-xl shadow-lg animate-fadeIn">
      <h2 className="text-2xl text-black text-center mb-5 tracking-wide relative">
        Mentor Registration Form
        <span className="block w-20 h-1 bg-green-500 mx-auto mt-2 rounded-sm"></span>
      </h2>

      {successMessage && <p className="text-center text-green-500 font-bold mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-center text-red-500 font-bold mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">Field:</label>
          <input
            type="text"
            name="field"
            value={formData.field}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">Work Experience:</label>
          <input
            type="text"
            name="workExperience"
            value={formData.workExperience}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group flex items-center">
          <label className="flex-1 font-bold text-gray-800 text-sm mr-4">Working At:</label>
          <input
            type="text"
            name="workingAt"
            value={formData.workingAt}
            onChange={handleChange}
            className="flex-2 p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="form-group mt-6">
          <button
            id="button"
            type="submit"
            className="w-full p-4 bg-black text-white rounded-lg hover:opacity-75 transition-opacity"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpMentor;
