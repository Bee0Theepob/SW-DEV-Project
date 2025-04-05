import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/rentalcarproviders/";  // Ensure your URL is correct

// Fetch all rental car providers
export const getProviders = async (filters) => {
  try {
    let request;
    console.log(filters);
    if(filters.isPriceAscending){
      request = `${API_URL}?name=${filters.providerName}&address=${filters.providerAddress}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&sort=price&page=${filters.currentPage}`;
    }
    else{
      request = `${API_URL}?name=${filters.providerName}&address=${filters.providerAddress}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&sort=-price&page=${filters.currentPage}`
    }
    const response = await axios.get(request);

    if (response.data && response.data.success) { 
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching providers:", error.message);
    return [];
  }
};

