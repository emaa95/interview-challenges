import type {Product} from "./types";

import {useEffect, useMemo, useState} from "react";

import api from "./api";

// Función para obtener los favoritos del localStorage
const getFavoritesFromLocalStorage = (): Set<number> => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? new Set(JSON.parse(storedFavorites)) : new Set();
};

// Función para guardar los favoritos en el localStorage
const saveFavoritesToLocalStorage = (favorites: Set<number>) => {
  localStorage.setItem("favorites", JSON.stringify([...favorites]));
};

function Recommended() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    api.search().then(setProducts);
  }, []);
  
  const randomProducts = useMemo(() => [...products]
  .sort(() => (Math.random() > 0.5 ? 1 : -1))
  .slice(0, 2), [products]);

  return (
    <main>
      <h1>Productos recomendados</h1>
      <ul>
        {
          randomProducts.map((product) => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))}
      </ul>
    </main>
  );
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(getFavoritesFromLocalStorage());

  useEffect(() => {

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      api.search(query).then(setProducts);
    }, 300);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
    
  }, [query]);

  

  const toggleFavourite = (productId: number) => {
    setFavorites((prevFavourites) => {
      const newFavourites = new Set (prevFavourites);

      if (newFavourites.has(productId)){
        newFavourites.delete(productId);
      } else {
        newFavourites.add(productId);
      }

      saveFavoritesToLocalStorage(newFavourites);
      
      return newFavourites;
    })
  }

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {products.map((product) => (
          <li key={product.id} className={favorites.has(product.id) ? "fav" : " "}
            onClick={() => toggleFavourite(product.id)}
          >
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>$ {product.price}</span>
          </li>
        ))}
      </ul>
      <hr />
      <Recommended />
    </main>
  );
}

export default App;
