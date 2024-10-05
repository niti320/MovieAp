

export const fetchMovieData = async (movieId) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${movieId}&apikey={yourApiKey}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};
