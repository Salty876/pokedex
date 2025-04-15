'use client';

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import { Pokemon } from "./useful/interfaces";



export default function ClientPokedex({ initialData }: { initialData: Pokemon[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPokemon = initialData.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onClick={() => setSearchTerm("")}
          >
            {searchTerm ? "Clear" : "Search"}
          </button>
        </div>
      </div>

      <div className={styles.pokemonList}>
        {filteredPokemon.map((pokemon: Pokemon, index: number) =>
          pokemon.sprite ? (
            <Link
              key={index}
              className={styles.pokemonCard}
              href={{
                pathname: `/pokemon/${pokemon.name}`,
                query: { sprite: pokemon.sprite, name: pokemon.name },
              }}
            >
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
