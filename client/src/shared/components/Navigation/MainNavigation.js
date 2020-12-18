import React, {useState} from 'react';
import MainHeader from './MainHeader';
import { Link } from "react-router-dom";
import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import BackDrop from '../UIElement/BackDrop';

const mainNav = props => {
    const [isDrawerOpen, setSideDrawer] = useState(false);

    const openSideDrawer = () => {
        setSideDrawer(true);
    }

    const closeSideDrawer = () => {
        setSideDrawer(false);
    }

    return(
            <React.Fragment>
                { isDrawerOpen ? <BackDrop  clicked={closeSideDrawer}/> : null}
                { isDrawerOpen ?
                    <SideDrawer>
                        <NavLinks/>
                    </SideDrawer> : null}
                <MainHeader>
                    <button className="main-navigation__menu-btn" onClick={openSideDrawer}>
                        <span/>
                        <span/>
                        <span/>
                    </button>
                    <h1 className="main-navigation__title">
                        <Link to="/">Your Places</Link>
                    </h1>
                    <nav className="main-navigation__header-nav">
                        <NavLinks/>
                    </nav>
                </MainHeader>
            </React.Fragment>

    )}

export default mainNav;