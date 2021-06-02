import React, { Component } from 'react';
import axios from 'axios';

import './dad-jokes.css';
import Joke from './joke';

const CONST_JOKES_LOCAL_STORAGE_NAME = "dad-jokes.localStorage";
const CONST_JOKES_MAX = 100;
const CONST_JOKES_PER_LOAD = 10;
const CONST_JOKES_API_URL = 'https://icanhazdadjoke.com';
const CONST_JOKES_API_OPTIONS = { headers: { "Accept": "application/json" } };

document.title = "React Challenge/> Dad Jokes";

// load jokes:
// max = CONST_JOKES_MAX
// per load = CONST_JOKES_PER_LOAD
// duplicated joke not allowed
let jokeIdAll = [];
async function loadJokes()
{
    let jokeIds = [];
    let jokes = [];

    while (true) {
        const response = await axios.get(CONST_JOKES_API_URL, CONST_JOKES_API_OPTIONS);
        const { id, joke } = response.data;

        if ( !jokeIds.includes(id) && !jokeIdAll.includes(id) ) {
            jokeIds.push(id);
            jokeIdAll.push(id);
            jokes.push({ id, joke, votes: 0 });
        } // if
        else
            console.log(`Joke existed: [${joke}]`);

        if (jokes.length >= CONST_JOKES_PER_LOAD || jokeIdAll.length >= CONST_JOKES_MAX)
            return jokes;
    } // while
} // loadJokes

class DadJokes extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            jokes: []
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    async componentDidMount() {
        let jokes;

        if ( localStorage.getItem(CONST_JOKES_LOCAL_STORAGE_NAME) ) {
            jokes = JSON.parse( localStorage.getItem(CONST_JOKES_LOCAL_STORAGE_NAME) );
            jokeIdAll = jokes.map(joke => joke.id);
        } // if
        else {
            jokes = await loadJokes(); 

            const json = JSON.stringify(jokes);
            if (json.length > 0)
                localStorage.setItem( CONST_JOKES_LOCAL_STORAGE_NAME, json );
        } // else

        this.setState({ isLoading: false, jokes });
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
        localStorage.setItem( CONST_JOKES_LOCAL_STORAGE_NAME, JSON.stringify(this.state.jokes) );
    } // componentDidUpdate

    // an EXPERIMENTAL approach to bind 'this'
    changeVote = (jokeId, voteChange) => {
        const newJokes = this.state.jokes.map( joke => 
            joke.id === jokeId ? {...joke, votes: joke.votes + voteChange} : joke
        );

        this.setState({ jokes: newJokes});
    } // end of method

    loadMoreJokes = async () => {
        this.setState({ isLoading: true });

        const newJokes = await loadJokes(); 

        this.setState( currentState => (
            { isLoading: false, jokes: [...currentState.jokes, ...newJokes] } // push(), pop()... not work for array states
        )) // setState
    } // loadMoreJokes

    render() {
        const jokes = (
            this.state.jokes.map( (item, i) =>
                <Joke
                    key={item.id}
                    id={item.id}
                    joke={item.joke}
                    votes={item.votes}
                    upVoteBehavior={this.changeVote}
                    downVoteBehavior={this.changeVote}
                />
            )
        ); // jokes

         return (
            <dad-jokes is="react">
                <div className="panel-left">
                    <h1>Dad Jokes</h1>
                    {this.state.jokes.length < CONST_JOKES_MAX &&
                        <button
                            disabled={this.state.isLoading}
                            className="button-load-more-jokes"
                            onClick={this.loadMoreJokes}
                            >
                            {!this.state.isLoading ? "Load more" : "Loading..."}
                        </button>
                    }
                </div>

                <div className="panel-right">
                    {jokes}
                </div>
            </dad-jokes>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default DadJokes;