import { generatePokemons } from './pokemons';
import './app.css';
import PokeHand from "./components/poke-hand/poke-hand";

const [a, b, c, d, ...leftHandPokemons] = generatePokemons();
const leftHandPower = leftHandPokemons.reduce( function(total, pokemon) { return total + pokemon.power }, 0 );

const rightHandPokemons = [a, b, c, d];
const rightHandPower = rightHandPokemons.reduce( function(total, pokemon) { return total + pokemon.power }, 0 );

function App() {
  return (
    <app is="react">
      <PokeHand
          title={leftHandPower > rightHandPower ? "Winning Hand" : "Losing Hand"}
          win={leftHandPower > rightHandPower ? 1 : 0}
          power={leftHandPower}
          pokemons={leftHandPokemons} />

      <PokeHand
          title={rightHandPower > leftHandPower ? "Winning Hand" : "Losing Hand"}
          win={rightHandPower > leftHandPower ? 1 : 0}
          power={rightHandPower}
          pokemons={rightHandPokemons} />
    </app>
  ) // return
} // App

export default App;