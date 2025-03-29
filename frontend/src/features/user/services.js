import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/users/";  // Ensure your URL is correct

// Fetch all users
export const getUsers = async (authToken) => {  // Pass authToken as an argument
  try {
    const response = await axios.get(API_URL, {  // Headers should be part of the second argument object
      headers: {
        Authorization: `Bearer ${authToken}`,  // Make sure authToken is passed correctly
      }
    });

    if (response.data && response.data.success) { 
      console.log(response.data);  // Log the response data for debugging
      return response.data.data;  // Return the list of users
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }
};