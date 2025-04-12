"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import "@/app/globals.css"
import styles from "./pokemon_page.module.css";


export default function PokemonPage(){
    
    const [pokemonData, setAllPokemon] = useState([]);
   

    // fetch data without needing to use async
    useEffect(() => {
        const fetchPokemon = async () => {
        const response = await fetch("http://localhost:3001/api/list");
        const data = await response.json();
        setAllPokemon(data);
        };
        fetchPokemon();
    });





    
    return (
        <main className={styles.main}>
            {/* header */}
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
              />
              <button className={styles.searchButton}>Search</button>
            </div>
          </div>

          {/* pokemon info  */}
          <div className={styles.pokemonInfo}>
            <img src={pokemonData.sprite} alt={pokemonData.name} className={styles.pokemonSprite}/>
            <p className={styles.pokemonName}>{String(pokemonData.name).charAt(0).toUpperCase() + String(pokemonData.name).slice(1)}</p>
            
            
            <p className={styles.pokemonDescription}>Description: A Lebron Lover.</p>
          </div>
          <div className={styles.pokemonInfoMore}>
            <h2 className={styles.pokemonInfoTitle}>Pokedex Info</h2>
            <div className={styles.pokemonId}>#{pokemonData.order}</div>
            <div className={styles.pokemonType}>Type: Fire</div>
            <div className={styles.pokemonHeight}>Height: {pokemonData.height}m</div>
            <div className={styles.pokemonWeight}>Weight: {pokemonData.weight}</div>
            <div className={styles.pokemonAbilities}>Abilities: Blaze, Solar Power</div>
           </div>


            <div className={styles.pokemonInfoMore}>
            <div>
            <p className={styles.pokemonMovesListTitle}>Moves:</p>
            <ul className={styles.pokemonMovesListItems}>
              <li className={styles.pokemonMove}>Flamethrower</li>
              <li className={styles.pokemonMove}>Solar Beam</li>
              <li className={styles.pokemonMove}>Fire Spin</li>
              <li className={styles.pokemonMove}>Ember</li>
              <li className={styles.pokemonMove}>Fire Blast</li>
              <li className={styles.pokemonMove}>Heat Wave</li>
              <li className={styles.pokemonMove}>Inferno</li>
              <li className={styles.pokemonMove}>Overheat</li>
              <li className={styles.pokemonMove}>Flame Charge</li>
              </ul>
              </div>
            </div>
        </main>
      );

}


