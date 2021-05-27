const pokemons = [
    { id: 4, name: 'Charmander', type: 'fire', power: 50 },
    { id: 7, name: 'Squirtle', type: 'water', power: 46 },
    { id: 11, name: 'Metapod', type: 'bug', power: 92 },
    { id: 12, name: 'Butterfree', type: 'flying', power: 34 },
    { id: 25, name: 'Pikachu', type: 'electric', power: 87 },
    { id: 39, name: 'Jigglypuff', type: 'normal', power: 41 },
    { id: 94, name: 'Gengar', type: 'poison', power: 69 },
    { id: 133, name: 'Eevee', type: 'normal', power: 35 }
]; // pokemons

//
// https://stackoverflow.com/questions/2450954
//
function shuffle(arrInput) {
    var arrResult = [...arrInput];
    
    var currentIndex = arrInput.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arrResult[currentIndex];
        arrResult[currentIndex] = arrResult[randomIndex];
        arrResult[randomIndex] = temporaryValue;
    } // while

  return arrResult;
} // shuffle

function generatePokemons() {
    return shuffle(pokemons);
} // generatePokemons

function getPokemonPath(pokemon) {
    const { id, name } = pokemon;

    return `${id}-${name}.png`;
} // getPokemonPath

export {
    generatePokemons, 
    getPokemonPath
} // export