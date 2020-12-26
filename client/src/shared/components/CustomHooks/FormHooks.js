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

    return [formState, inputHandler];
}

export default useForm;