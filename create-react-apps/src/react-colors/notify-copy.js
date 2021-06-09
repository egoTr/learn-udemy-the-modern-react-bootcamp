import React, { Component } from 'react';

class NotifyCopy extends Component {
    constructor(props) {
        super(props);
    } // constructor

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
} // end of class

export default NotifyCopy;