"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = "areebayaseen15@gmail.com";
    const adminPassword = "1122334455";

    if (email === adminEmail && password === adminPassword) {
      setMessage("Login successful ✅");
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      setMessage("❌ Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 px-4">
      <form
        onSubmit={handleLogin}
        className="relative bg-gray-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700 text-white"
      >
        {/* Animated Shield Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gray-800 rounded-full shadow-md">
            <FaShieldAlt className="text-4xl text-blue-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-4">Admin Login</h2>
        <p className="text-center text-gray-400 mb-6">Enter your credentials to access the dashboard.</p>

        {message && (
          <div className="mb-4 p-3 rounded-lg text-center text-sm bg-red-500/20 text-red-400">
            {message}
          </div>
        )}

        {/* Email Input */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold rounded-xl hover:scale-105 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
