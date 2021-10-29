/* The first code line implies: new pokemonRepository variable to hold what
IIFE will return, and assign the IIFE to that variable.
Start of wrap of pokemonList array in an IIFE*/
let pokemonRepository = (function () {

  /* This code line implies: an empty array with later shall show up the objects
  (Pokemon) from an external API in my personal pokemaonList */
  let pokemonList = [];

  /* This code line implies: the url to the external API */
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';

  /* This code lines implies: a function should add the Pokemon referred to
  with item to the pokemonList array */
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // This code lines implies: a function should return the pokemonList array
  function getAll() {
    return pokemonList;
  }

  /* This code lines implies: a function that opens additional information after
  clicked one of the displayed buttons */
  function pokemonEventListener(button, pokemon) {
    button.addEventListener('click', showDetails.bind(this, pokemon, button));
  }

  /* This code lines implies: a function that show up the
  message: "Loading Pokemon List..."
  before & while fetch content from pokemon API */
  function showLoadingMessage(){
    let loadingMsg = document.querySelector('main');
    let button = document.createElement('button');
    button.innerText = 'Loading Pokemon List...';
    button.classList.add('pokemon-Button-Style');
    loadingMsg.appendChild(button);
  }

  /* This code lines implies: a function that hide the
  message: "Loading Pokemon List..."
  after fetched and display all content from pokemon API */
  function hideLoadingMessage(){
    let loadingMsg = document.querySelector('main > button');
    loadingMsg.parentElement.removeChild(loadingMsg);
  }

  /* This code lines implies: a function to load the details of each pokemon
  wich is defined in the API URL and puch it inside the pokemonList array */
  function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage();
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  /* This code lines implies: a function to add a specific color to each pokemon
  button, after checking the type of the pokemon.
  For 18 different pokemon types add 18 different color to the pokemon button */
  function addColor(pokemon, button) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      let type = details.types[0].type.name;
      //call the class based on the pokemon type
      button.classList.add(type+'-pokemon');
    }).catch(function (e) {
      console.error(e);
    });
  }

  /* This code lines implies: a function to display each pokemon wich is defined
  in the pokemonList inside a button*/
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-Button-Style');
    addColor(pokemon, button);
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    pokemonEventListener(button, pokemon);
  }

  /* This code lines implies: a function to load each pokemon wich is defined
  in the API URL and puch it inside the pokemonList array */
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
      hideLoadingMessage();
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  /* This code lines implies: a function to show or display the details of each
  pokemon wich now inside the pokemonList array */
  function showDetails(item) {
    loadDetails(item).then(function () {
      console.log(item);
    });
  }

  /* This code lines implies: return all the above funkions and values inside
  the IIFE to the outside */
  return {
    add         : add,
    getAll      : getAll,
    addListItem : addListItem,
    loadList    : loadList,
    loadDetails : loadDetails,
    showDetails : showDetails
  };

  // This code line implies: the end of the wrap of pokemonList array in an IIFE
}) ();

/* This code lines implies: the call and of the funkions inside the IIFE to
display its contents to the outside */
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
