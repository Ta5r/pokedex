import React, { useState, useEffect } from "react";
import PokemonThumbnails from "./components/pokemonThumbnails";

function App() {
  const [allPokemons, setallPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setallPokemons((currentList) => [...currentList, data]);
        console.log(pokemon);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);
  return (
    <div className="app-container">
      <h1>Pokemon Evolutions</h1>
      <div className="pokemon-container">
        <div className="all-container">
        { allPokemons.map((pokemon,index) => <PokemonThumbnails 
        id={pokemon.id}
        name={pokemon.name}
        image={pokemon.sprites.other.dream_world.front_default}
        type = {pokemon.types[0].type.name}
        key= {index}
        />) }
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default App;
