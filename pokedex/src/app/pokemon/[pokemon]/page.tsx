

import "@/app/globals.css"
import styles from "./pokemon_page.module.css";
import { abilty, encounter, move, Pokemon, type } from "@/app/components/interfaces";


export default async function Page({params,
      }: {
    params: Promise<{ pokemon: string }>
      }){

  
    const { pokemon } = await params


    const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon}`,);
    const pokemonData = await response.json();
    console.log(pokemonData)
    console.log(pokemonData.types)

    function compare_level(a: any, b: any) {
        if (a.level < b.level) {
          return -1;
        }
      }

    
      function mergeEncountersByGame(encounters: encounter[]) {
        // dictionary
        const gameMap = new Map<string, Set<string>>();
      
        for (const encounter of encounters) {
          for (const game of encounter.games) {
            // if game name not in dict add it as a key
            if (!gameMap.has(game)) {
              gameMap.set(game, new Set());
            }
            // add location as value to key game
            gameMap.get(game)!.add(encounter.location);
          }
        }
        // return array version
        return Array.from(gameMap.entries()).map(([game, locations]) => ({
          game,
          locations: Array.from(locations), // optional: sorted
        }));
      }
    // Merge encounters
    const mergedEncounters = mergeEncountersByGame(pokemonData.encounters);
    console.log(mergedEncounters)


    

    return (
        <main className={styles.main}>
            {/* header */}
          <div className={styles.header}>
            <h2>
              <img src="/pokeball.png" alt="Pokeball" className={styles.logo} />
              Pokédex!
            </h2>
            
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
            <div className={styles.pokemonType}>{pokemonData.types.map((currType: {icon:string;  name:string}) =>(
              <img src={currType.icon} alt={currType.name} />
              ))}
              </div>
            <div className={styles.pokemonHeight}>Height: {pokemonData.height}m</div>
            <div className={styles.pokemonWeight}>Weight: {pokemonData.weight}kg</div>

            <div className={styles.pokemonAbilities}>Abilities: {pokemonData.abilities.map((ability: abilty) => (
              <p key={ability.name}>{ability.name}</p>
            ))}</div>

          </div>


          {/* moves */}
          <div className={styles.pokemonMoves}>
              {/* Moves by level up */}
            <div>
              <h3 className={styles.pokemonMovesListTitle}>Moves by level-up: </h3>
              <ul className={styles.pokemonMovesListItems}>
                  {pokemonData.moves.sort(compare_level)?.map((move: move) => move.method == "level-up" ? (
                      <li key={move.level} className={styles.pokemonMove}>{move.level} | {move.name}</li>
                ): null)}
              </ul>
            </div>

            {/* Moves by tutor */}
            <div>
              <h3 className={styles.pokemonMovesListTitle}>Moves by Tutor: </h3>
              <ul className={styles.pokemonMovesListItems}>
                  {pokemonData.moves?.map((move: move) => move.method == "tutor" ? (
                      <li key={move.level} className={styles.pokemonMove}>{move.name}</li>
                ): null)}
              </ul>
            </div>
            {/* Moves by TM */}
            <div>
              <h3 className={styles.pokemonMovesListTitle}>Moves by TM/HM: </h3>
              <ul className={styles.pokemonMovesListItems}>
                  {pokemonData.moves?.map((move: move) => move.method == "machine" ? (
                      <li key={move.level} className={styles.pokemonMove}>{move.name}</li>
                ): null)}
              </ul>
            </div>
            
            {/* Moves bt ehh */}
            <div>
              <h3 className={styles.pokemonMovesListTitle}>Moves by egg: </h3>
              <ul className={styles.pokemonMovesListItems}>
                  {pokemonData.moves?.map((move: move) => move.method == "egg" ? (
                      <li key={move.level} className={styles.pokemonMove}>{move.name}</li>
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
                {pokemonData.stats?.map((stat: any) => (
                    <li key={stat.name} className={styles.pokemonMove}>{stat.name}: {stat.value}</li>
              ))}
            </ul>
          </div>

        </main>
      );

}   
