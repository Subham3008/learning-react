import Pokemon1 from "./components/Pokemon1";
import Pokemon2 from "./components/Pokemon2";
import Pokemon3 from "./components/Pokemon3";
import Pokemon4 from "./components/Pokemon4";

const App = () => {
  return (
    <div className="card-container">
      <h1>OUR POKEMON</h1>
      <div className="allCards">
        <Pokemon1 />
        <Pokemon2 />
        <Pokemon3 />
        <Pokemon4 />
      </div>
    </div>
  );
};

export default App;
