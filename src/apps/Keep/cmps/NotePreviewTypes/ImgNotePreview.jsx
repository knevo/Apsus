import React from 'react'
export default class ImgNotePreview extends React.Component {

    render() {
        return <React.Fragment>
            <img alt='' src={ this.props.note.details.url }></img>
        </React.Fragment>
    }

}
