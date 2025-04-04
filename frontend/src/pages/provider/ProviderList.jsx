import { useState, useEffect } from "react";
import { getProviders } from "../../features/provider/services";
import ProviderCard from "./ProviderCard";

function ViewRental() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [providerName, setProviderName] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [isPriceAscending, setPriceIsAscending] = useState(1); // 1 = ASC, -1 = DESC

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

  // ฟังก์ชันเปลี่ยนลำดับการเรียง
  const handleSortChange = () => {
    setPriceIsAscending((prev) => prev * -1);
  };

  // กรองและเรียงลำดับ providers
  const sortedProviders = [...providers]
    .filter(
      (provider) =>
        provider.name.toLowerCase().includes(providerName.toLowerCase()) &&
        provider.address.toLowerCase().includes(providerAddress.toLowerCase())
    )
    .sort((a, b) => (a.price - b.price) * isPriceAscending);

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

          {/* ปุ่มสลับการเรียงลำดับ */}
          <button onClick={handleSortChange}>
            Sort by Price {isPriceAscending === 1 ? "▲" : "▼"}
          </button>

          {sortedProviders.length > 0 ? (
            <div className='providerList'>
              {sortedProviders.map((provider) => (
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
