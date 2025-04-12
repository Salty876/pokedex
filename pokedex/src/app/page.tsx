export  default async function Page() {

  const data = await fetch("http://localhost:3000/api/list")
  const listofPokemon = await data.json()
  console.log(listofPokemon)
  return <h1>Hello Next.js! {listofPokemon.count}</h1>
}