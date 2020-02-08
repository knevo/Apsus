import React from 'react'
import AddNote from "./cmps/AddNote.jsx";
import NoteList from "./cmps/NoteList.jsx"
import { getNotesToRender } from "./services/keepService.js"
import eventBusService from "./../../services/eventBusService.js"

export default class Home extends React.Component {
    state = {
        notes: null,
        searchString: '',
        isTherePinned: false
    }

    handleSearch = (searchString) => {
        this.setState({ searchString }, this.loadNotes)
    }

    componentDidMount() {
        this.loadNotes().then(() => eventBusService.emit('setSearchHandler', this.handleSearch));
    }

    componentWillUnmount() {
        eventBusService.emit('setSearchHandler', null);
    }

    loadNotes = () => {
        return getNotesToRender(this.state.searchString).then(notes => {
            eventBusService.callModal('pageLoading', false)
            this.setState({ notes }, this.checkPinned)
        })
    }
    checkPinned = () => {
        const pinned = this.state.notes.find(note => note.isPinned);
        this.setState({ isTherePinned: (pinned) ? true : false })
    }

    render() {
        if (!this.state.notes) return <div>Loading....</div>
        return (
            <section className='main-keep'>
                <AddNote loadNotes={ this.loadNotes }></AddNote>

                { this.state.isTherePinned && <h3><i className="fas fa-thumbtack"></i></h3> }
                { this.state.isTherePinned && <NoteList pinnedNotes={ true } handleReload={ this.loadNotes } notes={ this.state.notes.filter(note => note.isPinned) }></NoteList> }

                <NoteList handleReload={ this.loadNotes } notes={ this.state.notes.filter(note => !note.isPinned) }></NoteList>
            </section>
        )
    }
}