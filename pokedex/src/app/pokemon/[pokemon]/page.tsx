

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

    function getColor(value:number): [string, number, string] {
        const max = 150; 
        const ratio = Math.min(value / max, 1);

        const hue = ratio * 120;

        return [
          `hsl(${hue}, 80%, 60%)`,  // primary color (e.g., greenish)
          ratio,                    // ratio for filling
          `hsl(${hue}, 60%, 40%)`   // secondary color (e.g., darker shade for fading effect)
        ];

    }


    const statsVals: Record<string, [string, number, string]> = {};

    for (const [key, value] of Object.entries(pokemonData.stats)) {
      if (typeof value === 'number') {
        // console.log(key, value);
        statsVals[key] = getColor(value);
        statsVals[key][1] *= 100;
        statsVals[key][1] = Math.round(statsVals[key][1]);
        console.log(statsVals[key]);
      }
    }
    console.log(statsVals.baseHp[0]);
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
          <h2 className={styles.boxTitles}>Pokedex Info: </h2>
          <div className={styles.pokemonInfoMore}>
            <div className={styles.pokemonId}>#{pokemonData.order}</div>
            <div className={styles.pokemonType}>{pokemonData.types.map((currType: pType) =>(
              <img className={styles.typeImage} src={currType.icon} alt={currType.name} />
              ))}
              </div>
            <div className={styles.pokemonHeight}><h4>Height:</h4> {pokemonData.height}m</div>
            <div className={styles.pokemonWeight}><h4>Weight:</h4> {pokemonData.weight}kg</div>

            <div className={styles.pokemonAbilities}><h4>Abilities:</h4>{abilities}</div>

          </div>


          {/* moves */}
          <h2 className={styles.boxTitles}>Moves: </h2>

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
          <h2 className={styles.boxTitles}>Encounters: </h2>
          <div className={styles.pokemonInfoMoreLarge}>
            <ul className={styles.pokemonMovesListItems}>
                {mergedEncounters?.map((encounter: any) => (
                    <li key={encounter.game} className={styles.pokemonMove}>{encounter.game}: {encounter.locations.join(", ")}<hr></hr></li>
              ))}
            </ul>
          </div>

        <h2 className={styles.boxTitles}>Stats: </h2>
          <div className={styles.statsContainer}>
          <div className={styles.stats} style={{ backgroundImage: `linear-gradient(to top, ${statsVals.baseHp[0]} 0 ${statsVals.baseHp[1]}%, ${statsVals.baseHp[2]} ${statsVals.baseHp[1]}% 100%)`
            }}>
            <p>HP: {pokemonData.stats.baseHp}</p>
          </div>
          <div className={styles.stats} style={{ backgroundImage: `linear-gradient(to top, ${statsVals.baseAtk[0]} 0 ${statsVals.baseAtk[1]}%, ${statsVals.baseAtk[2]} ${statsVals.baseAtk[1]}% 100%)` }}>
            <p>Attack: {pokemonData.stats.baseAtk}</p>
          </div>
          <div className={styles.stats} style={{ backgroundImage: `linear-gradient(to top, ${statsVals.baseDef[0]} 0 ${statsVals.baseDef[1]}%, ${statsVals.baseDef[2]} ${statsVals.baseDef[1]}% 100%)` }}>
            <p>Defense: {pokemonData.stats.baseDef}</p>
          </div>
          <div className={styles.stats} style={{ backgroundImage: `linear-gradient(to top, ${statsVals.baseSpecAtk[0]} 0 ${statsVals.baseSpecAtk[1]}%, ${statsVals.baseSpecAtk[2]} ${statsVals.baseSpecAtk[1]}% 100%)` }}>
            <p>Special Attack: {pokemonData.stats.baseSpecAtk}</p>
          </div>
          <div className={styles.stats} style={{ backgroundImage: `linear-gradient(to top, ${statsVals.baseSpecDef[0]} 0 ${statsVals.baseSpecDef[1]}%, ${statsVals.baseSpecDef[2]} ${statsVals.baseSpecDef[1]}% 100%)` }}>
            <p>Special Defense: {pokemonData.stats.baseSpecDef}</p>
          </div>
          <div className={styles.stats} style={{ backgroundImage: `linear-gradient(to top, ${statsVals.baseSpeed[0]} 0 ${statsVals.baseSpeed[1]}%, ${statsVals.baseSpeed[2]} ${statsVals.baseSpeed[1]}% 100%)` }}>
            <p>Speed: {pokemonData.stats.baseSpeed}</p>
          </div>
          <div className={styles.stats} style={{ backgroundImage: `linear-gradient(to top, ${statsVals.baseHappiness[0]} 0 ${statsVals.baseHappiness[1]}%, ${statsVals.baseHappiness[2]} ${statsVals.baseHappiness[1]}% 100%)` }}>
            <p>Base Hapiness: {pokemonData.stats.baseHappiness}</p>
          </div>

          </div>

        </main>
      );

}   
