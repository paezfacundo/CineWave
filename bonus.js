const frasesFamosas = [
  {
    frase: "Here's looking at you, kid.",
    pelicula: "Casablanca",
    personaje: "Rick Blaine"
  },
  {
    frase: "May the Force be with you.",
    pelicula: "Star Wars",
    personaje: "Han Solo"
  },
  {
    frase: "I'm the king of the world!",
    pelicula: "Titanic",
    personaje: "Jack Dawson"
  },
  {
    frase: "You can't handle the truth!",
    pelicula: "A Few Good Men",
    personaje: "Col. Nathan R. Jessup"
  },
  {
    frase: "I'll be back.",
    pelicula: "The Terminator",
    personaje: "The Terminator"
  },
  {
    frase: "There's no place like home.",
    pelicula: "The Wizard of Oz",
    personaje: "Dorothy Gale"
  },
  {
    frase: "I'm gonna make him an offer he can't refuse.",
    pelicula: "The Godfather",
    personaje: "Don Vito Corleone"
  },
  {
    frase: "Hasta la vista, baby.",
    pelicula: "Terminator 2: Judgment Day",
    personaje: "The Terminator"
  },
  {
    frase: "Why so serious?",
    pelicula: "The Dark Knight",
    personaje: "The Joker"
  },
  {
    frase: "I feel the need... the need for speed!",
    pelicula: "Top Gun",
    personaje: "Maverick"
  },
  {
    frase: "I'm king of the world!",
    pelicula: "The Lion King",
    personaje: "Simba"
  },
  {
    frase: "Here's Johnny!",
    pelicula: "The Shining",
    personaje: "Jack Torrance"
  },
  {
    frase: "I love the smell of napalm in the morning.",
    pelicula: "Apocalypse Now",
    personaje: "Lt. Col. Bill Kilgore"
  },
  {
    frase: "I'm just one stomach flu away from my goal weight.",
    pelicula: "The Devil Wears Prada",
    personaje: "Emily Charlton"
  },
  {
    frase: "I am Groot.",
    pelicula: "Guardians of the Galaxy",
    personaje: "Groot"
  }
];
  
const fraseAlAzar = frasesFamosas[Math.floor(Math.random() * frasesFamosas.length)];

const fraseFamosaElement = document.getElementById('fraseFamosa');
fraseFamosaElement.textContent = `"${fraseAlAzar.frase}" - ${fraseAlAzar.pelicula} (${fraseAlAzar.personaje})`;
