import { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function LoginComponent() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Social Sign-In Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-100">
            <FaGoogle className="text-red-500" />
            Google
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-100">
            <FaFacebookF className="text-blue-600" />
            Facebook
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <hr className="w-full border-gray-300" />
          <span className="absolute bg-white px-2 text-gray-500 text-sm">or</span>
        </div>

        {/* Auth Form */}
        <form className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Toggle Link */}
        <div className="mt-6 text-center">
          {isSignUp ? (
            <p className="text-sm">
              Already have an account?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p className="text-sm">
              Don’t have an account?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
