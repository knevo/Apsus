import React from 'react'
export default class PaginationMenu extends React.Component {

    handlePageToggling = (diff) => {
        this.props.history.push('?page=' + (this.props.currentPage + diff));
    }

    render() {
        return (
            <div className="pagination-menu flex auto-center">
                <button onClick={ () => this.handlePageToggling(-1) } className="simple-button" disabled={ (this.props.currentPage - 1) < 1 }>
                    <i className="fas fa-chevron-left"></i>
                </button>
                { this.props.currentPage } / { this.props.maxPage }
                <button onClick={ () => this.handlePageToggling(1) } className="simple-button" disabled={ (this.props.currentPage + 1) > this.props.maxPage }>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>);
    }
}