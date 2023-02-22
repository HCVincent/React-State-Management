import "./App.css";
import { useRef, useEffect, useState } from "react";

function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const idRef = useRef(1);
  const [names, setNames] = useState([
    {
      id: idRef.current++,
      name: "John",
    },
  ]);
  const onAddName = () => {
    setNames([
      ...names,
      {
        id: idRef.current++,
        name: inputRef.current.value,
      },
    ]);
    inputRef.current.value = "";
  };
  return (
    <div className="App">
      <div>
        {names.map((name) => (
          <div key={name.id}>
            {name.id}:{name.name}
          </div>
        ))}
      </div>
      <input type="text" ref={inputRef} />
      <button onClick={onAddName}>Add name</button>
    </div>
  );
}

export default App;
