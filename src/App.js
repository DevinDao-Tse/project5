import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])

  function fetchMovieHandler() {
    fetch('https://swapi.dev/api/films').
      then((res) => { return res.json() }).
      then((data) => {
        const transformedMovies = data.results.map(data => {
          return {
            id: data.episode_id,
            title: data.title,
            openingText: data.opening_crawl,
            releaseDate: data.release_date
          }
        })
        setMovies(transformedMovies)
      }).
      catch(() => { })
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
