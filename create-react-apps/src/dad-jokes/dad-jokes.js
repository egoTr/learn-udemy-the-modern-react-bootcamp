import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import './dad-jokes.css';
import Joke from './joke';

const CONST_LOCAL_STORAGE_NAME = "dad-jokes.localStorage";
const CONST_MAX_JOKES = 100;
const CONST_JOKES_PER_LOAD = 10;
const CONST_API_URL = 'https://icanhazdadjoke.com';
const CONST_API_OPTIONS = { headers: { "Accept": "application/json" } };
const CONST_SORT_VOTES_DIRECTIONS = ['', 'desc', 'asc'];
const CONST_SORT_VOTES_INDICATORS = ['Sort jokes', 'Jokes sorted', 'detros sekoJ'];

document.title = "React Challenge/> Dad Jokes";

// load jokes:
// max = CONST_MAX_JOKES
// per load = CONST_JOKES_PER_LOAD
// duplicated joke not allowed
let jokeIdAll = [];
async function loadJokes()
{
    let jokes = [];

    while (true) {
        const response = await axios.get(CONST_API_URL, CONST_API_OPTIONS);
        const { id, joke } = response.data;

        if ( !jokeIdAll.includes(id) ) {
            jokeIdAll.push(id);
            jokes.push({ id, joke, votes: 0 });
        } // if
        else
            console.log(`Joke existed: [${joke}]`);

        if (jokes.length >= CONST_JOKES_PER_LOAD || jokeIdAll.length >= CONST_MAX_JOKES)
            return jokes;
    } // while
} // loadJokes

class DadJokes extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.stopTransition = () => {
            setTimeout( () => {
                this.setState({ onTransition: false })
            }, 2000);
        }; // this.stopTransition

        this.state = {
            isLoading: true,
            sortDirection: 0, // 0 = not sort, 1 = sort jokes descending by votes, 2 = sort ascending
            jokes: [],
            scrolledToId: null,
            onTransition: false
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    async componentDidMount() {
        let jokes;

        if ( localStorage.getItem(CONST_LOCAL_STORAGE_NAME) ) {
            jokes = JSON.parse( localStorage.getItem(CONST_LOCAL_STORAGE_NAME) );
            jokeIdAll = jokes.map(joke => joke.id);
        } // if
        else {
            jokes = await loadJokes(); 

            const json = JSON.stringify(jokes);
            if (json.length > 0)
                localStorage.setItem( CONST_LOCAL_STORAGE_NAME, json );
        } // else

        this.setState({ isLoading: false, jokes, onTransition: true }, () => this.stopTransition() );
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {

    } // componentDidUpdate

    // an EXPERIMENTAL approach to bind 'this'
    changeVote = (jokeId, voteChange) => {
        const newJokes = this.state.jokes.map( joke => 
            joke.id === jokeId ? {...joke, votes: joke.votes + voteChange} : joke
        ); // newJokes

        this.setState({ jokes: newJokes, onTransition: this.state.sortDirection > 0 }, () => {
            this.stopTransition();

            localStorage.setItem( CONST_LOCAL_STORAGE_NAME, JSON.stringify(this.state.jokes) )
        }); // this.setState
    } // end of method

    loadMoreJokes = async () => {
        this.setState({ isLoading: true });

        const newJokes = await loadJokes(); 

        this.setState( currentState => (
            { isLoading: false, jokes: [...currentState.jokes, ...newJokes], scrolledToId: newJokes[0].id, onTransition: true } // push(), pop()... not work for array states
        ), () => {
            this.stopTransition();

            localStorage.setItem( CONST_LOCAL_STORAGE_NAME, JSON.stringify(this.state.jokes) );
            
            // scroll to newly loaded jokes
            if (this.state.scrolledToId) {
                document.getElementById(this.state.scrolledToId).scrollIntoView({ behavior: 'smooth' });

                this.setState({ scrolledToId: null });
            } // if
        }); // this.setState
    } // loadMoreJokes

    sortJokes = async () => {
        let sortDirection = this.state.sortDirection; // current
        
        sortDirection = (sortDirection === CONST_SORT_VOTES_DIRECTIONS.length - 1) ? 0 : sortDirection + 1;

        this.setState({ sortDirection, onTransition: true }, () => this.stopTransition() );
    } // async

    render() {
        const jokesSorted = this.state.sortDirection === 0 ?
            this.state.jokes : 
            _.orderBy(this.state.jokes, ['votes'], CONST_SORT_VOTES_DIRECTIONS[this.state.sortDirection]);

        const jokes = (
            jokesSorted.map( (item, i) =>
                <Joke
                    key={item.id}
                    id={item.id}
                    joke={item.joke}
                    votes={item.votes}
                    transition={this.state.onTransition}
                    upVoteBehavior={this.changeVote}
                    downVoteBehavior={this.changeVote}
                />
            )
        ); // jokes

         return (
            <dad-jokes is="react">
                <div className="panel-left">
                    <p className="dad-jokes-icon">🤣</p>
                    <h1>Dad Jokes</h1>
                    {this.state.jokes.length < CONST_MAX_JOKES &&
                        <button
                            disabled={this.state.isLoading || this.state.onTransition}
                            className="button-panel-left button-load-more-jokes"
                            onClick={this.loadMoreJokes}
                            >
                            {!this.state.isLoading ? "Load more" : "Loading..."}
                        </button>
                    }

                    { !this.state.isLoading &&
                        <button
                            disabled={this.state.onTransition}
                            className="button-panel-left button-sort-jokes"
                            onClick={this.sortJokes}
                            >
                            {CONST_SORT_VOTES_INDICATORS[this.state.sortDirection]}
                        </button>
                    }

                </div>

                <div className="panel-right" transition={`${this.state.onTransition}`}>
                    {jokes}
                </div>
            </dad-jokes>
         ) // return
    } // render

    componentWillUnmount() {
        clearTimeout(this.stopTransition);
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default DadJokes;