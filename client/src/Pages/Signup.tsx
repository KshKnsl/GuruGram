import React, { useState, useEffect, useContext } from 'react';
import { Eye, EyeOff, UserPlus, Search, Plus, X } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { INTERESTS } from "../lib/utils";

interface Skill {
  name: string;
  level: number;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  dob: string;
  avatar: string;
  bio: string;
  socialLinks: string[];
  location: string;
  occupation: string;
  education: string;
  skills: Skill[];
  goals: string[];
  specialties: string[];
  ranking: number;
  totalMentees: number;
}

const inputClass = `w-full px-3 py-2 text-sm bg-transparent border border-amber-500/20 text-gray-900 dark:text-stone-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors duration-200`;
const labelClass = `block text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-2`;

const SignUp: React.FC = () => {
  const [role, setRole] = useState<'mentee' | 'mentor'>('mentee');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    dob: '',
    avatar: 'https://avatar.iran.liara.run/public/boy',
    bio: '',
    socialLinks: [],
    location: '',
    occupation: '',
    education: '',
    skills: [],
    goals: [],
    specialties: [],
    ranking: 0,
    totalMentees: 0,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInterests, setFilteredInterests] = useState<string[]>(INTERESTS);
  const [interests, setInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredInterests(
      INTERESTS.filter((interest) =>
        interest.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSkillChange = (index: number, field: 'name' | 'level', value: string | number) => {
    const updatedSkills = [...userData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setUserData(prevData => ({ ...prevData, skills: updatedSkills }));
  };

  const addSkill = () => {
    setUserData(prevData => ({
      ...prevData,
      skills: [...prevData.skills, { name: '', level: 0 }],
    }));
  };

  const removeSkill = (index: number) => {
    setUserData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  const handleInterestToggle = (interest: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((i) => i !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const endpoint = role === 'mentee' ? 'api/mentee/addMentee' : 'api/mentor/addMentor';
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, interests, role }),
      });
      await response.json();
      if (response.ok) {
        toast.success('Account created successfully!');
        setTimeout(() => {
          if (role === 'mentee') {
            navigate('/login');
          } else {
            navigate('/complete-profile');
          }
        }, 2000);
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (response: any) => {
    try {
      const endpoint =
        role === "mentee"
          ? `${import.meta.env.VITE_BACKEND_URL}/api/mentee/google-login`
          : `${import.meta.env.VITE_BACKEND_URL}/api/mentor/google-login`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });
      if (res.ok) {
        const { token, ...rest } = await res.json();
        if (role === "mentee") {
          login(token, rest.mentee._id, rest.mentee.email, role);
        } else {
          login(token, rest.mentor._id, rest.mentor.email, role);
          navigate("/complete-profile");
        }
        toast.success("Google login successful!", { position: "top-right", autoClose: 4000 });
      } else {
        toast.error(`Google login failed. Please try again.${await res.text()}`, { position: "top-right", autoClose: 4000 });
      }
    } catch (error) {
      toast.error("An error occurred during Google login.", { position: "top-right", autoClose: 4000 });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-5xl">

        <div className="mb-5">
          <span className="block text-xs font-medium tracking-widest uppercase text-amber-500 mb-1">
            Create account
          </span>
          <h1 className="font-serif-display text-3xl font-black text-gray-900 dark:text-stone-100">
            Join GuruGram
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Start your journey as a {role}
          </p>
        </div>

        <div className="flex mb-4 border border-amber-500/20 lg:w-1/2">
          {(["mentee", "mentor"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2.5 text-xs font-medium tracking-widest uppercase transition-all duration-200
                ${role === r
                  ? "bg-amber-500 text-gray-900"
                  : "bg-transparent text-gray-500 dark:text-gray-400 hover:text-amber-500"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* On desktop: two columns side by side */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-3">

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input id="name" name="name" type="text" required className={inputClass} placeholder="John Doe" value={userData.name} onChange={handleInputChange} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input id="email-address" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="you@example.com" value={userData.email} onChange={handleInputChange} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className={inputClass}
                    placeholder="••••••••"
                    value={userData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input id="dob" name="dob" type="date" required className={inputClass} value={userData.dob} onChange={handleInputChange} />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input id="location" name="location" type="text" className={inputClass} placeholder="City, Country" value={userData.location} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Occupation</label>
                  <input id="occupation" name="occupation" type="text" className={inputClass} placeholder="Software Engineer" value={userData.occupation} onChange={handleInputChange} />
                </div>
                <div>
                  <label className={labelClass}>Education</label>
                  <input id="education" name="education" type="text" className={inputClass} placeholder="B.Sc. Computer Science" value={userData.education} onChange={handleInputChange} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={2}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about yourself..."
                  value={userData.bio}
                  onChange={handleInputChange}
                />
              </div>

            </div>
            {/* ── END LEFT COLUMN ── */}

            {/* ── RIGHT COLUMN ── */}
            <div className="space-y-3 mt-3 lg:mt-0">

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`${labelClass} mb-0`}>Skills</label>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-amber-500 hover:text-amber-400 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add Skill
                  </button>
                </div>
                <div className="space-y-2 max-h-28 overflow-y-auto pr-0.5">
                  {userData.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                        placeholder="Skill name"
                        className={`${inputClass} flex-1`}
                      />
                      <input
                        type="number"
                        value={skill.level}
                        onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                        placeholder="0–100"
                        min="0"
                        max="100"
                        className={`${inputClass} w-20`}
                      />
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="p-2.5 border border-amber-500/20 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-colors shrink-0"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {role === 'mentee' && (
                <div>
                  <label className={labelClass}>Goals (comma-separated)</label>
                  <input
                    type="text"
                    name="goals"
                    id="goals"
                    className={inputClass}
                    placeholder="Learn React, Land a job at FAANG, ..."
                    value={userData.goals.join(', ')}
                    onChange={(e) => setUserData(prevData => ({ ...prevData, goals: e.target.value.split(', ').map(goal => goal.trim()) }))}
                  />
                </div>
              )}

              {role === 'mentor' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className={labelClass}>Specialties (comma-separated)</label>
                    <input
                      type="text"
                      name="specialties"
                      id="specialties"
                      className={inputClass}
                      placeholder="React, Node.js, ..."
                      value={userData.specialties.join(', ')}
                      onChange={(e) => setUserData(prevData => ({ ...prevData, specialties: e.target.value.split(', ').map(s => s.trim()) }))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Ranking (0–5)</label>
                    <input type="number" name="ranking" id="ranking" className={inputClass} value={userData.ranking} onChange={handleInputChange} step="0.1" min="0" max="5" />
                  </div>
                  <div>
                    <label className={labelClass}>Total Mentees</label>
                    <input type="number" name="totalMentees" id="totalMentees" className={inputClass} value={userData.totalMentees} onChange={handleInputChange} min="0" />
                  </div>
                </div>
              )}

              <div>
                <label className={labelClass}>
                  {role === 'mentee' ? 'Interests' : 'Field of Expertise'}
                </label>
                <div className="relative mb-2">
                  <input
                    type="text"
                    className={`${inputClass} pr-10`}
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="max-h-24 overflow-y-auto flex flex-wrap gap-1.5 p-2 border border-amber-500/15 bg-white dark:bg-gray-900">
                  {filteredInterests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={handleInterestToggle(interest)}
                      className={`px-3 py-1 text-xs font-medium tracking-wide uppercase transition-all duration-150 border
                        ${interests.includes(interest)
                          ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'border-amber-500/20 text-gray-500 dark:text-gray-400 hover:border-amber-500/50 hover:text-amber-500'
                        }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                {interests.length > 0 && (
                  <p className="mt-1.5 text-xs text-amber-500">{interests.length} selected</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="clip-skew w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900 text-xs font-medium tracking-widest uppercase transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <UserPlus className="h-3.5 w-3.5" />
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="flex items-center gap-4">
                <span className="flex-1 h-px bg-amber-500/15" />
                <span className="text-xs tracking-widest uppercase text-gray-400">or</span>
                <span className="flex-1 h-px bg-amber-500/15" />
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => toast.error("Google login failed. Please try again.", { position: "top-right", autoClose: 4000 })}
                  type="standard"
                  theme="filled_blue"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  logo_alignment="left"
                />
              </div>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">
                  Sign in
                </Link>
              </p>

            </div>
            {/* ── END RIGHT COLUMN ── */}

          </div>
        </form>

      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;