import "./App.css";
import { useState, useMemo, useCallback } from "react";

function SortedList({ list, sortFunc }) {
  console.log("sl render");
  // const sortedList = useMemo(() => [...list].sort(), [list]);
  const sortedList = useMemo(() => {
    console.log("running sort");
    return [...list].sort(sortFunc);
  }, [list, sortFunc]);

  return <div>{sortedList.join(", ")}</div>;
}

function App() {
  /* useState is a hook provided by React that allows you to manage state in a functional component. 
  The useState hook takes an initial value for the state and returns an array with two elements: 
  the current state value and a function to update the state. */
  const [numbers] = useState([10, 20, 30]);

  // only run the function when numbers changes
  const total = useMemo(
    () => numbers.reduce((acc, number) => acc + number, 0),
    [numbers]
  );
  const [names] = useState(["Bob", "Cloud", "Alice", "Dogg"]);
  // get a reference of the names, mutating names
  // const sortedNames = names.sort();

  // when rerender the page, the function runs
  // const sortedNames = [...names, names.sort()];

  // only run the function when names changes
  // const sortedNames = useMemo(() => [...names, names.sort()]);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  //not a good use of memo, because the calc is simple, and it results in a sacalar(num, string, boolean)
  // const countTotal = useMemo(() => count1 + count2, [count1, count2]);
  const countTotal = count1 + count2;
  /* click the button, will run the sl function. because usestate will rerender the page include sortFunc reference */
  // const sortFunc = (a, b) => a.localeCompare(b) * -1;

  // useCallback,callback like onChange or onClick is going on to a nested component has a property
  const sortFunc = useCallback((a, b) => a.localeCompare(b) * -1, []);
  return (
    <div>
      <div>Total:{total}</div>
      <div>names:{names.join(", ")}</div>
      <SortedList list={names} sortFunc={sortFunc} />
      <button onClick={() => setCount1(count1 + 1)}>count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>count2: {count2}</button>
      <div>Total:{countTotal}</div>
    </div>
  );
}

export default App;
