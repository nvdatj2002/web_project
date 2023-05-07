import { NavLink } from "react-router-dom";

import './style.scss'

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="container-logo">
                    <img className="container-logo-img" src=""></img>
                </div>
                <div className="container-menu">
                    <nav className="nav-menu">
                        <ul>
                            <li>
                                <NavLink to={"/"}>
                                    HOME
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/Product"}>
                                    SHOP
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/"}>
                                    BLOG
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/"}>
                                    CONTACT
                                </NavLink>
                            </li>

                        </ul>
                        <ul>
                            <li>
                                <NavLink to={"/"}>
                                    LOGIN
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/"}>
                                    REGISTER
                                </NavLink>
                            </li>
                            <li>
                                <NavLink>
                                    CART
                                </NavLink>
                            </li>
                            <li>
                                <NavLink>
                                    SEARCH
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;