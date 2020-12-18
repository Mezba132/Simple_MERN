import React from 'react';
import ReactDom from 'react-dom';
import './SideDrawer.css';

const sideDrawer = props => {
    const content = <aside className="side-drawer">{props.children}</aside>
    return ReactDom.createPortal(content, document.getElementById('side-drawer'));
}

export default sideDrawer;