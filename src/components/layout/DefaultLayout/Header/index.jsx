import { NavLink } from "react-router-dom";
import './style.scss'
import { useState } from "react";
import { BsBag } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import Search from "../Search";
import Login from "../../../../page/Login";

function Header() {
    const [header, setHeader] = useState(false);
    const [show, setShow] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const changHeader = () => {

        if (window.scrollY >= 100) {

            setHeader(true);
        } else {
            setHeader(false);
        }
    }
    window.addEventListener('scroll', changHeader);

    const Account = () => {
        const account = JSON.parse(localStorage.getItem('user'))
       
        if (account) {
            return (
                <li>
                    <NavLink to={"/info-user"}>
                        {account.username}
                    </NavLink>

                </li>
            )
        } else {
            return (
                <li>
                    <NavLink to={"/login"}>
                        LOGIN
                    </NavLink>
                    <span> / </span>
                    <NavLink to={"/register"}>
                        REGISTER
                    </NavLink>
                </li>
            )
        }
    }

    return (
        <header className={header ? "header-active" : "header "}>
            <div className={header ? "container-header-active" : "container "}>
                <div className="content">
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
                                    <NavLink to={"/shop"}>
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
                            <ul className="nav-right">
                                <Account></Account>
                                <li>
                                    <NavLink to={"/cart"}>
                                        <BsBag fontSize={18} />
                                    </NavLink>
                                </li>
                                <li>

                                    <BiSearch className="bCart" fontSize={18} onClick={
                                        () => {
                                            setShow(!show)
                                        }} />

                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <Search show={show} handleClose={() => { setShow(false) }} placement={"end"} ></Search>

        </header>
    )
}

export default Header;