import React from 'react'
export default function DeleteBtn(props) {

  return <span className='delete-btn hover-btn' onClick={ props.handleDelete }><i className="fas fa-trash-alt"></i></span>
}