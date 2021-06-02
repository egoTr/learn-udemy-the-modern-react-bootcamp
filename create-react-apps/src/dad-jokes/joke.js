import React, { Component } from 'react';
import { findClosest } from '../helpers';

const CONST_EMOTION_FLAGS = [-50, -25, -15, 0, 15, 30, 70];
const CONST_EMOTION_CHARS = ['😠', '🥱', '😏', '😐', '😀', '😁', '🤣'];

class Joke extends Component {
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
    upVote = () => {
        this.props.upVoteBehavior(this.props.id, 1);
    } // end of method
    downVote = () => {
        this.props.downVoteBehavior(this.props.id, -1);
    } // end of method

    render() {
         const closetEmotionFlag = findClosest(CONST_EMOTION_FLAGS, this.props.votes);
         const closetEmotionFlag_index = CONST_EMOTION_FLAGS.indexOf(closetEmotionFlag);
         const emotion = CONST_EMOTION_CHARS[closetEmotionFlag_index];

         return (
             <joke is="react">
                 <joke-buttons>
                    <button title="Upvote this joke" onClick={this.upVote}>
                        <svg className="joke-buttons-svg joke-buttons-svg-up" width="16" height="16" viewBox="0 0 36 36">
                            <path d="M2 26h32L18 10 2 26z"></path>
                        </svg>
                    </button>
                    
                    <joke-votes>{this.props.votes}</joke-votes>

                    <button className="joke-buttons-svg joke-buttons-svg-down" title="Downvote this joke"  onClick={this.downVote}>
                        <svg width="16" height="16" viewBox="0 0 36 36">
                            <path d="M2 10h32L18 26 2 10z"></path>
                        </svg>
                    </button>
                </joke-buttons>
                
                <joke-text>{this.props.joke}</joke-text>
                <joke-emotion title="Funny level">{emotion}</joke-emotion>
            </joke>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default Joke;