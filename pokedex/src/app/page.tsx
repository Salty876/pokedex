import "./globals.css"
import styles from "./page.module.css"


export default function Page() {
  return (
    <main>
      <div className={styles.header}>
        <h2>
          <img src="/pokeball.png" alt="Pokeball" className="pokeball" />
          Pokédex!
        </h2>
        <input
          type="text"
          className={styles.search_bar}
          id="search_bar"
          placeholder="Search"
        />
        <button className={styles.search_button} id="search_button">Search</button>
      </div>

      <div id="pokemon_list"></div>
    </main>
  );
}