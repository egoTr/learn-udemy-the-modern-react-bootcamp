import React, { Component } from 'react';
import './poke-hand.css';
import PokeCard from '../poke-card/poke-card';

class PokeHand extends Component {
    // default properties
    static defaultProps = {
        power: 0
    } // defaultProps

    render() {
        const { title, win, power, pokemons } = this.props;

        return (
            <poke-hand is="react" win={win}>
                <phand-title is="react">{title}</phand-title>
                <phand-power is="react">{power}x</phand-power>
                <phand-pokemons>
                    {
                        pokemons.map( (pokemon, i)  => {
                            const { id, name, type, power } = pokemon;
                            return <PokeCard key={id} id={id} name={name} type={type} power={power}/>
                        }) // map
                    }
                </phand-pokemons>
            </poke-hand>
        ) // return
    } // render
}; // Pokehand

export default PokeHand;