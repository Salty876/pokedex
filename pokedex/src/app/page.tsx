"use client"
import Link from "next/link";
import "./globals.css";
import styles from "./page.module.css";
import React, {useState, useEffect} from 'react'
import { Pokemon } from "./useful/interfaces"

export default  function Page() {
  const [pokeData, setData] = useState<any[]>([])
  const [isLoading, setLoading] = useState(true)

  const [searchTerm, setSearchInput] = useState("");

  // Event handler for search bar
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target === null){return}
    const element = e.target as HTMLInputElement;
    setSearchInput((element).value)
  }

  useEffect(() => {
    fetch(`https://bron-dex.vercel.app/api/main/list`, {cache:"force-cache"}, )
      .then((res) => res.json())
      .then((pokeData) => {
        setData(pokeData)
        setLoading(false)
      })
  }, [])
  if (isLoading) return <p>Loading...</p>
  if (!pokeData) return <p>No pokemon data</p>

  let data = pokeData;

  if (searchTerm.length > 0){
    data = pokeData.filter(p => typeof p.name === "string" && p.name.includes(searchTerm) === true)
  } else{
    data = pokeData;

  }
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
            onChange={handleChange}
          />

        </div>
      </div>

      <div className={styles.pokemonList}>
        {data.map((pokemon, index) =>
        // check if sprite exists before rendering
          pokemon.sprite ? (
            <Link key={index} className={styles.pokemonCard} href={{
              pathname: `/pokemon/${pokemon.name}`
              
            }}>
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