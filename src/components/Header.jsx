import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import AOS from 'aos';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

function Header({ searchTerm, onSearchChange, onSearchSubmit, onGenreClick }) {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 300, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault(); 
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`); 
      setShowSearchOverlay(false); 
    }
  };

  return (
    <>
      <div className="HeaderBox">
        <div className="mainheader">
          <div className="NavButtons">
            <button className="NavButton" onClick={() => navigate('/')}>
              <i className="fas fa-home" style={{ fontSize: "15px" }}></i>
              <p style={{ fontSize: "12px", fontWeight: "normal" }}>Home</p>
            </button>
            <button className="NavButton" onClick={() => navigate('/top-rated')}>
              <i style={{ fontSize: "15px" }} className="fa-solid fa-tag"></i>
              <p style={{ fontSize: "12px", fontWeight: "normal" }}>Top Rated</p>
            </button>
            <button className="NavButton" onClick={() => navigate('/favorites')}>
              <i style={{ fontSize: "15px" }} className="fa-solid fa-heart"></i>
              <p style={{ fontSize: "12px", fontWeight: "normal" }}>Favorites</p>
            </button>
          </div>
          <button
            style={{ width: "40px" }}
            className="NavButton"
            onClick={() => setShowSearchOverlay(true)}
          >
            <i className="fa-solid fa-magnifying-glass" style={{ color: "white" }}></i>
          </button>
        </div>
      </div>

      {showSearchOverlay && (
        <div className="search-overlay">
          <div className="search-container" data-aos="fade">
            <form onSubmit={handleSearchSubmit} className="form2">
              <input
                type="text"
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Search Movies"
                className="giant-search-bar"
              />
              <button
                type="button" 
                className="close-button"
                onClick={() => setShowSearchOverlay(false)}
              >
                X
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
