import React, { useState } from "react";
import PasswordField from "../components/PasswordField";
import EmailField from "../components/EmailField";
import FormError from "../components/FormError";
import { registerUser } from "../api/authService";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ email, password, confirmPassword });
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const userData = { email, password };
      const newUser = await registerUser(userData);
      console.log("User created:", newUser);
    } catch (err) {
      setError(err.message);
    }

    // console.log({ email, password });
  };

  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg shadow-lg bg-white/80 p-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">Register</h1>
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
              validate={true}
            />

            {/* Confirm Password Field */}
            <PasswordField
              label={"Confirm password"}
              callbackPassword={setConfirmPassword}
              validate={true}
            />
          </div>

          {/* Sign-in Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
