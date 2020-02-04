import React from 'react'
import ResizeableTextArea from "../ResizableTextArea.jsx";
import AddTodo from '../AddTodo.jsx'
import { addTodo } from '../../services/keepService.js'

export default class TodoNotePreview extends React.Component {

    toggleTodo = (todo) => {
        let details = { todos: { id: todo.id, txt: todo.txt, isDone: !todo.isDone } }
        this.props.handleUpdate({ details })
    }
    onAddTodo = (todoTxt) => {
        addTodo(this.props.note.id, todoTxt).then(this.props.handleUpdate)
    }

    render() {
        return <React.Fragment>
            { this.props.note.details.todos.map((todo, i) => {
                return <div key={ i } className='todo-container'>
                    <input defaultChecked={ todo.isDone } onClick={ () => this.toggleTodo(todo) } type='checkbox'></input>
                    <ResizeableTextArea styles={ todo.isDone ? { textDecoration: 'line-through' } : {} } todo={ todo } handleUpdate={ this.props.handleUpdate } defaultText={ todo.txt } />
                </div>
            }) }
            <AddTodo handleAdd={ this.onAddTodo }></AddTodo>
        </React.Fragment>
    }

}
