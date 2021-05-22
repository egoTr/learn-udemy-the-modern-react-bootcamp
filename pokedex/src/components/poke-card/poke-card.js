import React, { Component } from 'react';
import './poke-card.css';

class PokeCard extends Component {
    render() {
        const { name, type, power } = this.props;

        return (
            <poke-card is="react">
                <poke-name>{name}</poke-name>
                <poke-type>{type}</poke-type>
                <poke-power>{power}x</poke-power>
            </poke-card>
        ) // return
    } // render
}; // PokeCard

export default PokeCard;