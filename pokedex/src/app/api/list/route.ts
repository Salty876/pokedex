import { PokemonSmall } from '../../components/interfaces'

export async function GET(request: Request) {
    //fetch data from 
    const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1500")
    const list = await data.json()


    let menu: PokemonSmall[] = []

    for (let i in list.results){
       

        const info = await fetch(`https://pokeapi.co/api/v2/pokemon/${list.results[i].name}`, {cache: 'force-cache'})
        const pokemon = await info.json()

        let addition:PokemonSmall = {
            // abilities: [],
            name: pokemon.name,
            sprite: pokemon.sprites.front_default
        };


        // console.log(list.results[i].name)
        menu.push(addition)
    }
    return new Response(JSON.stringify(menu), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }