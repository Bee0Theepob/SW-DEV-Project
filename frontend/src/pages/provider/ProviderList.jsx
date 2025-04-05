import { useState, useEffect } from "react";
import { getProviders } from "../../features/provider/services";
import ProviderCard from "./ProviderCard";

function ViewRental() {

  const totalPage = 4;

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    providerName: "",
    providerAddress: "",
    isPriceAscending: true,
    minPrice: "",
    maxPrice: "",
    currentPage: 1,
  });

  // Fetch providers when filters change, including currentPage
  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      const data = await getProviders(filters);
      setProviders(data);
      setLoading(false);
    };
    fetchProviders();
  }, [filters]); // Only re-fetch when filters (currentPage, minPrice, maxPrice, etc.) change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  const submitSearch = () => {
    setFilters((prev) => ({
      ...prev,
      currentPage: 1, // Reset to page 1 when new search is made
    }));
  };

  const handleSortChange = () => {
    setFilters((prev) => ({
      ...prev,
      isPriceAscending: !prev.isPriceAscending,
    }));
  };

  const handlePageChange = (pageNumber) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      currentPage: pageNumber,
    }));
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Rental Car Providers</h2>

          <label htmlFor="providerName">Provider Name</label>
          <input
            type="text"
            name="providerName"
            value={filters.providerName}
            onChange={handleChange}
            placeholder="Search by name"
          />

          <label htmlFor="providerAddress">Provider Address</label>
          <input
            type="text"
            name="providerAddress"
            value={filters.providerAddress}
            onChange={handleChange}
            placeholder="Search by address"
          />

          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min price"
          />

          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max price"
          />

          <button onClick={handleSortChange}>
            Sort by Price {filters.isPriceAscending ? "▲" : "▼"}
          </button>

          <button onClick={submitSearch}>Search</button>

          {providers.length > 0 ? (
            <div className="providerList">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div>No providers found.</div>
          )}

          <div>
            {filters.currentPage !== 1 && (
              <button onClick={() => handlePageChange(filters.currentPage - 1)}>
                Previous
              </button>
            )}

            {/* Display page numbers */}
            <div className="pageNumbers">
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={filters.currentPage === pageNumber ? "active" : ""}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            {filters.currentPage !== totalPage && (
              <button onClick={() => handlePageChange(filters.currentPage + 1)}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewRental;
