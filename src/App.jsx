import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/HomePage.css';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('top-rated'); 
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'top-rated') {
      navigate('/top-rated');
    } else if (tab === 'favorites') {
      navigate('/favorites');
    }
  };

  return (
    <div className="homePageContainer">
      <form onSubmit={handleSearchSubmit} className='forom'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Movies"
          className="searchContainer"
        />
        <div className="tabs">
          <button
            onClick={() => handleTabClick('top-rated')}
            className={`tabButton  ${activeTab === 'top-rated' ? 'active' : ''}`}
          >
            Top Rated
          </button>
          <button
            onClick={() => handleTabClick('favorites')}
            className={`tabButton  ${activeTab === 'favorites' ? 'active' : ''}`}
          >
            Nitin's Favorites
          </button>
        </div>

      </form>


    </div>
  );
}

export default App;
