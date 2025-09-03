import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search,setSearch] = useState("")

  const API = "https://pokeapi.co/api/v2/pokemon?limit=50";
  const ApiData = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //   console.log(data);

      const detailedApiData = data.results.map(async (curApi) => {
        // console.log(detailedApiData);
        const res = await fetch(curApi.url);
        const data = await res.json();
        return data;
      });
      
      const detailedApiRes = await Promise.all(detailedApiData);
      setPokemon(detailedApiRes);
      console.log(detailedApiRes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    ApiData();
  }, []);

  if (loading) {
    return (
      <h2 className="w-100 h-100 fs-4 d-flex justify-content-center align-items-center mt-5">
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="w-100 h-100 fs-4 d-flex justify-content-center align-items-center mt-5">
        Error : {error}
      </h2>
    );
  }

  // Search Functionality
  const SearchPokemon = pokemon.filter((curPoke)=> curPoke.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <>
      <section className="container pt-5 pe-2">
        <div className="header">
          <h1 className="text-center"> Lets Catch Pokémon</h1>
        </div>
        <div className="search-box">
          <form action="">
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search..."/>
          </form>
        </div>
        <ul>
          <div className="mt-5">
            <div className="row">
              {/* {pokemon.map((curData) => { */}
                 {SearchPokemon.map((curData) => {
                return (
                  <div className="col-6 col-md-3 pb-3">
                    <PokemonCard key={curData.id} pokemonData={curData} />
                  </div>
                );
              })}
            </div>
          </div>
        </ul>
      </section>
    </>
  );
};

export default Pokemon;
