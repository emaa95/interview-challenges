import { useState } from 'react'
import './App.css'
import responseMovies from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'
import { Movies } from './components/Movies'

function App() {
  const movies = responseMovies.Search
  

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
        <Movies movies={movies}/>
      </main>

    </div>
  )
}

export default App
