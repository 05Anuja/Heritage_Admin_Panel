import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import Axios from "../utils/axiosConfig";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await Axios.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const { token, admin } = response.data;

      if (!token) {
        toast.error("Login failed. Authentication token was not returned.");
        return;
      }

      // Save the token using the key expected by axiosConfig.js.
      localStorage.setItem("token", token);

      // Save admin details for use elsewhere in the admin panel.
      if (admin) {
        localStorage.setItem("admin", JSON.stringify(admin));
      }

      toast.success("Login successful!");

      // Return to the requested page, or go to the dashboard.
      const destination = location.state?.from?.pathname || "/";

      navigate(destination, { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to log in. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#E8E0D5] bg-white py-3.5 pl-11 pr-4 text-sm text-[#2B2520] outline-none transition placeholder:text-[#B0A69B] focus:border-[#A17B50] focus:ring-2 focus:ring-[#A17B50]/10";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F5EF] px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#EAE2D7] bg-white shadow-xl lg:grid-cols-2">
        {/* Left panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#704A2D] p-10 text-white lg:flex xl:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-white/10" />

          <div className="relative z-10">
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <ShieldCheck size={27} />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-wide">
                  Heritage Bharat
                </h1>
                <p className="mt-1 text-xs text-white/70">
                  Administration Portal
                </p>
              </div>
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D2B2]">
              Welcome Back
            </p>

            <h2 className="max-w-sm text-4xl font-bold leading-tight xl:text-5xl">
              Manage your collection with ease.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              Access your dashboard to manage products, review customer
              enquiries, and keep your Heritage Bharat collection up to date.
            </p>
          </div>

          <div className="relative z-10 border-t border-white/15 pt-5">
            <p className="text-xs text-white/60">
              Secure access for authorised administrators only.
            </p>
          </div>
        </div>

        {/* Login form */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F0E8] text-[#704A2D]">
                <ShieldCheck size={26} />
              </div>

              <h1 className="text-2xl font-bold text-[#2B2520]">
                Heritage Bharat
              </h1>

              <p className="mt-1 text-sm text-[#81756A]">
                Administration Portal
              </p>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-[#A17B50]">
                ADMIN SIGN IN
              </p>

              <h2 className="text-3xl font-bold text-[#2B2520]">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#81756A]">
                Enter your administrator credentials to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#49392C]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A99B8B]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    className={inputClass}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#49392C]"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A99B8B]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`${inputClass} pr-12`}
                    required
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#81756A] transition hover:bg-[#F5F0E8] hover:text-[#704A2D]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#704A2D] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#573820] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#EAE2D7] bg-[#FCFAF7] p-4">
              <LockKeyhole
                size={18}
                className="mt-0.5 shrink-0 text-[#704A2D]"
              />

              <p className="text-xs leading-5 text-[#81756A]">
                This portal is restricted to authorised administrators. If you
                cannot access your account, contact your administrator.
              </p>
            </div>

            <p className="mt-8 text-center text-xs text-[#A99B8B]">
              Heritage Bharat Admin Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
