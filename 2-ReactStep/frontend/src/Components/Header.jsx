import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="header-navbar navbar navbar-with-menu navbar-fixed-top navbar-semi-dark navbar-shadow no-print reset">
            <div className="navbar-wrapper">
                <div className="navbar-container content container-fluid">
                    <div className="navbar-toggleable-sm">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link"><i className="icon-books"> Livros</i></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="Genre" className="nav-link"><i className="icon-grid"> Gêneros</i></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
