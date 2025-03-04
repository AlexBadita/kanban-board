import React, { useState } from "react";

function EmailField({ callbackEmail }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailEnter = (e) => {
    const value = e.target.value;

    setEmail(value);

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value.match(emailPattern)) {
      setError("Invalid email address!");
      return;
    } else {
      setError(""); // Clear error if valid
    }

    callbackEmail(value);
  };

  return (
    <div>
      <label htmlFor="email" className="block text-base font-medium">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={handleEmailEnter}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        placeholder="you@example.com"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default EmailField;
