import React from 'react'
import ResizeableTextArea from "./ResizableTextArea.jsx";

export default class AddTodo extends React.Component {
    state = {
        defaultText: ''
    }

    handleChange = (ev) => {
        this.setState({ defaultText: ev.target.value })
    }

    onRerender = (newTodo) => {
        this.props.handleAdd(newTodo)
        this.setState({ defaultText: '' })
    }
    render() {
        return <div className="todo-add">
            <ResizeableTextArea handleRerender={ this.onRerender } defaultText={ this.state.defaultText } isAddTodo={ true } handleUpdate={ this.props.handleAdd } handleChange={ this.handleChange } placeholder='add new todo' />
        </div>
    }

}