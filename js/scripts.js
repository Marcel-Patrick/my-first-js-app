// The first code line implies: a new variable assigned to a blank array
let pokemonList = [];

/* The following code lines implies:
7 of my favourite Pokemon with basic properties; so called: objects */
let pikachu = {
  name: 'Pikachu',
  height: 0.4,
  weight: 6.0,
  types: ['electric']
};

let charizard = {
  name: 'Charizard',
  height: 1.7,
  weight: 90.5,
  types: ['fire','flying']
};

let ninetales = {
  name: 'Ninetales',
  height: 1.1,
  weight: 19.9,
  types: ['fire']
};

let jigglypuff = {
  name: 'Jigglypuff',
  height: 0.5,
  weight: 5.5,
  types: ['fairy','normal']
};

let arcanine = {
  name: 'Arcanine',
  height: 1.9,
  weight: 155.0,
  types: ['fire']
};

let mew = {
  name: 'Mew',
  height: 0.4,
  weight: 4.0,
  types: ['psychic']
};

let mewtwo = {
  name: 'Mewtwo',
  height: 2.0,
  weight: 122.0,
  types: ['psychic']
};

/* The next code line implies: the assign of
the Pokemon (objects) to the pokemonList array */
pokemonList = [
  pikachu,
  charizard,
  ninetales,
  jigglypuff,
  arcanine,
  mew,
  mewtwo
];

/* The next code line implies: the creation of a for loop that iterates over
each item in pokemonList. The conditionals check if the height is above two
certain values. If it is, the notes “Wow, that’s big!” and “Wow, what a gigant
monster!” will be added to the output. */
let pokemonName   = '';
let pokemonHeight = 0;
for (let i = 0; i < pokemonList.length; i++){
  pokemonName   = pokemonList[i].name;
  pokemonHeight = pokemonList[i].height;
  if (pokemonHeight >= 1.7 && pokemonHeight < 2.0){
    document.write(pokemonName + ' (' + 'height: '  +  pokemonHeight + ' )'
    + ' - Wow, that\'s big! <br>');
  }else if (pokemonHeight >= 2.0){
    document.write(pokemonName + ' (' + 'height: ' +  pokemonHeight + ' )'
    + ' - Wow, what a gigant monster! <br>');
  }else {
    document.write(pokemonName + ' (' + 'height: ' +  pokemonHeight +' ) <br>');
  }
}
