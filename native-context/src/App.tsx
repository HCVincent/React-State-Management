import { useState, useEffect, useContext, createContext } from "react";
import React from "react";

// define the shape of a Pokemon
interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

// Define a hook to fetch Pokemon data
function usePokemonSource(): {
  pokemon: Pokemon[];
} {
  // Initialize state for Pokemon data
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  // Fetch Pokemon data when component mounts
  useEffect(() => {
    fetch("/pokemon.json")
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, []);

  // Return the Pokemon data to be used in the component
  return { pokemon };
}

// Create a context to hold the Pokemon data
const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);

// Define a hook to consume the Pokemon data from the context
function usePokemon() {
  return useContext(PokemonContext);
}

// Define a component to render the Pokemon list
const PokemonList = () => {
  // Get the Pokemon data from the context
  const { pokemon } = usePokemon();

  // Render a list of Pokemon names
  return (
    <div>
      {pokemon.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
};

// Define the main App component
function App() {
  // Wrap the PokemonList component with the PokemonContext provider
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      <PokemonList />
    </PokemonContext.Provider>
  );
}

export default App;
