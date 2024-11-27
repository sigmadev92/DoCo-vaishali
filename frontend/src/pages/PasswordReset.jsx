import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../api/UserFunction";
export default function PasswordReset() {
  // Access user data and dispatch function from Redux
  const user = useSelector((state) => state.user);
  console.log("Reset password: ", user);

  const navigate = useNavigate();

  // Local state to handle form inputs
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handler for form submission
  const handlePasswordReset = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setErrorMessage("");
    setSuccessMessage("");

    // Basic input validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      const error = "All fields are required.";
      toast.error(error);
      setErrorMessage(error);
      return;
    }

    if (newPassword !== confirmPassword) {
      const error = "New password and confirm password do not match.";
      toast.error(error);
      setErrorMessage(error);
      return;
    }
    setLoading(true);
    try {
      console.log("handlePasswordReset: Sending request to reset password...");

      // Call the helper function to reset the password
      const response = await resetPassword(
        user.userData?._id,
        currentPassword,
        newPassword,
        confirmPassword
      );

      if (response.status) {
        toast.success("Password updated successfully");
        setSuccessMessage(response.message || "Password updated successfully!");
        setErrorMessage("");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(response.message || "Error during password reset");
        setErrorMessage(response.message || "Error during password reset.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("handlePasswordReset: Unexpected error:", error);
      const errorMessage = "Something went wrong. Please try again.";
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage("");
    } finally {
      setLoading(false); // Disable loading state
    }
  };

  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Reset Password
        </h1>

        {/* Digital Pin Display */}
        <div className="mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-center">
            Your Current Password
          </h2>
          <div className="text-base sm:text-lg md:text-xl font-bold mb-4 text-center">
            ********
          </div>
        </div>

        {/* Reset Digital Pin Section */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-center ">
            Reset Your Password
          </h2>

          {/* Display error or success messages */}
          {errorMessage && (
            <div className="text-red-500 text-sm text-center mb-4">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm text-center mb-4">
              {successMessage}
            </div>
          )}

          <div className="space-y-2">
            {/* Form for resetting the password */}
            <form onSubmit={handlePasswordReset}>
              {/* Current Password Input */}
              <input
                type="password"
                placeholder="Enter Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
                required
              />

              {/* New Password Input */}
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
                required
              />

              {/* Confirm New Password Input */}
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading} // Disable button when loading
                className={`${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-navy"
                } text-white w-full p-2 rounded text-sm sm:text-base`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>

          {/* Back Link */}
          <div className="text-center mt-4 space-y-2">
            <Link
              to="/forgotPassword"
              className="text-sm text-navy-blue hover:underline block"
            >
              Forgot Password
            </Link>
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
