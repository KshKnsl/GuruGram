import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileCompletion() {
  const [step, setStep] = useState(2);
  const [formData, setFormData] = useState({
    location: "",
    occupation: "",
    education: "",
    bio: "",
    skills: [{ name: "", level: 0 }],
    goals: [""],
  });
  
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("_id");
    if (!userId) {
      navigate("/login");
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (
    index: number,
    field: "name" | "level",
    value: string | number
  ) => {
    const newSkills = [...formData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setFormData({ ...formData, skills: newSkills });
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...formData.goals];
    newGoals[index] = value;
    setFormData({ ...formData, goals: newGoals });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("_id");
      console.log("Submitting profile:", formData);
      const endpoint = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/mentor/updateMentor`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _id: userId }),
      });
      if (res.ok) {
        const rest = await res.json();
        console.log(rest);
        navigate("/profile/mentor");
      } else {
        console.error("Failed to login with Google:", res);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Professional Information
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500  bg-gray-100"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500  bg-gray-100"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500  bg-gray-100"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500 bg-gray-100"
                  required
                ></textarea>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Skills and Goals</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Skills
                </label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex space-x-2 mt-2">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        handleSkillChange(index, "name", e.target.value)
                      }
                      placeholder="Skill name"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500 bg-gray-100"
                    />
                    <input
                      type="number"
                      value={skill.level}
                      onChange={(e) =>
                        handleSkillChange(
                          index,
                          "level",
                          parseInt(e.target.value)
                        )
                      }
                      placeholder="Level"
                      min="0"
                      max="100"
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500 bg-gray-100"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      skills: [...formData.skills, { name: "", level: 0 }],
                    })
                  }
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Add Skill
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Goals
                </label>
                {formData.goals.map((goal, index) => (
                  <input
                    key={index}
                    type="text"
                    value={goal}
                    onChange={(e) => handleGoalChange(index, e.target.value)}
                    placeholder="Enter a goal"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500  bg-gray-100"
                  />
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, goals: [...formData.goals, ""] })
                  }
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {step <= 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600"
            >
              Complete Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
