import React, { useState, useEffect } from "react";
import '../App.css';
import Header from "./Header";
import AOS from 'aos';
import Card from "./Card";
import { useSearchParams } from 'react-router-dom'; 

function SearchResult() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false); 
  const [searchParams] = useSearchParams(); 

  useEffect(() => {
    AOS.init({
      duration: 500, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);

  useEffect(() => {
    const query = searchParams.get('query'); 
    if (query) {
      setSearchTerm(query);
      handleSearchSubmit(query); 
    }
  }, [searchParams]);

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
        setNotFound(false); 
      } else if (data.Response === "False" && data.Error === "Movie not found!") {
        setMovies([]);
        setError(null);
        setNotFound(true); 
      } else {
        setMovies([]);
        setError(data.Error);
        setNotFound(false); 
      }
    } catch (error) {
      console.error("Error aa gaya yaha pe:", error);
      setError("Error aya hai dubara try karein.");
      setNotFound(false); 
    }
  };

  const handleGenreClick = (genre) => {
    setSearchTerm(genre);
    handleSearchSubmit(genre);
  };

  return (
    <div className="container">
      <div className="miniContainer">
        <Header 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchSubmit={() => handleSearchSubmit(searchTerm)}
          onGenreClick={handleGenreClick}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="gridContainer" data-aos="fade-up">
          {notFound ? (
            <div className="noResults">
              <h1 style={{color: "white", fontSize: "30px"}}>Movies not found</h1>
            </div>
          ) : (
            movies.length > 0 ? (
              movies.map((movie) => (
                <Card key={movie.imdbID} movieId={movie.imdbID}/>
              ))
            ) : (
              <div className="noResults">
                <div className="loading-spinner"></div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
