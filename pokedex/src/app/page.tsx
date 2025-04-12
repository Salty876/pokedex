import Link from "next/link";
import "./globals.css"
import styles from "./page.module.css";

export default function Pokedex() {
  const pokemonList = [
    "Pikachu", "Charizard", "Bulbasaur", "Squirtle", 
    "Jigglypuff", "Mewtwo", "Eevee", "Snorlax"
  ];

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
          />
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>

      <div className={styles.pokemonList}>
        {pokemonList.map((pokemon, index) => (
          <Link key={index} className={styles.pokemonCard} href={`/pokemon/${pokemon}`}>
            <img src={`/${pokemon}.png`} alt={pokemon}/>
          </Link>
        ))}
      </div>
    </main>
  );
}