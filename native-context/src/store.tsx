import React from "react";

import {
  useReducer,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";

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

function usePokemonSource(): {
  pokemon: Pokemon[];
  search: string;
  setSearch: (search: string) => void;
} {
  // Define the shape of the state
  type PokemonState = {
    pokemon: Pokemon[];
    search: string;
  };

  // Define the possible actions to update the state
  type PokemonAction =
    | { type: "setPokemon"; payload: Pokemon[] }
    | { type: "setSearch"; payload: string };

  // Define the reducer function to update the state based on the action
  const [{ pokemon, search }, dispatch] = useReducer(
    (state: PokemonState, action: PokemonAction) => {
      switch (action.type) {
        case "setPokemon":
          return { ...state, pokemon: action.payload };
        case "setSearch":
          return { ...state, search: action.payload };
      }
    },
    {
      pokemon: [],
      search: "",
    }
  );

  // Fetch the initial Pokemon data and update the state accordingly
  useEffect(() => {
    fetch("/pokemon.json")
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: "setPokemon",
          payload: data,
        })
      );
  }, []);

  // Define a callback function to update the search term in the state
  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }, []);

  // Filter and sort the Pokemon based on the search term
  const filteredPokemon = useMemo(
    () =>
      pokemon
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [pokemon, search]
  );

  const sortedPokemon = useMemo(
    () => [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredPokemon]
  );

  // Return the sorted and filtered Pokemon data along with the setSearch function
  return { pokemon: sortedPokemon, search, setSearch };
}

// Create a context to store the Pokemon data and setSearch function
const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);

// Custom hook to access the Pokemon data and setSearch function
export function usePokemon() {
  return useContext(PokemonContext);
}

// Component to provide the Pokemon data and setSearch function to the child components
export function PokemonProvider({ children }: { children: React.ReactNode }) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
}
