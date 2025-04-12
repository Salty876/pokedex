import "@/app/globals.css"
import styles from "./pokemon_page.module.css";



export default async function Page({
    params,
}: {
    params:Promise<{pokemon: string}>
}) {
    const {pokemon} = await params
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
            <img src={`/${pokemon}.png`} alt="Pokemon_Name" />
          </div>
        </main>
      );

}


