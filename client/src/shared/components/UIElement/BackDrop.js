import React from 'react';
import ReactDom from 'react-dom';
import './BackDrop.css';

const backDrop = (props) => {
    const backdrop = <div className="backdrop" onClick={props.clicked}></div>
    return ReactDom.createPortal(backdrop, document.getElementById('back-drawer'));
}

export default backDrop;