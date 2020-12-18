import React from 'react';
import ReactDom from 'react-dom';
import './SideDrawer.css';
import { CSSTransition } from "react-transition-group";

const sideDrawer = props => {
    const content = (
        <CSSTransition
        in={props.show}
        timeout={150}
        classNames="slide-in-left-enter"
        mountOnEnter
        unmountOnExit
        >
            <aside className="side-drawer" onClick={props.clicked}>{props.children} </aside>
        </CSSTransition>
    );
    return ReactDom.createPortal(content, document.getElementById('side-drawer'));
}

export default sideDrawer;