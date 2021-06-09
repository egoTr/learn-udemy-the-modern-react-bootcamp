import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import arrayMove from 'array-move';

import ColorHelper from '../helpers';

import './css/palette-create.css';
import PaleteCreateContainer from './palette-create-container';

const CONST_MAX_COLORS = 20;

class PaletteCreate extends Component {
    static defaultProps = {
        colors: [
            { id: 1, name: 'red', hex: '#f0a309' },
            { id: 2, name: 'purple', hex: '#042089' }
        ]
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            saved: false,
            title: '',
            invalidPaletteMessage: null,
            colors: [],
            pickedColor: null,
            pickedColorName: '',
            invalidColorMessage: null
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    async componentDidMount() {
        document.title = "React Colors/> Create Palette";
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
        if (this.state.colors.length > 0)
            window.onbeforeunload = () => true;
        else
            window.onbeforeunload = undefined;
    } // componentDidUpdate

    // not allow duplicate on
    // name and hex
    checkColorValid = (name, hex) => {
        const inValidColorName = this.state.colors.some( color => color.name.toUpperCase() === name.toUpperCase() );
        if (inValidColorName)
            return { status: false, message: 'Color name existed.' };

        const inValidColorHex = this.state.colors.some( color => color.hex.toUpperCase() === hex.toUpperCase() );    
        if (inValidColorHex)
            return { status: false, message: 'Color value existed.' };

        return { status: true, message: '' }
    } // checkColorValid

    addColor = (color) => {
        this.setState( currentState => (
            { colors: [...currentState.colors, color] } // push(), pop()... not work for array states
        ), () => {
            //callback
        }) // setState
    } // addColor

    randomColorGenerate = () => {
        let color = '';

        while (true) {
            var [r, g, b] = ColorHelper.randomColorBare();
            color = ColorHelper.rgbToHex(r, g, b);

            var validColor = this.checkColorValid(color, color);
            if (validColor.status)
                return color;
        } // while
    } // randomColorGenerate

    randomColor = () => {
        const color = this.randomColorGenerate();
        this.addColor({ id: Date.now(), name: color.replace('#', ''), hex: color });
    } // randomColor

    pickColor = (event) => {
        if (!event.target.value)
            return;
        
        const pickedColorName =
            this.state.pickedColorName.length === 0 ?
            event.target.value.replace('#', '').toUpperCase() :
            this.state.pickedColorName;

        this.setState({ pickedColor: event.target.value, pickedColorName, invalidColorMessage: null });
    } // pickColor

    submitColor = (event) => {
        event.preventDefault();

        const color = { id: Date.now(), name: this.state.pickedColorName, hex: this.state.pickedColor };
        const validColor = this.checkColorValid(color.name, color.hex);
        if (!validColor.status) {
            return this.setState({ invalidColorMessage: validColor.message });
        } // if

        this.setState( currentState => (
            { colors: [...currentState.colors, color], pickedColorName: '' } // push(), pop()... not work for array states
        ), () => {
            //callback
        }) // setState
    } // submitColor

    createPalette = (event) => {
        event.preventDefault();

        const valid = this.props.checkPaletteValidBehavior(this.state.title);
        if (!valid.status)
            return this.setState({ invalidPaletteMessage: valid.message });

        this.setState({ saved: true }, () => {
            this.props.createPaletteBehavior({ title: this.state.title, colors: this.state.colors });

            this.props.transitionBehavior('left-to-right');
            this.props.history.push(`/palette/${this.state.title.toLowerCase()}`);
        }); // setState
} // createPalette

    clearPalette = () => {
        this.setState({ colors: [] });
    } // clearPalette

    inputChange = (event) => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value }, () => {
            if (name === 'title')
                this.setState({ invalidPaletteMessage: null });
            else if (name === 'pickedColorName')
                this.setState({ invalidColorMessage: null });
        });
    } // inputChange

    removeColor = (colorId) => {
        const newColors = this.state.colors.filter( color => color.id !== colorId );

        this.setState({ colors: newColors });
    } // removeColor

    goBack = () => {
        this.props.transitionBehavior('right-to-left');

        this.props.history.goBack();
    } // goBack

    dragDropEnd = ({oldIndex, newIndex}) => {
        const colors = arrayMove(this.state.colors, oldIndex, newIndex);
        
        this.setState({ colors });
    };

    render() {
        const maxReached = this.state.colors.length >= CONST_MAX_COLORS;

        return (
                <div className="create-palette">
                    <Prompt
                        when={this.state.saved === false && this.state.colors.length > 0}
                        message={`Reload site?\nChanges you made may not be saved.`}
                    />

                    <div className="panel-left">
                        <button className="pnl-back" context="primary" onClick={this.goBack}>BACK</button>
                        
                        <div className="pnl-palette">
                            <form className="pnl-form pnl-form-palette" onSubmit={this.createPalette}>
                                <input
                                        type="text"
                                        required maxLength="64"
                                        disabled={this.state.colors.length < 1}
                                        className="pnl-palette-name" placeholder="Palette name"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.inputChange}
                                    />
                                    {this.state.invalidPaletteMessage && <p className="pnl-error">{this.state.invalidPaletteMessage}</p>}
                                    <button disabled={this.state.colors.length < 1} className="pnrh-save" context="secondary">SAVE</button>
                            </form>

                            <button onClick={this.clearPalette} className="pnl-clear" context="clear">CLEAR PALETTE</button>
                        </div>

                        <div className="pnl-color">
                            <button disabled={maxReached} className="pnl-random" context="secondary" onClick={this.randomColor}>RANDOM COLOR</button>
                            <p>Pick a color</p>
                            <input type="color" className="pnl-color-picker" onInput={this.pickColor} onChange={this.pickColor}></input>
                            
                            <form className="pnl-form pnl-form-color" onSubmit={this.submitColor}>
                                <input
                                    type="text"
                                    required maxLength="32"
                                    disabled={!this.state.pickedColor || maxReached}
                                    className="pnl-color-name" placeholder="COLOR NAME"
                                    name="pickedColorName"
                                    value={this.state.pickedColorName}
                                    onChange={this.inputChange}
                                />
                                {this.state.invalidColorMessage && <p className="pnl-error">{this.state.invalidColorMessage}</p>}
                                <button disabled={!this.state.pickedColor || maxReached} context="primary" style={ {backgroundColor: this.state.pickedColor} }>ADD COLOR</button>
                            </form>
                        </div>
                    </div>        
                    
                    <div className="panel-right">
                        <PaleteCreateContainer
                            colors={this.state.colors}
                            removeColorBehavior={this.removeColor}
                            axis="xy"
                            onSortEnd={this.dragDropEnd}
                            distance={20}
                        />
                    </div>
                </div>
         ) // return
    } // render

    componentWillUnmount() {
        // reset window's default behavior
        window.onbeforeunload = undefined;
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default PaletteCreate;