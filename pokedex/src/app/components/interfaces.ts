import { Interface } from "node:readline";

export interface PokemonSmall{
    sprite: string;
    name: string;
    // abilities: string[];

    // Numeric values
    // generation: number;
    // base_experience: number;

    // evolution: evolutions[];
    // moves: move[];


}

export interface evolutions{
    name: string;
    image: string;
    url: string;
}

export interface eggGroup{
    url: string;

}

export interface move{
    name:string;
    level:string;
}