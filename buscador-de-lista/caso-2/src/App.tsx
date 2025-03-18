import type {Product} from "./types";

import {useEffect, useMemo, useState} from "react";

import api from "./api";

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

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
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
