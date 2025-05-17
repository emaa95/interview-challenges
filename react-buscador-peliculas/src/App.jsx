import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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

      </main>

    </div>
  )
}

export default App
