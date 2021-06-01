import React, { Component } from 'react';

class TodoItem extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            task: this.props.task
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    // an EXPERIMENTAL approach to bind 'this'
    toogleTaskDone = () => {
        this.props.toogleBehavior(this.props.id);
    } // end of method

    editTask = () => {
        this.props.editBehavior(this.props.id);
    } // editTask

    editTaskCancel = (event) => {
        event.preventDefault();
        
        this.props.editCancelBehavior(this.props.id);
    } // editTaskCancel

    // an EXPERIMENTAL approach to bind 'this'
    removeTask = () => {
        this.props.removeBehavior(this.props.id);
    } // end of method

    inputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    } // inputChange

    updateTask = (event) => {
        event.preventDefault();

        // default validation not fired :((
        const form = document.getElementById(`form${this.props.id}`);
        const validationResult = form.checkValidity();

        if (validationResult === false) {
            this.setState({ task: this.props.task });
            
            return;
        } // if

        this.props.updateBehavior(this.props.id, this.state.task);
    } // updateTask

    render() {
         return (
            <todo-item onedit={`${this.props.onEdit}`}>
                {!this.props.onEdit && 
                <div>
                    <todo-text
                        title={this.props.done ? "Click to set this task UNDONE" : "Click to set this task DONE"}
                        done={`${this.props.done}`}
                        onClick={this.toogleTaskDone}
                        >
                        {this.props.task}
                    </todo-text>
                    <todo-buttons>
                        <button title="Edit" onClick={this.editTask}>📝</button>
                        <button title="Remove" onClick={this.removeTask}>❌</button>
                    </todo-buttons>
                </div>
                }

                {this.props.onEdit && 
                <form id={`form${this.props.id}`} className="inner" onSubmit={this.updateTask}>
                    <input
                        name="task"
                        id={`txtTask${this.props.id}`}
                        type="text"
                        required minLength="3" maxLength="128"
                        value={this.state.task}
                        onChange={this.inputChange}
                    />
                    <todo-buttons-form>
                        <button title="Update" onClick={this.updateTask}>✔</button>
                        <button title="Cancel" onClick={this.editTaskCancel}>❌</button>
                    </todo-buttons-form>
                </form>
                }
            </todo-item>
         ) // return
    } // render
} // end of class

export default TodoItem;