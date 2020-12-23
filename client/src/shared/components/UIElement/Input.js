import React from 'react';
import './Input.css';

const Input = (props) => {
    const element =
        props.element === 'input' ?
            ( <input id={props.id} type={props.type} placeholder={props.placeholder} label={props.label}/> )
            : ( <textarea id={props.id} rows={props.rows || 2} /> )
    return (
        <div className={`form-control`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
        </div>
    )
}

export default Input;