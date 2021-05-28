import React, { Component } from 'react';
import './light-outs.css';

document.title = "React Challenge/> Light Outs";
const CONST_LIGHTOUTS_ROWS = 5;
const CONST_LIGHTOUTS_COLUMNS = 5;

class LightOuts extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
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
                            { Array.from({ length: CONST_LIGHTOUTS_COLUMNS }).map( (x, j) =>
                                <cell
                                    is="react"
                                    row={i + 1}
                                    colum={j + 1}
                                    state={ Math.floor(Math.random() * 2) }
                                    key={i*10000+j}
                                    onClick={this.cellClicked}
                                />
                            )}
                        </div>
                    ) // return-inner
                }) // map for rows
            } </div>
        ) // return-outer
    } // generateCells

    // an EXPERIMENTAL approach to bind 'this'
    cellClicked = (event) => {
        let cell = event.target; 
        const on = Number( cell.getAttribute('state') );

        cell.setAttribute( 'state', Math.abs(1-on) );
    } // end of method

    render() {
        const cells = this.generateCells();

         return (
            <light-outs is="react">
                <div>
                    <light-outs-title>LIGHT</light-outs-title>
                    <light-outs-title class="smaller">OUTS</light-outs-title>
                </div>
                { cells }
            </light-outs>
         ) // return
    } // render
} // end of class

export default LightOuts;