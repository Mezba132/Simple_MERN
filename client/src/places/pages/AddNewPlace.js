import React from 'react';
import Input from "../../shared/components/FormElements/Input";
import './PlaceForm.css';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
import Button from "../../shared/components/FormElements/Button";
import  useForm  from '../../shared/components/CustomHooks/FormHooks';

const NewPlace = () => {

    const [formState, inputHandler] = useForm();

    const placeSubmitHandler = event => {
            event.preventDefault();

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
            validators={[VALIDATOR_MINLENGTH(3)]}
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