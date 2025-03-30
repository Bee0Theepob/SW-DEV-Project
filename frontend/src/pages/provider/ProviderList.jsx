import { useState, useEffect } from "react";
import { getProviders } from "../../features/provider/services";
import "./ProviderCard.css";
function ViewRental() {
  const [providers, setProviders] = useState([]); // State to store providers
  const [loading, setLoading] = useState(true); // State to show loading status

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true); // Set loading state to true before fetching
      const data = await getProviders(); // Wait for the data to be fetched
      setProviders(data); // Update the state with fetched data
      setLoading(false); // Set loading state to false after fetching
    };
    fetchProviders();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h2>Rental Car Providers</h2>
            {providers.length > 0 ? (
              <div className="providerList">
                {providers.map((provider) => (
                  <div className="provider-card">
                    <h2 className="provider-name">{provider.name}</h2>
                    <p className="provider-detail">
                      <strong>Address:</strong> {provider.address}
                    </p>
                    <p className="provider-detail">
                      <strong>Telephone:</strong> {provider.tel}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div>No providers found.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ViewRental;
