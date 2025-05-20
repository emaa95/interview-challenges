import { useRef, useState, useEffect} from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)
  const inputRef = useRef()
  const {search, updateSearch, error} = useSearch()
  const { movies,loading, getMovies} = useMovies({search, sort})


  const handleSubmit  = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    getMovies({ search: newSearch })
  }

  return (
    <div className='page'>

      <header>
       <h1>Prueba Técnica - Buscador de películas</h1>
       <form className='form' onSubmit={handleSubmit}>
          <input 
          style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
          }}
          onChange={handleChange} 
          value={search}  
          ref={inputRef} type="text" placeholder='Avengers, Star Wars, Avatar ...' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> :      <Movies movies={movies}/> 
        } 
      </main>

    </div>
  )
}

export default App
