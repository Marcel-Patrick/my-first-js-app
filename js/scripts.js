/* The first code line implies: new pokemonRepository variable to hold what
IIFE will return, and assign the IIFE to that variable.
Start of wrap of pokemonList array in an IIFE*/
let pokemonRepository = (function () {
  /*Start Modal implementatiom */
  //Create a variable that contains the place of the container
  let modalContainer = document.querySelector('#modal-container');

  /* This function is used to Create a modal when pokemon is selected from
  the list */
  function showModal(pokemon){
    modalContainer.innerHTML='';
    let type = pokemon.types[0].type.name;
    //create new button that contains pokemon details
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add(type+'-pokemon');
    //Create close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    //Create Header tag that contains pokemon name
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.forms[0].name;
    //Create a paragraph tag contains pokemon height
    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: '+pokemon.height/10 +' m';
    //Create a paragraph tag contains pokemon type
    let typeElement = document.createElement('p');
    typeElement.innerText = 'Type: '+type;
    //Add pokemon imageUrl
    let img = document.createElement('img');
    img.classList.add('modal-img');
    img.src = pokemon.sprites.other['official-artwork']['front_default'];

    //Add the new created tags
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modal.appendChild(typeElement);
    modal.appendChild(img);

    modalContainer.appendChild(modal);
    //Add class is-visible to show the modal
    modalContainer.classList.add('is-visible');
  }
  /* This function is used to hide Modal when the use click on cancel or outside
  of the modal or escape keyboard button */
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  /* Hide Modal when escape keyboard button is pressed */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  /* Hide Modal when we click outside the Modal */
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  /*End of Modal Creation */
  /* This code line implies: an empty array with later shall show up the objects
  (Pokemon) from an external API in my personal pokemaonList */
  let pokemonList = [];

  /* This code line implies: the url to the external API */
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
  wich is defined in the API URL+ */
  function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage();
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      // Now we add the details to the item
      showModal(details);
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
