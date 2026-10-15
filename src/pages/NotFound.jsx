import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-[#704A2D]">404</h1>
      <h2 className="mt-4 text-xl font-semibold text-[#2B2520]">
        Page not found
      </h2>
      <p className="mt-2 text-sm text-[#81756A]">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-[#704A2D] px-5 py-3 text-sm font-medium text-white hover:bg-[#573820]"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
