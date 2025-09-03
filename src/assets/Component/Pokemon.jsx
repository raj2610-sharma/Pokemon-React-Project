import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const Pokemon = () => {
  // States
  const [pokemon, setPokemon] = useState([]); // All Pokémon data store karne ke liye
  const [loading, setLoading] = useState(true); // Loading indicator ke liye
  const [error, setError] = useState(null); // Error Showing ke liye
  const [search, setSearch] = useState(""); // Search input value store karne ke liye
  const [load, setLoad] = useState(12); // "Load More" functionality (initially 12 Pokémon show)

  // API link jaha se Pokémon data fetch hoga
  const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

  // Function jo API se data fetch karega
  const ApiData = async () => {
    try {
      const res = await fetch(API); // API call
      const data = await res.json();

      // Har Pokémon ka detailed data lane ke liye loop
      const detailedApiData = data.results.map(async (curApi) => {
        const res = await fetch(curApi.url);
        const data = await res.json();
        return data; // Har Pokémon ka detailed info return hoga
      });

      // Sabhi promises ek sath resolve karne ke liye Promise.all
      const detailedApiRes = await Promise.all(detailedApiData);

      // Fetched Pokémon ko state me store karna
      setPokemon(detailedApiRes);
      console.log(detailedApiRes);

      // Loading ko false karna jab data aa jaye
      setLoading(false);
    } catch (err) {
      // Agar error aaye to error state update karna
      setError(err.message);
      setLoading(false);
    }
  };

  // Component mount hone par API call karna
  useEffect(() => {
    ApiData();
  }, []);

  // Agar abhi tak data load ho raha hai
  if (loading) {
    return (
      <h2 className="w-100 h-100 fs-4 d-flex justify-content-center align-items-center mt-5">
        Loading...
      </h2>
    );
  }

  // Agar API call me error aaye
  if (error) {
    return (
      <h2 className="w-100 h-100 fs-4 d-flex justify-content-center align-items-center mt-5">
        Error : {error}
      </h2>
    );
  }

  // "Load More" button ke liye function
  const handleMore = () => {
    setLoad((prev) => prev + 12); // Har click par 12 aur Pokémon dikhaye
  };

  // Search functionality: input ke hisaab se Pokémon filter karna
  const SearchPokemon = pokemon.filter((curPoke) =>
    curPoke.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="container pt-5 pe-2">
        {/* Heading Section */}
        <div className="header">
          <h1 className="text-center"> Lets Catch Pokémon</h1>
        </div>

        {/* Search Box */}
        <div className="search-box">
          <form action="">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Search input update karna
              placeholder="Search..."
            />
          </form>
        </div>

        {/* Pokémon List */}
        <ul>
          <div className="mt-5">
            <div className="row">
              {/* Only filtered Pokémon show karna (Search + Load limit ke hisaab se) */}
              {SearchPokemon.slice(0, load).map((curData) => {
                return (
                  <div className="col-6 col-md-3 pb-3" key={curData.id}>
                    {/* Har Pokémon ka card */}
                    <PokemonCard pokemonData={curData} />
                  </div>
                );
              })}
            </div>
          </div>
        </ul>

        {/* Load More Button */}
        <div className="load-more">
          <button onClick={handleMore}>Load More</button>
        </div>
      </section>
    </>
  );
};

export default Pokemon;
