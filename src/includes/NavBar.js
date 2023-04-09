import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

function NavBar(props) {
    return (
        <>
            <div className="navbar navbar-expand-md navbar-light border-top-0 pl-0 pr-0">
                <div className="container">
                    <ul
                        id="menuHorizontal"
                        className="navbar-nav navbar-nav-highlight flex-wrap d-none d-xl-flex"
                    >
                        <li className="nav-item dropdown">
                            <Link to={'/'} className='navbar-nav-link'>Tổng quan</Link>
                        </li>
                        <li className="nav-item dropdown ">
                            <Link to={'#'} data-toggle='dropdown' className='navbar-nav-link dropdown-toggle'>Sản phẩm</Link>
                            <div className="dropdown-menu">
                                <Link to={'/products'} className='dropdown-item'>
                                    <i className="fal fa-cube" />
                                    Sản phẩm
                                </Link>
                                <Link to={'/categories'} className='dropdown-item'>
                                    <i className="fal fa-th-list" />
                                    Danh mục
                                </Link>
                            </div>
                        </li>
                    </ul>
                    <Sidebar/>
                </div>
            </div>

        </>
    );
}

export default NavBar;