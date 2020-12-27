import React, {useReducer, useCallback} from 'react';

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
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            };
        default :
            return currentState;
    }
}

const useForm = (initInput, initValid) => {
    const [formState, dispatch] = useReducer(formReducer, {inputs : initInput, isValid : initValid});

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type : 'input_change',
            value: value,
            isValid: isValid,
            inputId : id
        })
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        });
    }, []);

    return [formState, inputHandler, setFormData];
}

export default useForm;