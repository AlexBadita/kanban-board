import React from "react";

function FormError({ errorMessage }) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <p className="text-sm text-red-800">{errorMessage}</p>
    </div>
  );
}

export default FormError;
