import type {Item} from "./types";

import {useEffect, useState} from "react";

import styles from "./App.module.scss";
import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [textInput, setTextInput] = useState("");

  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) => (item.id === id ? {...item, completed: !item.completed} : item)),
    );
  }

  const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

  function handleAdd(event: React.ChangeEvent<Form>) {
    // Should implement
    event.preventDefault();
    setItems([...items, {id: generateId(), text: textInput, completed: false}])
    setTextInput("");
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input name="text" type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li
            key={item.id}
            className={item.completed ? styles.completed : ""}
            onClick={() => handleToggle(item.id)}
          >
            {item.text} <button onClick={() => handleRemove(item.id)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
