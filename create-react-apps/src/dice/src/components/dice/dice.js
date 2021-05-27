import React, { Component } from 'react'
import './dice.css';

class Dice extends Component {
    render() {
        const { started, isRolling, diceNumber } = this.props;

        return (
            <dice started={started} isRolling={isRolling} is="react">
                <img alt="" src={`/img/dice/${diceNumber}.jpg`} />
            </dice>
        ) // return
    } // render
} //  Dice

export default Dice;