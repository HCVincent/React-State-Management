import { useState, useEffect } from "react";
import "./App.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    // setInterval(() => {
    //   console.log(time);
    //   setTime(time + 1);
    // }, 1000);
    const interval = setInterval(() => {
      setTime((t) => {
        console.log(t);
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>Time:{time}</div>;
};

function App() {
  const [names, setNames] = useState([]);
  // Asynchronous code should not be executed inside the component function.
  // Instead, you should use a useEffect hook to fetch data and update the state.
  useEffect(() => {
    fetch("/names.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setNames(data))
      .catch((error) => console.error("Error fetching names:", error));
    // The useEffect hook is used to fetch data from the server and update the state of the component.
    // The [] dependency array passed as the second argument to useEffect ensures that the effect is only executed once, when the component is mounted.
  }, []);

  const [selectedName, setSelectedName] = useState(null);
  const [selectedNameDetails, setSelectedNameDetails] = useState(null);

  const onSelectedNameChange = (name) => {
    fetch(`/${name}.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setSelectedNameDetails(data));
  };
  useEffect(() => {
    // only fetch the data if we actually have a selectedName
    if (selectedName) {
      fetch(`/${selectedName}.json`)
        .then((response) => {
          return response.json();
        })
        .then((data) => setSelectedNameDetails(data));
    }
  }, [selectedName]);
  return (
    <div className="App">
      <Stopwatch />
      {names.map((name) => (
        <button onClick={() => onSelectedNameChange(name)}>{name}</button>
      ))}
      <div>{JSON.stringify(selectedNameDetails)}</div>
    </div>
  );
}

export default App;
