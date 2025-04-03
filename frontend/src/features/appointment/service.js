import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/appointments/";

export const addAppointment = async (authToken, apptData) => {
  console.log("Sending Appointment Data:", apptData);

  try {
    const response = await axios.post(API_URL, apptData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("Response Data:", response.data);

    if (response.data?.success) {
      return response.data; // Return the appointment data
    } else {
      throw new Error(response.data?.message || "Unexpected response format");
    }
  } catch (error) {
    console.error(
      "Error creating appointment:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for better error handling
  }
};
