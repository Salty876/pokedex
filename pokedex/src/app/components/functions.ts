import { abilty, encounter } from "./interfaces";


export function compare_level(a: any, b: any) {
    if (a.level < b.level) {
      return -1;
    }
  }


export function mergeEncountersByGame(encounters: encounter[]) {
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

export function listOutAbilities(abilities: Array<abilty>){
    let abilityString = ""

    for (let i in abilities){
        abilityString = abilityString.concat(", ", abilities[i].name)
    }

    return abilityString.replace(", ", "")
}