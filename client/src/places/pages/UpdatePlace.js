import React from 'react';
import { useParams } from 'react-router-dom';
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/components/util/validators";
import Button from "../../shared/components/FormElements/Button";
import './PlaceForm.css';
import useForm from "../../shared/components/CustomHooks/FormHooks";

const placeList = [
    {
        id:'u1',
        imageUrl: 'https://i.ytimg.com/vi/pEBW9TQSl3I/hqdefault.jpg',
        title: 'Bangladesh National Parliament',
        description: 'Best Architectural building in Bangladesh',
        address: 'Main Plaza, Dhaka, Bangladesh',
        creator: 'Mezba',
        location: {
            lng: 90.3763924,
            lat: 23.762466
        }
    },
    {
        id:'u2',
        imageUrl: 'https://www.burjkhalifa.ae/en/Images/BurjKhalifa-02982_new_tcm290-85702.jpg',
        title : 'Burj Khalifa',
        description:'The tallest building in the world',
        address: '1 Sheikh Mohammed bin Rashid Blvd - Dubai - United Arab Emirates',
        creator: 'u1',
        location: {
            lng: 55.2721877,
            lat: 25.197197
        }
    }
]

const UpdatePlace = () => {
    const pId = useParams().placeId;
    const _place = placeList.find(place => place.id === pId);

    const [formState, inputHandler] = useForm({
        title: {
            value: _place.title,
            isValid: true
        },
        description: {
            value: _place.description,
            isValid: true
        },
        address: {
            value: _place.address,
            isValid: true
        }
    }, true);

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
                validators={[VALIDATOR_REQUIRE()]}
                initValue={formState.inputs.title.value}
                initValid={formState.inputs.title.isValid}
                onInput={inputHandler}
                errorText="Please Enter the place Name"
            />

            <Input
                id="title"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                initValue={formState.inputs.description.value}
                initValid={formState.inputs.description.isValid}
                onInput={inputHandler}
                errorText="Please Enter the place Name"
            />

            <Input
                id="address"
                element="input"
                label="address"
                validators={[VALIDATOR_REQUIRE()]}
                initValue={formState.inputs.address.value}
                initValid={formState.inputs.address.isValid}
                onInput={inputHandler}
                errorText="Please Enter the place Address"
            />

            <Button type="submit" > Update Place </Button>
        </form>
    )
}

export default UpdatePlace;