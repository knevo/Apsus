import React from 'react'
export default class MusicNotePreview extends React.Component {
    getSpotifyIdFromUrl() {
        let spRegEx = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/;
        return this.props.note.details.url.match(spRegEx)[1]
    }

    get renderMusic() {
        const { note } = this.props
        if (note.details.url.includes('spotify')) {

            return <iframe title='music' src={ `https://open.spotify.com/embed/track/${this.getSpotifyIdFromUrl()}` } frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>

        } else {
            return <audio
                controls
                src={ note.details.url }>
                Your browser does not support the
                <code>audio</code> element.
                </audio>
        }
    }
    render() {
        return <React.Fragment>
            { this.renderMusic }
        </React.Fragment>

    }
}