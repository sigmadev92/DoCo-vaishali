import React from "react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white shadow-md py-6 mt-auto w-full">
      <div className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-center md:text-left mb-2 md:mb-0">
          &copy; 2024 DoCo Bank. All rights reserved.
        </p>

        <h1 className="text-xs sm:text-sm md:text-base lg:text-lg text-center md:text-left mb-2 md:mb-0">
          Secure your way, with DoCo today!
        </h1>

        <div className="flex space-x-4 text-xs sm:text-sm md:text-base lg:text-lg">
          <a href="#!" className="hover:text-gray-300">
            Privacy Policy
          </a>
          <a href="#!" className="hover:text-gray-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
