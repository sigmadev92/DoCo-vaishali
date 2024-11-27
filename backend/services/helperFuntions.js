// backend/services/helperFunctions.js
import users from "../models/userModel.js";
// Helper function to generate a unique 14-digit account number
export async function generateUniqueAccountNumber() {
    let accountNumber;
    let isUnique = false;
  
    while (!isUnique) {
      // Generate a random 14-digit number
      accountNumber = Math.floor(
        10000000000000 + Math.random() * 90000000000000
      ).toString();
  
      // Check if the generated account number already exists in the database
      const existingUser = await users.findOne({ accountNumber });
      if (!existingUser) {
        isUnique = true; // Exit loop if account number is unique
      }
    }
  
    return accountNumber;
  }

// Helper function to generate a 6-digit OTP
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random number
}

// helper function to generate 10 digit new password 
export function GenerateNewPassword() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10-digit random number
}