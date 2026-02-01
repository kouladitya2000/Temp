import React, { useState, useEffect } from "react";

const CountryDashboard = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // 1. Fetch data on mount
  useEffect(() => {
    fetch("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // 2. Handle partial search logic
  const handleSearch = () => {
    const results = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(results);
    setHasSearched(true);
  };

  return (
    <div className="container">
      <h2>Where in the world?</h2>
      
      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a country..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Results Display */}
      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.id} className={`country-list-${country.id}`}>
              <img src={country.flag} alt={`${country.name} flag`} />
              <div className="country-details">
                <h3>{country.name}</h3>
                <p><strong>Population:</strong> {country.population}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital}</p>
              </div>
            </div>
          ))
        ) : (
          // 3. Error message for no matches
          <p>No country found!</p>
        )}
      </div>
    </div>
  );
};

export default CountryDashboard;
