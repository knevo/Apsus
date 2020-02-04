import React from 'react'
export default class VideoNotePreview extends React.Component {
    getIdfromYoutubeUrl(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    get renderVideo() {
        const { note } = this.props
        if (note.details.url.includes('youtube')) {
            return <iframe width="420" height="315" title='video'
                src={ `https://www.youtube.com/embed/${this.getIdfromYoutubeUrl(note.details.url)}` }>
            </iframe>
        } else {
            return <video controls>
                <source src={ note.details.url } type="video/mp4" />
            </video>
        }
    }
    render() {
        return <React.Fragment>
            { this.renderVideo }
        </React.Fragment>

    }
}
