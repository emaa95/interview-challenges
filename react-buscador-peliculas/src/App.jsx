import { useState } from 'react'
import './App.css'
import responseMovies from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'

function App() {
  const movies = responseMovies.Search
  const hasMavies = movies.length > 0

  return (
    <div className='page'>

      <header>
        <h1>Prueba Técnica - Buscador de películas</h1>
       <form className='form'>
          <input type="text" placeholder='Avengers, Star Wars, Avatar ...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        {
          hasMavies ?
          (
            <ul>
              {
                movies.map( movie => (
                  <li key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title}/>
                  </li>
                ))
              }
            </ul>
          ) : (
            <p>No se encontraron películas para esta búsqueda</p>
          )
        }
      </main>

    </div>
  )
}

export default App
