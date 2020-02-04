import React from 'react'
export default function UpdatesBox(props) {
    return (
        <div className={ 'updates-box ' + (props.modalData.type ? props.modalData.type : '') }>
            { props.modalData.message }
        </div>);
}