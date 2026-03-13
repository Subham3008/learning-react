import Pokemon1 from "./components/Pokemon1";

const App = () => {
  const pokemons = [
    {
      name: "Bulbasaur",
      type: "Grass / Poison",
      ability: "Overgrow",
      image:
        "https://i.pinimg.com/736x/7a/47/1d/7a471d7a4d788d75d8fbd395e50ba082.jpg",
      description:
        "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
    },
    {
      name: "Charmander",
      type: "Fire",
      ability: "Blaze",
      image:
        "https://i.pinimg.com/736x/86/00/c9/8600c91c49146446785fefaa352b1720.jpg",
      description:
        "It has a flame on its tail. The flame burns brighter when it is excited.",
    },
    {
      name: "Squirtle",
      type: "Water",
      ability: "Torrent",
      image:
        "https://i.pinimg.com/1200x/1e/0a/9a/1e0a9a8c22c607f9cb4a5cf368781fdb.jpg",
      description:
        "After birth, its back swells and hardens into a shell. It sprays foam from its mouth.",
    },
    {
      name: "Pikachu",
      type: "Electric",
      ability: "Static",
      image:
        "https://i.pinimg.com/1200x/84/05/c0/8405c0801b19582f7fdaf274c3d3610f.jpg",
      description:
        "Whenever Pikachu comes across something new, it blasts it with a jolt of electricity.",
    },
    {
      name: "Gengar",
      type: "Ghost / Poison",
      ability: "Cursed Body",
      image:
        "https://i.pinimg.com/736x/9e/e3/2f/9ee32f5a80e34b460208e18851881ceb.jpg",
      description:
        "It hides in shadows and absorbs warmth from its surroundings.",
    },
    {
      name: "Eevee",
      type: "Normal",
      ability: "Run Away",
      image:
        "https://i.pinimg.com/736x/b8/19/16/b81916ac09af0b6db5bbd8c0d3e9d862.jpg",
      description:
        "Its genetic code is irregular. It may mutate if exposed to radiation from elemental stones.",
    },
    {
      name: "Snorlax",
      type: "Normal",
      ability: "Immunity",
      image:
        "https://i.pinimg.com/736x/84/b1/00/84b10075d72f98684e9cb73b6e81409f.jpg",
      description:
        "It is not satisfied unless it eats over 400 kg of food every day.",
    },
    {
      name: "Lucario",
      type: "Fighting / Steel",
      ability: "Inner Focus",
      image:
        "https://i.pinimg.com/736x/8b/7d/cd/8b7dcdcdeb96d2664e947bec5163c1b8.jpg",
      description:
        "It can read and manipulate auras. It senses emotions of living beings.",
    },
    {
      name: "Greninja",
      type: "Water / Dark",
      ability: "Torrent",
      image:
        "https://i.pinimg.com/1200x/18/84/33/188433b2bc0610d3715e0511627e7294.jpg",
      description:
        "It creates throwing stars out of compressed water. Very fast and silent.",
    },
    {
      name: "Dragonite",
      type: "Dragon / Flying",
      ability: "Inner Focus",
      image:
        "https://i.pinimg.com/736x/7e/90/35/7e9035f852c543f6bb373f38bfba9603.jpg",
      description:
        "It is said that somewhere in the ocean lies an island where these gather.",
    },
  ];

  return (
    <div className="card-container">
      <h1>OUR POKEMON</h1>
      <div className="allCards">
        {pokemons.map((data) => (
          <Pokemon1 pokemon={data} />
        ))}
      </div>
    </div>
  );
};

export default App;
