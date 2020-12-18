import React from 'react';
import './MainHeader.css';

const mainHeader = props => (
    <div className="main-header">
            {props.children}
    </div>
);

export default mainHeader;