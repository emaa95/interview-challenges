import withResults from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'
import { useState } from 'react'
import axios from 'Axios'
export function useMovies ({search}) {
  const [responseMovies, setResponseMovies] = useState([]) 
  const movies = responseMovies.description || []
  
  const mappedMovies = movies?.map(movie => ({
    id: movie["#IMDB_ID"],
    title: movie["#TITLE"],
    year: movie["#YEAR"],
    poster: movie["#IMG_POSTER"]
  })) 

  const getMovies = () => {
    if (search) {
        axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${search}`)
        .then(res => setResponseMovies(res.data))
        .catch(error => {
        console.error('Error al obtener las películas:', error);
      });
    } else {
        setResponseMovies(withoutResults)
    }
  }
  return { movies: mappedMovies, getMovies }
}