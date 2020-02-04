
import React from 'react'
export default class ColorPicker extends React.Component {
    state = {
        isOpen: false
    }
    setColor = (ev) => {
        this.setState({ isOpen: false })
        this.props.handleChange(ev.target.style.backgroundColor)
    }
    onToggle = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    }
    render() {
        return <span className='color-picker'>
            <label onClick={ this.onToggle } htmlFor={ `pallete${this.props.noteId}${this.props.isText ? 'text' : ''}` }><i className={ `hover-btn ${this.props.icon}` }></i></label>
            {/* <input type="radio" checked={this.state.isChecked} name={`colorpick${this.props.noteId}`} id={`pallete${this.props.noteId}${this.props.isText ? 'text' : ''}`} /> */ }

            <div className={ `colors hover-btn ${this.state.isOpen ? 'open-colors' : ''}` } >
                { this.props.colors.map((color, i) => <label key={ i } onClick={ this.setColor }
                    htmlFor={ `pallete${this.props.noteId}${this.props.isText ? 'text' : ''}` } style={ { backgroundColor: color } }>
                </label>) }
            </div>
        </span>
    }
}