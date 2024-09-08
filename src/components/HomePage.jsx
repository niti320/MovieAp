// HomePage.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      history.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="homePageContainer">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for movies..."
          className="searchContainer"
        />
      </form>
    </div>
  );
}

export default HomePage;
