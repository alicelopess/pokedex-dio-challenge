
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.order = pokeDetail.order
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type
    
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

//Consuming PokeAPI
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((responseJsonBody) => {
            console.log(responseJsonBody)
            return responseJsonBody.results
        })
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((pokemonDetailsRequest) => Promise.all(pokemonDetailsRequest))
        .then((pokemonDetails) => {
            console.log(pokemonDetails)
            return pokemonDetails
        })
        .catch((error) => console.log(error))
        .finally(() => console.log("Requisição Concluída!"))
}