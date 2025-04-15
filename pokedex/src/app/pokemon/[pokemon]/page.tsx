

import "@/app/globals.css"
import styles from "./pokemon_page.module.css";
import { abilty, encounter, move, Pokemon, pType } from "@/app/useful/interfaces";
import { mergeEncountersByGame, compare_level, listOutAbilities } from "@/app/useful/functions";
import Link from "next/link";
import Move from "../../../components/move/Move"


export default async function Page({params,
      }: {
    params: Promise<{ pokemon: string }>
      }){

  
    const { pokemon } = await params


    const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon}`,);
    const pokemonData = await response.json();
    console.log(pokemonData)
    console.log(pokemonData.types)

    let abilities:string = listOutAbilities(pokemonData.abilities)
    console.log(abilities)

    
      
    // Merge encounters
    const mergedEncounters = mergeEncountersByGame(pokemonData.encounters);
    console.log(mergedEncounters)


    

    return (
        <main className={styles.main}>
            {/* header */}
          <div className={styles.header}>
            <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h2>
              <img src="/pokeball.png" alt="Pokeball" className={styles.logo} />
              Pokédex!
            </h2>
            </Link>
            
            
          </div>

          {/* pokemon info  */}

          <div className={styles.pokemonInfo}>
            <img src={pokemonData.sprite} alt={pokemonData.name} className={styles.pokemonSprite}/>
            <p className={styles.pokemonName}>{String(pokemonData.name).charAt(0).toUpperCase() + String(pokemonData.name).slice(1)}</p>
            
            
            <h4 className={styles.pokemonDescription}>{pokemonData.description}</h4>
          </div>


          {/* pokedex info */}
          <div className={styles.pokemonInfoMore}>
            <h2 className={styles.pokemonInfoTitle}>Pokedex Info</h2>
            <div className={styles.pokemonId}>#{pokemonData.order}</div>
            <div className={styles.pokemonType}>{pokemonData.types.map((currType: {icon:string;  name:string}) =>(
              <img className={styles.typeImage} src={currType.icon} alt={currType.name} />
              ))}
              </div>
            <div className={styles.pokemonHeight}><h4>Height:</h4> {pokemonData.height}m</div>
            <div className={styles.pokemonWeight}><h4>Weight:</h4> {pokemonData.weight}kg</div>

            <div className={styles.pokemonAbilities}><h4>Abilities:</h4>{abilities}</div>

          </div>


          {/* moves */}
          <div className={styles.pokemonMoves}>
              {/* Moves by level up */}
            <div className={styles.pokemonMoveContainer}>
              <h3 className={styles.pokemonMovesListTitle}>Moves by level-up: </h3>
              <ul className={styles.pokemonMovesListItems}>
                  {pokemonData.moves.sort(compare_level)?.map((move: move) => move.method == "level-up" ? (
                      <Move level={move.level} name={move.name}></Move>
                ): null)}
              </ul>
            </div>

            {/* Moves by tutor */}
            <div>
              <h3 className={styles.pokemonMovesListTitle}>Moves by Tutor: </h3>
              <ul className={styles.pokemonMovesListItems}>
                  {pokemonData.moves?.map((move: move) => move.method == "tutor" ? (
                      <Move level={move.level} name={move.name}></Move>
                ): null)}
              </ul>
            </div>
            {/* Moves by TM */}
            <div>
              <h3 className={styles.pokemonMovesListTitle}>Moves by TM/HM: </h3>
              <ul className={styles.pokemonMovesListItems}>
                  {pokemonData.moves?.map((move: move) => move.method == "machine" ? (
                      <Move level={move.level} name={move.name}></Move>
                ): null)}
              </ul>
            </div>
            
            {/* Moves bt egg */}
            <div>
              <h3 className={styles.pokemonMovesListTitle}>Moves by egg: </h3>
              <ul className={styles.pokemonMovesListItems}>
                  {pokemonData.moves?.map((move: move) => move.method == "egg" ? (
                      <Move level={move.level} name={move.name}></Move>
                ): null)}
              </ul>
            </div>


          </div>


          {/* Encounters */}
          <div className={styles.pokemonInfoMoreLarge}>
            <h3 className={styles.pokemonMovesListTitle}>Encounters: </h3>
            <ul className={styles.pokemonMovesListItems}>
                {mergedEncounters?.map((encounter: any) => (
                    <li key={encounter.game} className={styles.pokemonMove}>{encounter.game}: {encounter.locations.join(", ")}<hr></hr></li>
              ))}
            </ul>
          </div>

          <div className={styles.pokemonInfoMoreLarge}>
            <h3 className={styles.pokemonMovesListTitle}>Stats: </h3>
            <ul className={styles.pokemonMovesListItems}>
                {/* {pokemonData.stats?.map((stat: any) => (
                    <li key={stat.name} className={styles.pokemonMove}>{stat.name}: {stat.value}</li>
              ))} */}
            </ul>
          </div>

        </main>
      );

}   
