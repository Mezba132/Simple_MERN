import React, {useContext, useState} from 'react';
import './PlaceItem.css';
import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElement/Modal";
import Map from '../../shared/components/UIElement/Map';
import {AuthContext} from "../../shared/components/Context/Auth-Contex";

const placeItem = (props) => {

    const auth = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);

    const [showDeleteModal, setDeleteModal] = useState(false);

    const onShowMapHandler =  () => setShowMap(true);

    const onCloseMapHandler = () => setShowMap(false);


    const onOpenDeleteHandler = () => setDeleteModal(true);

    const onCancelDeleteHandler = () => setDeleteModal(false);

    const onConfirmDeleteHandler = () => console.log("deleting ...");



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
            <Map center={props.coordinates} zoom={14}/>
        </Modal>
        <Modal
            show={showDeleteModal}
            onCancel={onCancelDeleteHandler}
            header="Are You Sure ?"
            footerClass="place-item__modal-actions"

            footer={
            <React.Fragment>
                <Button onClick={onCancelDeleteHandler}>Cancel</Button>
                <Button onClick={onConfirmDeleteHandler}>Delete</Button>
            </React.Fragment>
        }>
            <div>
                <p>Would You want to proceed ?</p>
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
                    {auth.isLoggedIn && <Button to={`/places/${props.id}`}>Edit</Button>}
                    {auth.isLoggedIn && <Button danger onClick={onOpenDeleteHandler}>Delete</Button>}
                </div>
            </Card>
        </li>
    </React.Fragment>

)}

export default placeItem;