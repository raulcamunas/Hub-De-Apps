document.getElementById("botonColor").addEventListener("click", function() {
    cambiarColorMain();
});

function cambiarColorMain() {
    let color = generarColorAleatorio();
    document.getElementById("container").style.backgroundColor = color;
}

function generarColorAleatorio() {
    let letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

function irAPaginaPokemon() {
    window.location.href = "iniciopokeapi.html";
}

function irAlogin() {
    window.location.href = "index.html";
}

function irAInicio() {
    window.location.href = "iniciopokeapi.html";
}

const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const pokemonContainer = document.getElementById('pokemonContainer');
const pagination = document.getElementById('pagination');

let currentPage = 1;
const itemsPerPage = 10;

async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        pokemons = data.results.map(pokemon => ({
            name: pokemon.name,
            url: pokemon.url
        }));
        await loadPokemons();
    } catch (error) {
        console.error('Error fetching pokemons:', error);
    }
}

async function loadPokemons() {
    try {
        const promises = pokemons.map(pokemon => fetchPokemonDetails(pokemon.url));
        const results = await Promise.all(promises);
        pokemons = results.map(result => ({
            name: result.name,
            type: result.types[0].type.name,
            image: result.sprites.front_default
        }));
        searchPokemons();
    } catch (error) {
        console.error('Error loading pokemons:', error);
    }
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function displayPokemons(pokemonsToDisplay) {
    pokemonContainer.innerHTML = '';
    pokemonsToDisplay.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.style.borderColor = getTypeColor(pokemon.type);
        card.style.backgroundColor = getTypeColor(pokemon.type);
        
        const image = document.createElement('img');
        image.src = pokemon.image;
        image.alt = pokemon.name;
        card.appendChild(image);
        
        const name = document.createElement('p');
        name.textContent = pokemon.name;
        card.appendChild(name);
        
        card.addEventListener('click', () => {
            card.innerHTML = `
                <p>Nombre: ${pokemon.name}</p>
                <p>Tipo: ${pokemon.type}</p>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            `;
        });
        
        pokemonContainer.appendChild(card);
    });
}

function getTypeColor(type) {
    switch (type) {
        case 'fire':
            return '#FF7F0F';
        case 'water':
            return '#6890F0';
        case 'grass':
            return '#78C850';
        case 'electric':
            return '#F8D030';
        case 'ice':
            return '#98D8D8';
        default:
            return '#A8A878';
    }
}

function searchPokemons() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemons = pokemons.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchTerm);
    });
    filterPokemonsByType(filteredPokemons);
}

function filterPokemonsByType(pokemons) {
    const selectedType = typeFilter.value;
    const filteredPokemons = selectedType ?
        pokemons.filter(pokemon => pokemon.type === selectedType) :
        pokemons;
    paginatePokemons(filteredPokemons);
}

function paginatePokemons(pokemons) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPokemons = pokemons.slice(startIndex, endIndex);
    displayPokemons(paginatedPokemons);
    renderPagination(pokemons.length);
}

function renderPagination(totalPokemons) {
    pagination.innerHTML = '';
    const pageCount = Math.ceil(totalPokemons / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            paginatePokemons(pokemons);
        });
        pagination.appendChild(button);
    }
}

searchInput.addEventListener('input', searchPokemons);
typeFilter.addEventListener('change', () => filterPokemonsByType(pokemons));

fetchPokemons();

function irAInicio() {
    window.location.href = 'hub-de-apps.html';
}

