import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    fetch("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = () => {
    const result = countries.filter((c) =>
      c.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (result.length === 0) {
      setNoResult(true);
      setFiltered([]);
    } else {
      setNoResult(false);
      setFiltered(result);
    }
  };

  return (
    <div className="app">
      <h2>Where in the world?</h2>

      <input
        type="text"
        className="search-input"
        placeholder="Search for a country..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      {noResult && <p>No country found!</p>}

      <div className="countries-container">
        {filtered.map((country, index) => (
          <div
            key={country.name}
            className={`country-list-${index}`}
          >
            <img src={country.flag} alt={country.name} />
            <h4>{country.name}</h4>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
