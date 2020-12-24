import React, { useState } from 'react';
import './PlaceItem.css';
import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElement/Modal";
import Map from '../../shared/components/UIElement/Map';

const placeItem = (props) => {

    const [showMap, setShowMap] = useState(false);

    const onShowMapHandler =  () => setShowMap(true);

    const onCloseMapHandler = () => setShowMap(false);

    return (
    <React.Fragment>
        <Modal
        show={showMap}
        onCancel={onCloseMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={ <Button onClick={onCloseMapHandler}>CLose</Button>}
        >
            <div className="map-container">
                <Map center={props.coordinates} zoom={16} />
            </div>
        </Modal>
        <li className="place-item">
            <Card className="place-item">
                <div className="place-item__image">
                    <img src={props.image} alt={props.title}/>
                </div>
                <div className="place-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={onShowMapHandler}>View on Map</Button>
                    <Button to={`/places/${props.id}`}>Edit</Button>
                    <Button danger>Delete</Button>
                </div>
            </Card>
        </li>
    </React.Fragment>

)}

export default placeItem;