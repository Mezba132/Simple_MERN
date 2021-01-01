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
import { useHttpClient } from "../../shared/components/CustomHooks/HttpHooks";

const Auth = () => {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const { isLoading, error, sendRequest, errClear } = useHttpClient();

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

        if(isLoginMode)
        {
            try {
                await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'post',
                    {
                        'Content-Type' : 'application/json'
                    },
                    JSON.stringify({
                        email :  formState.inputs.email.value,
                        password :  formState.inputs.password.value,
                    })
                )
                auth.login();
            }
            catch (err) { }
        }
        else
            {
                try {
                    await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'post',
                    {
                        'Content-Type' : 'application/json'
                    },
                        JSON.stringify({
                      name : formState.inputs.name.value,
                      email :  formState.inputs.email.value,
                      password :  formState.inputs.password.value,
                    })
                )
                 auth.login();
            }
            catch (err) {}
        }
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={errClear} />
            <Card className="authentication">
            {isLoading && <LoadingSpinner />}
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