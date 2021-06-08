import React, { Component } from 'react';

class ColorBoxCreate extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    async componentDidMount() {
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
    } // componentDidUpdate

    removeColor = () => {
        this.props.removeColorBehavior(this.props.id);
    } // removeColor

    render() {
        const style = {
            backgroundColor: this.props.color
        };
        return (
            <color-box-create style={style} title={this.props.name.toUpperCase()} onClick={this.copyColor}>
                <div className="color-create-footer">
                    <span className="color-create-name">{this.props.name}</span>
                    <span className="color-remove"><svg onClick={this.removeColor} className="color-remove-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ddd">
                        <title>Remove color</title>
                        <path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
                    </svg></span>
                </div>
            </color-box-create>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default ColorBoxCreate;