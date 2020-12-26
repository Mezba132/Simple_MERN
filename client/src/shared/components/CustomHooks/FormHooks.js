import React, {useReducer, useCallback} from 'react';

const initialState = {
    inputs : {
        title : {
            value : '',
                isValid : false
        },
        description : {
            value : '',
                isValid : false
        },
        address : {
            value : '',
                isValid : false
        }
    },
    isValid : false
}

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

const useForm = () => {
    const [formState, dispatch] = useReducer(formReducer, initialState);

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