import React, {useState, useContext} from 'react'
import Input from "../../shared/components/FormElements/Input";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import useForm from "../../shared/components/CustomHooks/FormHooks";
import './Auth.css';
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElement/Card";
import {AuthContext} from "../../shared/components/Context/Auth-Contex";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";

const Auth = () => {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [isLoading,setIsLoading] = useState(false);

    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm({
            email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
            false
    );

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                 formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if(isLoginMode)
        {
            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method : 'post',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        email :  formState.inputs.email.value,
                        password :  formState.inputs.password.value,
                    })
                });

                const responseData = await response.json();
                if(!response.ok) {
                    throw new error(responseData.message);
                }
                setIsLoading(false);
                auth.login();
            }
            catch (err) {
                setIsLoading(false);
                setError( err.message || "something went wrong, try again");
            }
        }
        else
            {
                try {
                 const response = await fetch('http://localhost:5000/api/users/signup', {
                    method : 'post',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                      name : formState.inputs.name.value,
                      email :  formState.inputs.email.value,
                      password :  formState.inputs.password.value,
                    })
                });
                 const responseData = await response.json();
                if(!response.ok) {
                    throw new error(responseData.message);
                }
                 setIsLoading(false);
                 auth.login();
            }
            catch (err) {
                setIsLoading(false);
                setError( err.message || "something went wrong, try again");
            }
        }
    }

    const errorHandler = () => {
        setError(null);
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            <h2>LogIn Required</h2>
            <hr />
            <form className="place-form" onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    />
                )}
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="User Name"
                    placeholder="user name"
                    validators={[VALIDATOR_EMAIL()]}
                    onInput={inputHandler}
                    errorText="Please Enter the place Information"
                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="User Password"
                    placeholder="user password"
                    validators={[VALIDATOR_MINLENGTH(4)]}
                    onInput={inputHandler}
                    errorText="Please Enter the place Information"
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button>
        </Card>
        </React.Fragment>
    )
}

export default Auth;