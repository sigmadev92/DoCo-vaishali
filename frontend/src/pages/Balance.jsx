import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiseLoader } from "react-spinners";
export default function Balance() {
  // Access global state from Redux
  const { userData, loggedIn } = useSelector((state) => state.user);

  // State to manage balance display
  const [balance, setBalance] = useState(null);

  // Update balance when userData changes
  useEffect(() => {
    if (userData && loggedIn) {
      setBalance(userData.balance);
    }
  }, [userData, loggedIn]);

  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Page Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Account Balance
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-center">
          Current balance in view, always there for you!
        </h2>

        {/* Balance Display */}
        <div className="text-center text-3xl font-semibold text-navy-blue mb-6">
          {balance !== null ? `₹${balance.toFixed(2)}` : <RiseLoader color="#001f3f" />}
        </div>

        {/* Link to return to previous page */}
        <div className="text-center mt-4 space-y-2">
          <Link to="/" className="text-sm text-navy-blue hover:underline block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
