import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordField({
  label,
  callbackPassword,
  validate = false,
  reset = false,
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [vadidationError, setValidationError] = useState("");

  const handlePasswordEnter = (e) => {
    const value = e.target.value;

    setPassword(value);

    if (validate) {
      // Password Validation Rules
      const isValid =
        value.length >= 6 &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value);

      if (!isValid) {
        setValidationError(
          "Password must be at least 6 characters, include an uppercase letter, a lowercase letter, and a number."
        );
        return;
      } else {
        setValidationError("");
      }
    }

    callbackPassword(value);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-base font-medium">
          {label}
        </label>
        {/* Fogot Password */}
        {reset && (
          <a
            to="/forgot-password"
            className="text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Forgot your password?
          </a>
        )}
      </div>
      {/* Input Password Field */}
      <div className="relative mt-1">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={handlePasswordEnter}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="••••••••"
        />
        {/* Toggle Password Visibility */}
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {vadidationError && (
        <p className="mt-1 text-sm text-red-600 text-justify">
          {vadidationError}
        </p>
      )}
    </div>
  );
}

export default PasswordField;
