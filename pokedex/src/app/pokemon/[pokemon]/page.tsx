import "@/styles/stage.module.css"


export default async function Page({
    params,
}: {
    params:Promise<{pokemon: string}>
}) {
    const {pokemon} = await params
    return (
        <p>{pokemon}</p>
    )
}