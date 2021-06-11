import React, { Component } from 'react';
import './todo.css';
import TodoForm from './todo-form';
import TodoItem from './todo-item';

const CONST_TODOS_LOCAL_STORAGE_NAME = "todos.localStorage";

document.title = "React Challenge/> Todo - v2";

class ToDo extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            onEdit: false,
            tasks: []
        } // state

        this.refForm = React.createRef();
        this.refTodoItem = React.createRef();
    } // constructor

    async componentDidMount() {
        if ( localStorage.getItem(CONST_TODOS_LOCAL_STORAGE_NAME) ) {
            const tasks = JSON.parse( localStorage.getItem(CONST_TODOS_LOCAL_STORAGE_NAME) );

            this.setState({ tasks });
        } // if
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
        localStorage.setItem( CONST_TODOS_LOCAL_STORAGE_NAME, JSON.stringify(this.state.tasks) );
    } // componentDidUpdate

    // an EXPERIMENTAL approach to bind 'this'
    addTodo = (task) => {
        const newTask = {task, id: Date.now(), done: false, onEdit: false};

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
        ), this.refForm.current.focus() ) // setState
    } // removeTaskById

    editTaskById = (taskId) => {
        if (this.state.onEdit)
            return;
        
        const newTasks = this.state.tasks.map( task => (
            task.id === taskId ? {...task, onEdit: true} : task
        ));

        this.setState({ onEdit: true, tasks: newTasks }, () => {
            if (this.refTodoItem.current)
                this.refTodoItem.current.focus();
        });
    } // editTaskById

    editCancelTaskById = (taskId) => {
        const newTasks = this.state.tasks.map( task => (
            task.id === taskId ? {...task, onEdit: false} : task
        ));

        this.setState({ onEdit: false, tasks: newTasks }, this.refForm.current.focus());
    } // editCancelTaskById

    updateTaskById = (taskId, taskText) => {
        const newTasks = this.state.tasks.map( task => (
            task.id === taskId ? {...task, task: taskText, onEdit: false} : task
        ));

        this.setState({ onEdit: false, tasks: newTasks }, this.refForm.current.focus());
    } // updateTaskById

    render() {
         return (
            <todo is="react">
                <h1>TODOs</h1>
                <TodoForm ref={this.refForm} submitBehavior={this.addTodo}/>

                <hr/>
                
                { this.state.tasks.length === 0 && <p>No tasks.</p>}
                
                { this.state.tasks.map( (item, i) =>
                    <TodoItem
                        key={i}
                        id={item.id}
                        task={item.task}
                        done={item.done}
                        onEdit={item.onEdit}
                        ref={item.onEdit ? this.refTodoItem : null}
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