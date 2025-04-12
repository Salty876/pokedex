import { Interface } from "node:readline";


interface Dictionary<T> {
    [key: string]: T
  }

export const typeIcons:Dictionary<string> = {
    "normal" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/1.png",
    "fighting": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/2.png",
    "flying": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/3.png",
    "poison": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/4.png",
    "ground": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/5.png",
    "rock": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/6.png",
    "bug": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/7.png",
    "ghost": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/8.png",
    "steel": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/9.png",
    "fire": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/10.png",
    "water": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/11.png",
    "grass": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/12.png",
    "electric": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/13.png",
    "psychic": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/14.png",
    "ice": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/15.png",
    "dragon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/16.png",
    "dark": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-2-white-2/17.png",
    "fairy": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/18.png",
    "stellar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/19.png"

}

export interface PokemonSmall{
    sprite: string;
    name: string;
}

export interface Pokemon{
    // Strings
    sprite: string;
    name: string;

    // Numeric values
    // generation: number;
    base_experience: number;
    order: number;
    weight: number;
    height: number;

    // Collections
    abilities: abilty[];
    moves: move[];
    types:type[];
    encounters:encounter[];

}

export interface evolutions{
    name: string;
    image: string;
    url: string;
}

export interface move{
    name:string;
    level:number;
    method:string;
}

export interface type{
    name:string;
    icon:string;
    weakness:string[];
    strong:string[];
    superWeakness:string[];
    superStrong:string[];
}

export interface abilty{
    name:string;
    hidden:boolean;
}

export interface encounter{
    location:string;
    games:string[];
}
