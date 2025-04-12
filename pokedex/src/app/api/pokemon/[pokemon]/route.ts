import { abilty, encounter, move, Pokemon, type } from "../../../components/interfaces"
import { typeIcons } from "../../../components/interfaces"


export async function GET(request: Request) {
    const path  = request.url

    const arrayPath = path.split('/', 6)

    const pokemon = arrayPath[5]

    const info = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`,{cache:"force-cache"})
    const pokemonData = await info.json()

    let moves:move[] = []
    // Get the pokemons moves
    for (let i in pokemonData.moves){
        if (pokemonData.moves[i].version_group_details.length != 0){
        let moveSize:number = pokemonData.moves[i].version_group_details.length - 1
        let move:move = {
            name: pokemonData.moves[i].move.name,
            level: pokemonData.moves[i].version_group_details[moveSize].level_learned_at,
            method: pokemonData.moves[i].version_group_details[moveSize].move_learn_method.name
        }

        moves.push(move)
    }
    }

    // Get the types
    let types:type[] = []
    for (let i in pokemonData.types){
        // Get advanced info on the types
        const typeInfo = await fetch(`https://pokeapi.co/api/v2/type/${pokemonData.types[i].type.name}`)
        const typeData = await typeInfo.json()


        // TYPE ADVANTAGES

        // get the superStrong (2x damage)
        let superStrong:string[] = []
        for (let x in typeData.damage_relations.double_damage_to){
            superStrong.push(typeData.damage_relations.double_damage_to[x].name)
        }
        // get the Strong (1.5x damage)
        let strong:string[] = []
        for (let x in typeData.damage_relations.half_damage_to){
            strong.push(typeData.damage_relations.half_damage_to[x].name)
        }

         // get the super weak (2x damage)
         let superWeak:string[] = []
         for (let x in typeData.damage_relations.double_damage_from	){
             superWeak.push(typeData.damage_relations.double_damage_from[x].name)
         }
         // get the  weak (1.5x damage)
         let weak:string[] = []
         for (let x in typeData.damage_relations.half_damage_from){
             weak.push(typeData.damage_relations.half_damage_from[x].name)
         }


        let holder:type = {
            name: pokemonData.types[i].name,
            icon: typeIcons[pokemonData.types[i].name],
            weakness: weak,
            strong: strong,
            superStrong: superStrong,
            superWeakness: superWeak


        }

        types.push(holder)
    }

    // Get the abilities
    let abilityContainer:abilty[] = []
    for (let i in pokemonData.types.abilities){
        let testAbility:abilty = {
            name: pokemonData.types.abilities[i].name,
            hidden: pokemonData.types.abilities[i].is_hidden
        }

        abilityContainer.push(testAbility)
    }
    
    // Get the encounter locations
    const locInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`)
    const pokemonEncounterData = await locInfo.json()

    let locationContainer:encounter[] = []
    for (let i in pokemonEncounterData){
        let games:string[] = []
        for (let x in pokemonEncounterData[i].version_details){
            games.push(pokemonEncounterData[i].version_details[x].version.name)
        }
        let fakeEncounter:encounter = {
            games: games,
            location: pokemonEncounterData[i].location_area.name
        }
        
        locationContainer.push(fakeEncounter)
    }


    // Add all this info and more to the main pokemon container
    const pokemonFullData:Pokemon = {
        // String data
        sprite: pokemonData.sprites.front_default,
        name: pokemonData.name,

        // Numerical data
        base_experience: pokemonData.base_experience,
        height: pokemonData.height,
        weight: pokemonData.weight,
        order: pokemonData.order,

        // collections
        encounters: locationContainer,
        abilities: abilityContainer,
        types: types,
        moves:moves
    }

    return new Response(JSON.stringify(pokemonFullData),{
        status:200
    });
}
