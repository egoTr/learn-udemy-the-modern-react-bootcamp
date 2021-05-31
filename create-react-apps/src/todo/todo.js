import React, { Component } from 'react';
import './todo.css';
import TodoForm from './todo-form';
import TodoItem from './todo-item';

document.title = "React Challenge/> Todo";

class ToDo extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            onEdit: false,
            tasks: [
               /*  {
                    id: Date.now(),
                    task: 'Your first task',
                    done: false,
                    onEdit: false
                } */
            ]
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    // an EXPERIMENTAL approach to bind 'this'
    addTodo = (task) => {
        const newTask = {...task, id: Date.now(), done: false, onEdit: false};

        this.setState( currentState => (
            { tasks: [...currentState.tasks, newTask] } // push(), pop()... not work for array states
        )) // setState
    } // end of method

    toogleTaskDone = (taskId) => {
        const newTasks = this.state.tasks.map( task => (
            task.id === taskId ? {...task, done: !task.done} : task
        ));

        this.setState({ tasks: newTasks });
    } // removeTaskById

    removeTaskById = (taskId) => {
        if (this.state.onEdit)
            return;

        this.setState( currentState => (
            { tasks: currentState.tasks.filter(task => task.id !== taskId) } // push(), pop()... not work for array states
        )) // setState
    } // removeTaskById

    editTaskById = (taskId) => {
        if (this.state.onEdit)
            return;
        
            const newTasks = this.state.tasks.map( task => (
            task.id === taskId ? {...task, onEdit: true} : task
        ));

        this.setState({ onEdit: true, tasks: newTasks });
    } // editTaskById

    editCancelTaskById = (taskId) => {
        const newTasks = this.state.tasks.map( task => (
            task.id === taskId ? {...task, onEdit: false} : task
        ));

        this.setState({ onEdit: false, tasks: newTasks });
    } // editCancelTaskById

    updateTaskById = (taskId, taskText) => {
        const newTasks = this.state.tasks.map( task => (
            task.id === taskId ? {...task, task: taskText, onEdit: false} : task
        ));

        this.setState({ onEdit: false, tasks: newTasks });
    } // updateTaskById

    render() {
         return (
            <todo is="react">
                <h1>TODOs</h1>
                <TodoForm submitBehavior={this.addTodo}/>

                <hr/>
                
                { this.state.tasks.length === 0 && <p>No tasks.</p>}
                
                { this.state.tasks.map( (item, i) =>
                    <TodoItem
                        key={i}
                        id={item.id}
                        task={item.task}
                        done={item.done}
                        onEdit={item.onEdit}
                        validated={false}
                        toogleBehavior={this.toogleTaskDone}
                        removeBehavior={this.removeTaskById}
                        editBehavior={this.editTaskById}
                        editCancelBehavior={this.editCancelTaskById}
                        updateBehavior={this.updateTaskById}
                    />
                )}
            </todo>
         ) // return
    } // render
} // end of class

export default ToDo;