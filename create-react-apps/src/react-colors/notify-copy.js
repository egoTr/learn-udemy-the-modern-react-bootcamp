import React, { Component } from 'react';

class NotifyCopy extends Component {
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

    // an EXPERIMENTAL approach to bind 'this'
    methodName = () => {
    } // end of method

    render() {
        const style = { backgroundColor: this.props.color };
        return (
            <div className="notify-copy-outer" style={style} show={`${this.props.toShowed}`}>
                <div className="notify-copy-inner">
                    Copied color&nbsp;
                    <strong>{this.props.color}</strong>
                    &nbsp;to clipboard
                </div>
            </div>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default NotifyCopy;