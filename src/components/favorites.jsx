import React, { useState, useEffect } from "react";
import '../App.css';
import Header from "./Header";
import Card from "./Card";

function FavoriteMovies() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="container" style={{flexDirection:"column"}}>
      <h1 style={{color:"white", marginBottom:"20px"}}>Your Favorites</h1>
      <div className="miniContainer" >
        <Header 
          searchTerm=""
          onSearchChange={() => {}}
          onSearchSubmit={() => {}}
          onGenreClick={() => {}}
        />
      
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="gridContainer">
          {favorites.length > 0 ? (
            favorites.map((movie) => (
              <Card key={movie.imdbID} movieId={movie.imdbID} />
            ))
          ) : (
            <div className="noResults">
              <h1 style={{ color: "white", fontSize: "80px" }}>No Favorites</h1>
              {/* <img src={require('./path/to/your/image.png')} alt="No Results" className="noResultsImage" /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoriteMovies;
