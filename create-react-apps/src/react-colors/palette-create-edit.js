import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import arrayMove from 'array-move';

import ColorHelper from '../helpers';

import './css/palette-create-edit.css';
import PaleteCreateContainer from './palette-create-container';
import Error404NotFound from './error-404-not-found';

const CONST_MAX_COLORS = 20;

class PaletteCreateEdit extends Component {
    constructor(props) {
        super(props);
        
        const palette = this.props.palette;

        this.state = {
            saved: palette ? true : false,
            title: palette ? palette.title : '',
            invalidPaletteMessage: null,
            colors: palette ? palette.colors : [],
            pickedColor: null,
            pickedColorName: '',
            invalidColorMessage: null
        } // state
    } // constructor

    async componentDidUpdate(prevProps, prevStata) {
        if (!this.state.saved && this.state.colors.length > 0)
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
            { saved: false, colors: [...currentState.colors, color] } // push(), pop()... not work for array states
        ), () => {
            //callback
        }) // setState
    } // addColor

    submitColor = (event) => {
        event.preventDefault();

        const color = { id: Date.now(), name: this.state.pickedColorName, hex: this.state.pickedColor };
        const validColor = this.checkColorValid(color.name, color.hex);
        if (!validColor.status)
            return this.setState({ invalidColorMessage: validColor.message });

        this.addColor(color);
    } // submitColor

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

    createOrSavePalette = (event) => {
        event.preventDefault();

        const valid = this.props.checkPaletteValidBehavior(this.props.palette ? this.props.palette.id : null, this.state.title);
        if (!valid.status)
            return this.setState({ invalidPaletteMessage: valid.message });

        this.setState({ saved: true }, () => {
            if (this.props.edit)
                this.props.savePaletteBehavior(this.props.palette.id, this.state.title, this.state.colors);
            else
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
                this.setState({ saved: false, invalidPaletteMessage: null });
            else if (name === 'pickedColorName')
                this.setState({ invalidColorMessage: null });
        });
    } // inputChange

    removeColor = (colorId) => {
        const newColors = this.state.colors.filter( color => color.id !== colorId );

        this.setState({ saved: false, colors: newColors });
    } // removeColor

    goBack = () => {
        this.props.transitionBehavior('right-to-left');

        this.props.history.goBack();
    } // goBack

    dragDropEnd = ({oldIndex, newIndex}) => {
        const colors = arrayMove(this.state.colors, oldIndex, newIndex);
        
        this.setState({ saved: false, colors });
    };

    render() {
        const { edit, palette } = this.props;
        document.title = `React Colors/> ${edit ? 'Edit' : 'Create'} Palette`;

        if (edit && !palette)
            return <Error404NotFound/>;

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
                            <form className="pnl-form pnl-form-palette" onSubmit={this.createOrSavePalette}>
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
} // end of class

export default PaletteCreateEdit;