import type {Product} from "./types";

import {useEffect, useState} from "react";

import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(localStorage.getItem("query") || "");
  const [sortOrder, setSortOrder] = useState<string>(localStorage.getItem("sortOrder") || "");


  useEffect(() => {
    api.search(query).then(setProducts);
  }, [query]);

  useEffect(() => {
    if (query) {
      localStorage.setItem("query", query);
    }
    if (sortOrder) {
      localStorage.setItem("sortOrder", sortOrder);
    }
  }, [query, sortOrder])

  const sortProducts = (products: Product[], sortOrder: string) => {
    switch (sortOrder){
      case "alphabetical":
        return [...products].sort((a,b) => a.title.localeCompare(b.title));

      case "price-asc":
        return [...products].sort((a,b) => a.price - b.price );
    
      case "price-desc":
        return [...products].sort((a,b) => b.price - a.price);
      
      default: 
        return products;
      
    }    
  };

  const sortedProducts = sortProducts(products, sortOrder);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="">Ordenar por</option>
        <option value="alphabetical">Orden Alfabético</option>
        <option value="price-asc">Precio: Menor a Mayor</option>
        <option value="price-desc">Precio: Mayor a Menor</option>
      </select>
      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>{new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(product.price)}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
