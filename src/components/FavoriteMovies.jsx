import React, { useState, useEffect } from "react";
import '../App.css';
import Header from "./Header";
import Card from "./Card";
import { useSearchParams } from 'react-router-dom';   

import AOS from 'aos';

function FavoriteMovies() {
  const [favorites, setFavorites] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    AOS.init({
      duration: 500,  
      easing: 'ease-in-out',  
      once: true,   
    });
  }, []);
  useEffect(() => {
    const fetchFavorites = () => {
      try {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        setError(null);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Error fetching favorites. Please try again.");
      }
    };

    fetchFavorites();
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (query) => {
    if (!query) return;
    
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=b5b4bd76`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (error) {
      console.error("Error aa gaya yaha pe:", error);
      setError("Error aya hai dubara try karein.");
    }
  };

  return (
    <div className="container" style={{flexDirection:"column"}}>
      <h1 style={{color:"white", marginBottom:"20px"}}>Your Favorites</h1>
      <div className="miniContainer" >
      <Header 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchSubmit={() => handleSearchSubmit(searchTerm)}
        />
      
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="gridContainer" data-aos="fade-up" >
          {favorites.length > 0 ? (
            favorites.map((movie) => (
              <Card key={movie.imdbID} movieId={movie.imdbID} />
            ))
          ) : (
            <div className="noResults">
            <div className="loading-spinner"></div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoriteMovies;
