import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold tracking-tight">Debrief</div>

      <div className="flex gap-6">
        <Link
          to="/"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Upload
        </Link>

        <Link
          to="/history"
          className="text-gray-300 hover:text-white transition-colors"
        >
          History
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
