
//HTML Variables
const pokemonListContainer = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 8
let offset = 0

//Adding Information to HTML
function convertPokemonTypestoLi(pokemonTypes) {
    return pokemonTypes.map((type) => `<li class="type ${type}">${type}</li>`)
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemonList) => {

        console.log(pokemonList)
        const pokemonListArray = pokemonList.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.order}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${convertPokemonTypestoLi(pokemon.types).join('')}
                    </ol>

                    <img src="${pokemon.image}" alt="${pokemon.name}">
                </div>
            </li>
        `)
        console.log(pokemonListArray)
        
        const pokemonListHtml = pokemonListArray.join('')
        pokemonListContainer.innerHTML += pokemonListHtml
    })
    .catch((error) => console.log(error))
}

//Creating Navigation Button Functionality
loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})

