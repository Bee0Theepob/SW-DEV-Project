import { useState, useEffect } from "react";
import { getProviders } from "../../features/provider/services";
import ProviderCard from "./ProviderCard";

function ViewRental() {
  const [providers, setProviders] = useState([]); // State to store providers
  const [loading, setLoading] = useState(true); // State to show loading status
  const [providerName, setProviderName] = useState(""); // State to store provider name
  const [providerAddress, setProviderAddress] = useState(""); // State to store provider address

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      const data = await getProviders();
      setProviders(data);
      setLoading(false);
    };
    fetchProviders();
  }, []);

  // ฟังก์ชันสำหรับจัดการการพิมพ์ใน input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "providerName") {
      setProviderName(value);
    } else if (name === "providerAddress") {
      setProviderAddress(value);
    }
  };

  // กรอง providers ตามค่าที่พิมพ์
  const filteredProviders = providers.filter(
    (provider) =>
      provider.name.toLowerCase().includes(providerName.toLowerCase()) &&
      provider.address.toLowerCase().includes(providerAddress.toLowerCase())
  );

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Rental Car Providers</h2>

          <label htmlFor='providerName'>Provider Name</label>
          <input
            type='text'
            name='providerName'
            value={providerName}
            onChange={handleChange}
            placeholder='Search by name'
          />

          <label htmlFor='providerAddress'>Provider Address</label>
          <input
            type='text'
            name='providerAddress'
            value={providerAddress}
            onChange={handleChange}
            placeholder='Search by address'
          />

          {filteredProviders.length > 0 ? (
            <div className='providerList'>
              {filteredProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div>No providers found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewRental;
