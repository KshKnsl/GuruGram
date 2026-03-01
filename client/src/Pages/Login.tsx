import React, { useState, useContext } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext.tsx";
import { GoogleLogin } from "@react-oauth/google";

const inputClass = `w-full px-4 py-3 text-sm bg-transparent border border-amber-500/20 text-gray-900 dark:text-stone-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors duration-200`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"mentee" | "mentor">("mentee");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "mentee"
          ? `${import.meta.env.VITE_BACKEND_URL}/api/mentee/login`
          : `${import.meta.env.VITE_BACKEND_URL}/api/mentor/login`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      if (response.ok) {
        toast.success("Login successful!");
        const { token, mentee } = await response.json();
        login(token, mentee._id, mentee.email, role);
        if (role === "mentor") {
          navigate("/profile/mentor");
        } else {
          navigate("/profile");
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-gray-950">
      <div className="w-full max-w-md px-8 py-16">
        <div className="w-full">
          <div className="mb-10">
            <span className="block text-xs font-medium tracking-widest uppercase text-amber-500 mb-2">Welcome back</span>
            <h1 className="font-serif-display text-4xl font-black text-gray-900 dark:text-stone-100">
              Sign in
            </h1>
          </div>

          <div className="flex mb-8 border border-amber-500/20">
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                className={inputClass}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={inputClass}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 border border-amber-500/30 accent-amber-500"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-xs text-amber-500 hover:text-amber-400 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="clip-skew w-full flex items-center justify-center gap-2 py-3.5 mt-2 bg-amber-500 hover:bg-amber-400 text-gray-900 text-xs font-medium tracking-widest uppercase transition-all duration-200"
            >
              <LogIn className="h-3.5 w-3.5" />
              Sign In
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <span className="flex-1 h-px bg-amber-500/15" />
            <span className="text-xs tracking-widest uppercase text-gray-400">or</span>
            <span className="flex-1 h-px bg-amber-500/15" />
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed. Please try again.", { position: "top-right", autoClose: 4000 })}
              type="standard"
              theme="filled_black"
              size="large"
              text="signin_with"
            />
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;