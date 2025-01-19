import React, { useContext, useState, useEffect } from 'react';
import { Eye, EyeOff, UserPlus, Search } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../context/AuthContext.tsx";
import { GoogleLogin } from "@react-oauth/google";
import { INTERESTS } from "../constants";

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [role, setRole] = useState<'mentee' | 'mentor'>('mentee');
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInterests, setFilteredInterests] = useState<string[]>(INTERESTS);
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
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, bio, interests, role }),
      });
      console.log(await response.json());
      if (response.ok) {
        toast.success('Account created successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
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
        console.log(rest);
        if (role === "mentee") {
          login(token, rest.mentee._id, rest.mentee.email);
        } else {
          login(token, rest.mentor._id, rest.mentor.email);
        }
        toast.success("Google login successful!", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.error(
          `Google login failed. Please try again.${await res.text()}`,
          {
            position: "top-right",
            autoClose: 4000,
          }
        );
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An error occurred during Google login.", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your GuruGram account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            <div>
              <label htmlFor="bio" className="sr-only">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">I want to be a:</label>
            <div className="mt-2">
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className={`${
                    role === 'mentee'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } px-3 py-2 rounded-l-md border border-gray-300 text-sm font-medium focus:outline-none`}
                  onClick={() => setRole('mentee')}
                >
                  Mentee
                </button>
                <button
                  type="button"
                  className={`${
                    role === 'mentor'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } px-3 py-2 rounded-r-md border border-gray-300 text-sm font-medium focus:outline-none`}
                  onClick={() => setRole('mentor')}
                >
                  Mentor
                </button>
              </div>
            </div>
          </div>

          <div>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() =>
                toast.error("Google login failed. Please try again.", {
                  position: "top-right",
                  autoClose: 4000,
                })
              }
              type="standard"
              theme="filled_black"
              size="large"
              text="signin_with"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              {isLoading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {role === 'mentee' ? 'Interests' : 'Field of Expertise'}
          </h3>
          <div className="mt-2 relative">
            <input
              type="text"
              className="w-full p-2 pl-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Search field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-2 flex flex-wrap gap-2 max-h-48 overflow-y-scroll scrollbar-hidden">
            {filteredInterests.map((interest) => (
              <button
                key={interest}
                onClick={(e) => {
                  handleInterestToggle(interest)(e);
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  interests.includes(interest)
                    ? "bg-indigo-100 text-indigo-800 border-2 border-indigo-500"
                    : "bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300"
                } cursor-pointer`}
              >
                {interest}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="text-md font-medium text-gray-900">Selected Interests:</h4>
            <div className="flex flex-wrap gap-1 mt-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="text-sm font-medium  text-indigo-800 "
                >
                  {interest},
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
