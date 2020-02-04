import React from 'react'
const minRows = 1, maxRows = 10;
export default class ResizeableTextArea extends React.Component {
    state = {
        text: React.createRef(),
        rows: 1,
    };
    componentDidMount() {
        this.handleResize({ target: this.state.text.current }, false)
    }

    handleResize = (event, isUpdate = true) => {
        const textareaLineHeight = 16 * 1.3;
        const previousRows = event.target.rows;
        event.target.rows = minRows; // reset number of rows in textarea 

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        }
        this.setState({
            rows: currentRows < maxRows ? currentRows : maxRows,
        });
        isUpdate && this.updateNote()
    };

    updateNote = () => {
        const { todo } = this.props;
        const txt = this.state.text.current.value
        const details = (todo) ?
            { todos: { id: todo.id, txt, isDone: todo.isDone } }
            :
            { txt }
        if (!this.props.isAddTodo) this.props.handleUpdate({ details })
    }
    onAddTodo = () => {
        if (this.props.isAddTodo) {
            if (!this.state.text.current.value) return
            this.props.handleRerender(this.state.text.current.value)
        }
    }
    onSubmit = (ev) => {
        if (!this.props.isAddTodo) return
        if (ev.key === 'Enter') {
            ev.preventDefault()
            this.onAddTodo()
        }
        // this.props.handleChange(ev)
    }
    render() {
        return <textarea
            onKeyPress={ this.onSubmit }
            onBlur={ this.onAddTodo }
            spellCheck="false"
            style={ this.props.styles }
            rows={ this.state.rows }
            placeholder={ this.props.placeholder }
            value={ this.props.defaultText }
            className='text-area-input'
            onChange={ (ev) => {
                if (this.props.isAddTodo) this.props.handleChange(ev);
                this.handleResize(ev)
            } }
            ref={ this.state.text }
        />
    }
}
