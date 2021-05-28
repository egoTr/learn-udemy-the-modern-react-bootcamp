import React, { Component } from 'react';
import './light-outs.css';

document.title = "React Challenge/> Light Outs";
const CONST_LIGHTOUTS_ROWS = 5;
const CONST_LIGHTOUTS_COLUMNS = 5;

function findNeighbors({ indexStartFrom1, row, column }) {
    const neighborAbove = (row === 1) ? 0 : indexStartFrom1 - CONST_LIGHTOUTS_COLUMNS;
    const neighborBelow = (row === CONST_LIGHTOUTS_ROWS) ? 0 : indexStartFrom1 + CONST_LIGHTOUTS_COLUMNS;

    const neighborLeft = (column === 1) ? 0 : indexStartFrom1 - 1;
    const neighborRight = (column === CONST_LIGHTOUTS_COLUMNS) ? 0 : indexStartFrom1 + 1;

    return [
        neighborAbove,
        neighborBelow,
        neighborLeft,
        neighborRight
    ]
} // findNeighbors

class LightOuts extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            cells: [-1] // init the array holding cells' status, start from 1
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    generateCells() {
        return (
            <div className="cells-container"> {
                Array.from({ length: CONST_LIGHTOUTS_ROWS }).map( (x, i) => {
                    return (
                        <div className="light-outs-div" key={i}>
                            { Array.from({ length: CONST_LIGHTOUTS_COLUMNS }).map( (x, j) => {
                                var row = i + 1;
                                var column = j + 1;
                                var index = i*CONST_LIGHTOUTS_COLUMNS + column;

                                var status = Math.floor(Math.random() * 2);
                                if (this.state.cells.length < CONST_LIGHTOUTS_ROWS * CONST_LIGHTOUTS_COLUMNS + 1)
                                    this.state.cells.push(status);  // init the state
                                else
                                    status = this.state.cells[index]; // lookup from states

                                return (
                                    <cell
                                        is="react"
                                        index={index}
                                        row={row}
                                        column={column}
                                        status={status}
                                        key={i*CONST_LIGHTOUTS_COLUMNS + column}
                                        onClick={this.cellClicked}
                                    >
                                    </cell>
                                )}
                            )}
                        </div>
                    ) // return-inner
                }) // map for rows
            } </div>
        ) // return-outer
    } // generateCells

    toogleCells = (beTooggledIndexes) => {
        const cellsNew = this.state.cells.map( (cell, index) => (
            beTooggledIndexes.includes(index) ? Math.abs(cell - 1) : cell
        )) // map

        this.setState({ cells: cellsNew });
    } // toogleCells

    // an EXPERIMENTAL approach to bind 'this'
    cellClicked = (event) => {
        let cell = event.target;
        const index = Number( cell.getAttribute('index') );
        //const on = Number( cell.getAttribute('status') );

        const neighbors = findNeighbors({
            indexStartFrom1: Number( cell.getAttribute('index') ),
            row: Number( cell.getAttribute('row') ),
            column: Number( cell.getAttribute('column') )
        })
            .filter(neighbor => neighbor > 0); // remove invalid neighbors (equals to 0)

        this.toogleCells([index, ...neighbors]);

        //cell.setAttribute( 'status', Math.abs(1-on) );
    } // end of method

    // an EXPERIMENTAL approach to bind 'this'
    restartGame = () => {
        this.setState({ cells: [-1] });
    } // restartGame

    render() {
        const cells = this.generateCells();
        const isWin = this.state.cells.reduce( (andBoolean, cell) => {
            return andBoolean && (cell < 1) // all lights off
        }, true); // reduce

        return (
            <light-outs is="react">
                <div>
                    <light-outs-title win={`${isWin}`}>{isWin ? "YOU" : "LIGHT"}</light-outs-title>
                    <light-outs-title win={`${isWin}`} class="smaller">{isWin ? "WIN!" : "OUTS"}</light-outs-title>
                </div>

                {cells}

                <button title="New game" onClick={this.restartGame}>⟳</button>
            </light-outs>
        ) // return
    } // render
} // end of class

export default LightOuts;

/*
    NOTES:
    # Not all the auto-generated game has a solution;
    # For solving the game, you can visit https://www.dcode.fr/lights-out-solver;
    # For examples with solution, you can visit: https://www.neok12.com/games/lights-out/lights-out.htm;
*/