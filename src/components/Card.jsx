import React, { useState, useEffect } from "react";
import '../Card.css'; 
import { fetchMovieData } from '../utils/fetchMovieData';
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import AOS from 'aos'; 


function Card({ movieId }) {
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetchMovieData(movieId);
      setMovie(data);
      checkIfFavorite(data);
      setLoading(false); 
    };

    fetchMovie();
    AOS.refresh(); 
  }, [movieId]);

  const checkIfFavorite = (movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFav = favorites.some(fav => fav.imdbID === movie.imdbID);
    setIsFavorite(isFav);
  };

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const getStarRating = (rating) => {
    if (rating >= 0 && rating < 4) return 1;
    if (rating >= 4 && rating < 6) return 2;
    if (rating >= 6 && rating < 8) return 3;
    if (rating >= 8 && rating < 9) return 4;
    if (rating >= 9) return 5;
    return 0;
  };

  const renderStars = () => {
    const stars = [];
    const imdbRating = movie && movie.imdbRating ? parseFloat(movie.imdbRating) : 0;
    const starCount = getStarRating(imdbRating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= starCount ? 'selected' : ''}>
          {i <= starCount ? <FaStar /> : <FaRegStar />}
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-aos="zoom-in" 
    >
      {loading ? (
       <div className="noResults">
       <div className="loading-spinner"></div>
     </div>
      ) : (
        <>
          <div
            className="card-background"
            style={{
              backgroundImage: movie ? `url(${movie.Poster})` : 'none'
            }}
          />

          <div
            className={`favorite-icon ${hovered ? 'show' : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? <FaHeart size={"30px"} color="#22ee99" /> : <FaRegHeart size={"30px"} />}
          </div>

          <div className="card-content">
            {movie && (
              <>
                <div className="info">
                  <h2 style={{textTransform:"uppercase", fontSize:"18px"}}>{movie.Title}</h2>
                  <h2 style={{fontSize:"17px", fontWeight:"normal", color:"yellow", marginTop:"10px"}}>{movie.Year}</h2>
                <br />
                  <p style={{fontSize:"12px"}}><strong>Director:</strong> {movie.Director}</p>
                  <p style={{fontSize:"12px"}}><strong>Cast:</strong> {movie.Actors}</p>
                <br />
          
                  <p style={{fontSize:"20px"}}><strong>IMDB:</strong> {movie.imdbRating}</p>
                </div>
                <div className="rating">
                  {renderStars()}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
