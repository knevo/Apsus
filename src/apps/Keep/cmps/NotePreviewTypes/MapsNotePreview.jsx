import React from 'react'
export default class MapsNotePreview extends React.Component {
    componentDidMount() {
    }

    render() {
        return <div className="mapouter"><div className="gmap_canvas"><iframe title='map' width="200" height="200" id="gmap_canvas" src={ `https://maps.google.com/maps?q=${this.props.note.details.place}&t=&z=15&ie=UTF8&iwloc=&output=embed` } frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div>
        </div>
    }
}
