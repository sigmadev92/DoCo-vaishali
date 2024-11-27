import axios from "axios";
import { accountUrl } from "./URL.js";

// @ deposit
export const depositMoney = async (userId, amount) => {
  try {
    // Make the POST request to the deposit API endpoint
    const response = await axios.post(`${accountUrl}/deposit`, {
      userId: userId,
      amount: amount,
    });

    // Return the response data for further processing
    return response.data;
  } catch (error) {
    // Catch and handle any error that occurs during the API call
    console.error("Error during deposit API call:", error);
    throw new Error("Failed to deposit amount");
  }
};

// @ withdraw
export const withdrawMoney = async (userId, amount) => {
  try {
    // Make the POST request to the withdrawal API endpoint
    const response = await axios.post(`${accountUrl}/withdraw`, {
      userId: userId,
      amount: amount,
    });

    // Return the response data for further processing
    return response.data;
  } catch (error) {
    // Catch and log any errors during the API request
    console.error("Error during withdrawal API call:", error);
    throw new Error("Failed to process withdrawal");
  }
};
// @ transfer money
export const transferMoney = async (fromUserId, recipientEmail, amount) => {
    try {
      // Make the POST request to the transfer API endpoint
      const response = await axios.post(`${accountUrl}/transfer`, {
        fromUserId: fromUserId,
        recipientEmail: recipientEmail, // Pass the recipient email
        amount: amount,
      });
  
      // Return the response data for further processing
      return response.data;
    } catch (error) {
      // Catch and log any errors that occur during the API request
      console.error("Error during transfer API call:", error);
      throw new Error("Failed to process transfer");
    }
  };

// @ trasaction history - for fast rendering its in same page

// @ view balance -  - used redux!
