import React from 'react';
import './PlaceList.css';
import Card from "../../shared/components/UIElement/Card";
import PlaceItem from './PlaceItem';

const placeList = (props) => {
    if(props.items.length === 0)
    {
        return (
            <div className="place-list center">
                <Card>
                    <h1 className="center"> Nothing Found </h1>
                </Card>
            </div>
        );
    }

    return <ul className="place-list">
        {props.items.map( place =>
            <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            />)}
    </ul>
}

export default placeList;