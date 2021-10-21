/* The first code line implies: new pokemonRepository variable to hold what
IIFE will return, and assign the IIFE to that variable.
Start of wrap of pokemonList array in an IIFE*/
let pokemonRepository = (function () {

  /* This code lines implies: a new variable assigned to an array with
  7 of my favourite Pokemon with basic properties; so called: objects */
  let pokemonList = [
    {name: 'Pikachu'   , height: 0.4, weight: 6.0  , types: ['electric']      },
    {name: 'Charizard' , height: 1.7, weight: 90.5 , types: ['fire','flying'] },
    {name: 'Ninetales' , height: 1.1, weight: 19.9 , types: ['fire']          },
    {name: 'Jigglypuff', height: 0.5, weight: 5.5  , types: ['fairy','normal']},
    {name: 'Arcanine'  , height: 1.9, weight: 155.0, types: ['fire']          },
    {name: 'Mew'       , height: 0.4, weight: 4.0  , types: ['psychic']       },
    {name: 'Mewtwo'    , height: 2.0, weight: 122.0, types: ['psychic']       }
  ];

  /* This code lines implies: a function should add the Pokemon referred to
  with item to the pokemonList array */
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // This code lines implies: a function should return the pokemonList array
  function getAll() {
    return pokemonList;
  }

  /* This code lines implies: a function to give different css stiles
  to the created buttons*/
  function pokemonType(pokemonType, button) {
    switch (pokemonType) {
      case 'electric':
      button.classList.add('electric-pokemon');
      break;
      case 'fire':
      button.classList.add('fire-pokemon');
      break;
      case 'fairy':
      button.classList.add('fairy-pokemon');
      break;
      case 'psychic':
      button.classList.add('psychic-pokemon');
      break;
      default:
    }
  }

  /* This code lines implies: a function to show the detaild object values
  in the console */
  function showDetails(pokemon, button) {
    console.log(pokemon);
  }

  /* This code lines implies: a function that opens additional information after
  clicked one of the displayed buttons */
  function pokemonEventListener(button, pokemon) {
    button.addEventListener('click', showDetails.bind(this, pokemon, button));
  }

  /* This code lines implies: a function to display each pokemon wich is defined
  in the pokemonList insaid a button*/
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-Button-Style');
    pokemonType (pokemon.types[0], button);
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    pokemonEventListener(button, pokemon);
  }

  /* This code lines implies: return all the above funkions and values inside
  the IIFE to the outside */
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

  // This code line implies: the end of the wrap of pokemonList array in an IIFE
}) ();

/* This code line implies: should add the Pokemon referred to with item
to the pokemonList array */
let charmander = {
  name: 'Charmander',
  height: 0.6,
  weight: 8.5,
  types: ['fire']
};
pokemonRepository.add(charmander);
// This code line implies: should return the pokemonList array
pokemonList = pokemonRepository.getAll();

/* The next code line implies: the creation of a forEach loop that iterates over
each item in pokemonList. The conditionals check if the height is above two
certain values. If it is, the notes “Wow, that’s big!” and “Wow, what a gigant
monster!” will be added to the output. */
function pokemonPropertyCheck(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

pokemonList.forEach(pokemonPropertyCheck);
