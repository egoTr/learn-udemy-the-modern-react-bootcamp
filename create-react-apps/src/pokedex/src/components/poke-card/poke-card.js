import React, { Component } from 'react';
import './poke-card.css';

function getPokemonPath(id, name) {
    return `/img/pokemon/${id}-${name}.png`;
} // getPokemonPath

class PokeCard extends Component {
    render() {
        const { id, name, type, power } = this.props;
        const img = getPokemonPath(id, name);

        return (
            <poke-card is="react">
                <poke-name>{name}</poke-name>
                <img alt={name} src={img} />
                <poke-type>{type}</poke-type>
                <poke-power>{power}x</poke-power>
            </poke-card>
        ) // return
    } // render
}; // PokeCard

export default PokeCard;