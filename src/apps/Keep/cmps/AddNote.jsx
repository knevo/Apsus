import React from 'react'
import { addNote } from '../services/keepService.js'
import { getRandomId } from '../../../services/Utils.js'
import eventBusService from '../../../services/eventBusService.js'

export default class AddNote extends React.Component {
    state = {
        draftNote: null,
        type: 'txt',
        text: '',
        placeholder: 'Enter text'
    }

    componentDidMount() {
        addNote('txt', { txt: '' }, true).then((draftNote) => this.setState({ draftNote }))
    }

    onInputChange = (ev) => {
        this.setState({ text: ev.target.value })

    }
    onAddNote = (ev) => {
        ev.preventDefault()
        if (!this.state.text) return
        const details = this.makeDetails()
        addNote(this.state.type, details)
            .then(this.props.onAdd);
        eventBusService.callModal('updatesBox', { type: 'success', message: 'Note added Successfully!' });

        this.setState({ text: '' })
    }
    makeDetails = () => {
        let details = {};
        switch (this.state.type) {
            case 'txt':
                details.txt = this.state.text
                break;
            case 'img':
                details.url = this.state.text
                break;
            case 'video':
                details.url = this.state.text
                break;
            case 'maps':
                details.place = this.state.text
                break;
            case 'music':
                details.url = this.state.text
                break;
            case 'todo':
                details.todos = []
                this.state.text.split(',').map(txt => details.todos.push({ id: getRandomId(), txt, isDone: false }))
                break;
            default:
                break;
        }
        return details
    }

    onTypeChange = (ev) => {
        this.setState({ type: ev.target.value })
        switch (ev.target.value) {
            case 'txt':
                this.setState({ placeholder: 'Enter text', text: '' })
                break;
            case 'todo':
                this.setState({ placeholder: 'Enter todos separated by commas', text: '' })
                break;
            case 'img':
                this.setState({ placeholder: 'Enter image URL', text: '' })
                break;
            case 'video':
                this.setState({ placeholder: 'Enter video URL', text: '' })
                break;
            case 'maps':
                this.setState({ placeholder: 'Enter (lat,lng) or place name', text: '' })
                break;
            case 'music':
                this.setState({ placeholder: 'Enter mp3 or Spotify URL', text: '' })
                break;
            default:
                break;
        }
    }

    get types() {
        const { type } = this.state
        return <div className='types-container'>
            <label htmlFor="txt" className={ (type === 'txt') ? 'active-type' : '' }>
                <i className="fas fa-text-height"></i></label>
            <input onChange={ this.onTypeChange } type='radio' id='txt' name='type' value='txt' />
            <label htmlFor="todo" className={ (type === 'todo') ? 'active-type' : '' }>
                <i className="fas fa-list-ul"></i></label>
            <input onChange={ this.onTypeChange } type='radio' id='todo' name='type' value='todo' />

            <label htmlFor="img" className={ (type === 'img') ? 'active-type' : '' }>
                <i className="fas fa-image"></i></label>
            <input onChange={ this.onTypeChange } type='radio' id='img' name='type' value='img' />
            <label htmlFor="video" className={ (type === 'video') ? 'active-type' : '' }>
                <i className="fas fa-video"></i></label>
            <input onChange={ this.onTypeChange } type='radio' id='video' name='type' value='video' />
            <label htmlFor="maps" className={ (type === 'maps') ? 'active-type' : '' }>
                <i className="fas fa-map-marked-alt"></i></label>
            <input onChange={ this.onTypeChange } type='radio' id='maps' name='type' value='maps' />
            <label htmlFor="music" className={ (type === 'music') ? 'active-type' : '' }>
                <i className="fas fa-music"></i></label>
            <input onChange={ this.onTypeChange } type='radio' id='music' name='type' value='music' />

            {/* <MediaAddBtns currType={this.state.type} handleClick={this.onTypeChange}></MediaAddBtns> */ }
        </div>
    }

    render() {
        return <form onSubmit={ this.onAddNote }>
            <div className='add-container flex auto-center'>
                {/* {this.state.draftNote && <NotePreview isDraft={true} textStyle={this.state.draftNote.style} note={this.state.draftNote}></NotePreview>} */ }
                <input placeholder={ this.state.placeholder } onChange={ this.onInputChange }
                    value={ this.state.text } type="search" name="add" id="" />
                { this.types }
                {/* <button onClick={this.onAddNote}>Add</button> */ }
            </div>
        </form>
    }
}