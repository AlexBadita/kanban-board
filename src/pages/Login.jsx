import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField";
import EmailField from "../components/EmailField";
import FormError from "../components/FormError";
import { loginUser } from "../api/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const userData = await loginUser(email, password);
      console.log("User logged in:", userData);

      // Store user session (e.g., JWT token in localStorage)
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect to dashboard or home page
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }

    console.log({ email, password });
  };

  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg shadow-lg bg-white/80 p-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">TaskFlow</h1>
          <p className="mt-2 text-lg text-gray-600">
            Sign in to manage your tasks
          </p>
        </div>

        {error && <FormError errorMessage={error} />}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <EmailField callbackEmail={setEmail} />

            {/* Password Field */}
            <PasswordField
              label={"Password"}
              callbackPassword={setPassword}
              reset={true}
            />
          </div>

          {/* Sign-in Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>

        {/* Sign-up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-black hover:text-gray-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
