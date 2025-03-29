import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/rentalcarproviders/";  // Ensure your URL is correct

// Fetch all rental car providers
export const getProviders = async () => {
  try {
    const response = await axios.get(API_URL);

    if (response.data && response.data.success) { 
      console.log(response.data)// Log the response data for debugging
      return response.data.data;  // Return the list of providers
    }
  } catch (error) {
    console.error("Error fetching providers:", error.message);
    return [];
  }
};

