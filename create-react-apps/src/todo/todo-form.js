import React, { Component } from 'react';

class TodoForm extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            task: ''
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    // an EXPERIMENTAL approach to bind 'this'
    addNewTask = (event) => {
        event.preventDefault();

        this.props.submitBehavior(this.state);

        // reset state
        this.setState({ task: '' });

        // focus at task
        const inputTask = document.querySelector('form').elements['task'];
        inputTask.value = '';
        inputTask.focus();
    } // end of method

    // an EXPERIMENTAL approach to bind 'this'
    inputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    } // end of method

    render() {
         return (
            <form className="outer" onSubmit={this.addNewTask}>
                <input
                    type="text" name="task"
                    required autoFocus
                    minLength="3" maxLength="128"
                    placeholder="Task"
                    value={this.state.task}
                    onChange={this.inputChange}
                />
                <button title="Add task">➕</button>
            </form>
         ) // return
    } // render
} // end of class

export default TodoForm;