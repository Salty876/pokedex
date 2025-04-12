'use client'; 

import Link from "next/link";
import { useState, useEffect } from "react";
import "./globals.css";
import styles from "./page.module.css";

export default function Page() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // fetch data without needing to use async
  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch("http://localhost:3001/api/list");
      const data = await response.json();
      setAllPokemon(data);
      setFilteredPokemon(data);
    };
    fetchPokemon();
  });

  // filter pokemn based on search term
  useEffect(() => {
    const filtered = allPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchTerm, allPokemon]);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h2>
          <img src="/pokeball.png" alt="Pokeball" className={styles.logo} />
          Pokédex!
        </h2>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className={styles.searchButton}
            onClick={() => setSearchTerm("")} // Clear search
          >
            {searchTerm ? "Clear" : "Search"}
          </button>
        </div>
      </div>

      <div className={styles.pokemonList}>
        {filteredPokemon.map((pokemon, index) =>
        // check if sprite exists before rendering
          pokemon.sprite ? (
            <Link key={index} className={styles.pokemonCard} href={`/pokemon/${pokemon.name}`}>
              <img 
                src={pokemon.sprite} 
                alt={pokemon.name} 
                className={styles.pokemonImage}
              />

            </Link>
          ) : null
        )}
      </div>
    </main>
  );
}