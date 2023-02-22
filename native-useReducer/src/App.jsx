import { useReducer } from "react";
import "./App.css";

function UserForm() {
  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    {
      first: "",
      last: "",
    }
  );
  return (
    <div>
      <input
        type="text"
        value={state.first}
        onChange={(e) => dispatch({ first: e.target.value })}
      />
      <input
        type="text"
        value={state.last}
        onChange={(e) => dispatch({ last: e.target.value })}
      />
      <div>First:{state.first}</div>
      <div>Last:{state.last}</div>
    </div>
  );
}

function NameList() {
  //use dispatch() to define action.type
  const [state, dispatch] = useReducer(
    (state, action) => {
      // it's common to use the words "type" and "payload"
      switch (action.type) {
        case "SET_NAME":
          //state.name = action.payload; return state; won't work
          // get a new state based on the data got with the action.
          return { ...state, name: action.payload };
        case "ADD_NAME":
          return {
            ...state,
            names: [...state.names, state.name],
            name: "",
          };
      }
    },
    {
      names: [],
      name: "",
    }
  );
  return (
    <div className="App">
      <input
        type="text"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />
      <div>Name{state.name}</div>
      <button onClick={() => dispatch({ type: "ADD_NAME" })}>Add name</button>
      <div>
        {state.names.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserForm />
      <NameList />
    </div>
  );
}

export default App;
