import React from 'react'
export default function MultSelectBox(props) {
    return (<div className={ 'multi-select-options' + (props.isVisible ? ' visible' : '') }>
        <select onChange={ props.onOptionSelect } defaultValue="">
            <option value="">Mark As</option>
            <option value="isRead,true">Read</option>
            <option value="isRead,false">Unread</option>
            <option value="isImportant,true">Important</option>
            <option value="isImportant,false">Not Important</option>
            <option value="isDeleted,true">Trash</option>
            <option value="isDeleted,false">Not Trash</option>
        </select>
    </div>)
}