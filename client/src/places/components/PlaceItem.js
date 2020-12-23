import React from 'react';
import './PlaceItem.css';
import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/Button/Button";

const placeItem = (props) => {
    return <li className="place-item">
        <Card className="place-item">
            <div className="place-item__image">
                <img src={props.image} alt={props.title} />
            </div>
            <div className="place-item__info">
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <p>{props.description}</p>
            </div>
            <div className="place-item__actions">
                <Button inverse>View on Map</Button>
                <Button to={`/places/${props.id}`}>Edit</Button>
                <Button danger>Delete</Button>
            </div>
        </Card>
    </li>
}

export default placeItem;