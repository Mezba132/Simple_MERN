import React from 'react';
import Input from "../../shared/components/UIElement/Input";
import './NewPlaces.css';

const NewPlace = () => (
    <form className="place-form">
        <Input element="input" type="text" label="Title" placeholder="Place Name" />
        <Input element="input" type="text" label="Title" placeholder="Place Name" />

    </form>
)

export default NewPlace;