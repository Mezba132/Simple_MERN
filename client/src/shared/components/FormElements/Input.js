import React, { useReducer, useEffect } from 'react';
import './Input.css';
import { validate } from "../util/validators";

const inputReducer = (currentState, action) => {
    switch (action.type) {
        case 'change' :
            return {
                ...currentState,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'touch' : {
            return {
                ...currentState,
                isTouched: true
            }
        }
        default :
            return currentState;
    }
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer,
        {
            value : props.initValue || '',
            isTouched : false,
            isValid : props.initValid || false
        });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect( () => {
        onInput( id, value, isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = (event) => {
        dispatch({ type : 'change', val : event.target.value, validators : props.validators})
    }

    const touchHandler = () => {
        dispatch( { type : 'touch' })
    }

    const element =
        props.element === 'input' ?
            ( <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                label={props.label}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}/>
            ) :
            ( <textarea
                id={props.id}
                rows={props.rows || 2}
                placeholder={props.placeholder}
                label={props.label}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}/>
            )
    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && `form-control--invalid`}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input;