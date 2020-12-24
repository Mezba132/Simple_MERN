import React, {useReducer, useCallback} from 'react';
import Input from "../../shared/components/FormElements/Input";
import './NewPlaces.css';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
import Button from "../../shared/components/FormElements/Button";

const formReducer = (currentState, action) => {
    switch (action.type) {
        case 'input_change' :
            let formIsValid  = true;
            for( const inputId in currentState.inputs )
            {
                if(inputId === action.inputId)
                {
                    formIsValid = formIsValid && action.isValid;
                }
                else
                {
                    formIsValid = formIsValid && currentState.inputs[inputId].isValid;
                }
            }
            return {
                ...currentState,
                inputs : {
                    ...currentState.inputs,
                    [action.inputId] : { value : action.value, isValid : action.isValid}
                },
                isValid : formIsValid
            }
        default :
            return currentState;
    }
}

const NewPlace = () => {

      const [formState, dispatch] = useReducer(formReducer, {
        inputs : {
            title : {
                value : '',
                isValid : false
            },
            description : {
                value : '',
                isValid : false
            }
        },
          isValid : false
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type : 'input_change',
            value: value,
            isValid: isValid,
            inputId : id
        })
    }, []);

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            placeholder="Place Name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please Enter the place Name"
        />
        <Input
            id="description"
            element="textarea"
            label="Description"
            placeholder="Place Information"
            validators={[VALIDATOR_MINLENGTH(10)]}
            onInput={inputHandler}
            errorText="Please Enter the place Information"
        />
        <Input
            id="address"
            element="input"
            label="address"
            placeholder="Place Address"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please Enter the place Address"
        />
            <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
        </form>
    )
}

export default NewPlace;