import { generatePokemons, getPokemonPath } from './pokemons';
import './app.css';
import PokeCard from "./components/poke-card/poke-card";

const pokemons = generatePokemons();

function App() {
  return (
    <app is="react">
      { pokemons.map(pokemon => {
        const { name, type, power } = pokemon;
        
        return <PokeCard name={name} type={type} power={power}/>
      })}
    </app>
  ) // return
} // App

export default App;