import React, { useEffect, useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovieHandler = useCallback(async () => {

    setIsLoading(true)
    setError(null)
    try {
      // const response = await fetch('https://swapi.dev/api/films')
      const response = await fetch('https://react-http-a81c6-default-rtdb.firebaseio.com/movies.json')

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const data = await response.json()
      if (typeof data === null) throw new Error(`Can't read data`)

      const loadedMovies = []
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      setMovies(loadedMovies)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMovieHandler()
  }, [fetchMovieHandler])

  async function addMovieHandler(movie) {

    const response = await fetch('https://react-http-a81c6-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = response.json()
    console.log(data)

  }

  let content = <p>Found No Movies</p>
  if (movies.length > 0) content = <MoviesList movies={movies} />
  if (isLoading) content = <p>Loading...</p>
  if (error) content = <p>{error}</p>


  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && !error && movies.length === 0 && <p>No Movies Found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
