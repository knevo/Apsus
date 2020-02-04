import React from 'react'
export default function MailReadProgress(props) {
    let progressBar = <span className="progress-bar" style={ { width: props.readPercentage + '%' } }></span>;

    return (
        <div className="mailbox-status">
            { progressBar }
            <span className="progress-text flex auto-center">{ props.readPercentage + '%' }</span>
        </div>);
}

