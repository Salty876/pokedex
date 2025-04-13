

import "@/app/globals.css"
import styles from "./pokemon_page.module.css";
import { move, Pokemon } from "@/app/components/interfaces";


export default async function Page({params,
          }: {
        params: Promise<{ pokemon: string }>
         }){
    
      
        const { pokemon } = await params


        const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon}`,);
        const pokemonData = await response.json();
        console.log(pokemonData)
        console.log(pokemonData.types[0])

    
    return (
        <main className={styles.main}>
            {/* header */}
          <div className={styles.header}>
            <h2>
              <img src="/pokeball.png" alt="Pokeball" className={styles.logo} />
              Pokédex!
            </h2>
            {/* <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchBar}
                placeholder="Search Pokémon..."
              />
              <button className={styles.searchButton}>Search</button>
            </div> */}
          </div>

          {/* pokemon info  */}
          <div className={styles.pokemonInfo}>
            <img src={pokemonData.sprite} alt={pokemonData.name} className={styles.pokemonSprite}/>
            <p className={styles.pokemonName}>{String(pokemonData.name).charAt(0).toUpperCase() + String(pokemonData.name).slice(1)}</p>
            
            
            <p className={styles.pokemonDescription}>{pokemonData.description}</p>
          </div>
          <div className={styles.pokemonInfoMore}>
            <h2 className={styles.pokemonInfoTitle}>Pokedex Info</h2>
            <div className={styles.pokemonId}>#{pokemonData.order}</div>
            <div className={styles.pokemonType}><img src={pokemonData.types[0].icon}></img></div>
            <div className={styles.pokemonHeight}>Height: {pokemonData.height}m</div>
            <div className={styles.pokemonWeight}>Weight: {pokemonData.weight}</div>
            <div className={styles.pokemonAbilities}>Abilities: Blaze, Solar Power</div>
           </div>


            <div className={styles.pokemonInfoMore}>
            <div>
            <p className={styles.pokemonMovesListTitle}>Moves: </p>
            <ul className={styles.pokemonMovesListItems}>
                {pokemonData.moves?.map((move: move) => (
                    <li key={move.level} className={styles.pokemonMove}>{move.level}: {move.name}</li>
              ))}
            </ul>
              </div>
            </div>
        </main>
      );

}


