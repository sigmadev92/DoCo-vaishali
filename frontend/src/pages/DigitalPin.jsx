import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetDigitalPin } from "../api/UserFunction";

export default function DigitalPin() {
  // Access user data from Redux
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [resetMethod, setResetMethod] = useState("pin");
  const [currentCredential, setCurrentCredential] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const [message, setMessage] = useState(""); // Message for success/error feedback

  // Function to handle form submission
  const handleResetPin = async (e) => {
    e.preventDefault();

    if (!currentCredential || !newPin || !confirmPin) {
      const error = "All fields are required.";
      toast.info(error);
      setMessage(error);
      return;
    }

    // Basic validation
    if (newPin !== confirmPin) {
      const error = "New Pin and Confirm Pin do not match.";
      toast.error(error);
      setMessage(error);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      console.log("handleResetPin: Sending request to reset digital pin...");

      // Call the helper function
      const response = await resetDigitalPin(
        user.userData?._id,
        resetMethod,
        currentCredential,
        newPin
      );

      if (response.status) {
        toast.success(response.message || "Digital Pin reset successfully!");
        setMessage(response.message || "Digital Pin reset successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const errorMessage = response.message || "Failed to reset digital pin.";
        toast.error(errorMessage);
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("handleResetPin: Unexpected error:", error);
      const errorMessage = "An error occurred. Please try again.";
      toast.error(errorMessage);
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Digital Pin
        </h1>

        {/* Digital Pin Display */}
        <div className="mb-2">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center">
            Your Current Digital Pin
          </h2>
          <div className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center">
            ****
          </div>
        </div>

        {/* Reset Digital Pin Section */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-center ">
            Reset Your Digital Pin
          </h2>

          {/* Radio Buttons for Selection */}
          <div className="flex justify-center space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="resetMethod"
                value="pin"
                checked={resetMethod === "pin"}
                onChange={(e) => setResetMethod(e.target.value)}
                className="form-radio"
              />
              <span className="text-sm sm:text-base">Use Current Pin</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="resetMethod"
                value="password"
                checked={resetMethod === "password"}
                onChange={(e) => setResetMethod(e.target.value)}
                className="form-radio"
              />
              <span className="text-sm sm:text-base">Use Password</span>
            </label>
          </div>

          {/* Conditional Inputs Based on Selected Method */}
          <form onSubmit={handleResetPin} className="space-y-2">
            {resetMethod === "pin" && (
              <input
                type="password"
                placeholder="Enter Current Pin"
                value={currentCredential}
                onChange={(e) => setCurrentCredential(e.target.value)}
                className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
                required
              />
            )}

            {resetMethod === "password" && (
              <input
                type="password"
                placeholder="Enter Current Password"
                value={currentCredential}
                onChange={(e) => setCurrentCredential(e.target.value)}
                className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
                required
              />
            )}

            {/* New Pin Input */}
            <input
              type="password"
              placeholder="Enter New Pin"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
              required
            />

            {/* Confirm New Pin Input */}
            <input
              type="password"
              placeholder="Confirm New Pin"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
              required
            />

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-navy"
              } text-white w-full p-2 rounded text-sm sm:text-base`}
            >
              {loading ? "Resetting..." : "Reset Digital Pin"}
            </button>
          </form>

          {/* Feedback Message */}
          {message && (
            <div
              className={`text-center mt-4 ${
                message.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </div>
          )}

          {/* Back Link */}
          <div className="text-center mt-4 space-y-4">
            <Link
              to="/"
              className="text-sm text-navy-blue hover:underline block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
