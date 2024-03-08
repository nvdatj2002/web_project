import { Link, NavLink } from "react-router-dom";
import './style.scss'
import { useState } from "react";
import { BsBag } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import { FaRegUser } from "react-icons/fa";
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
    // window.addEventListener('scroll', changHeader);

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
        <header className={"header"}>
            <div className="header-container">
                <div className="header-left">
                    <NavLink to={"/"}>
                        Trang chủ
                    </NavLink>
                </div>
                <div className="header-mid">
                    <nav className="nav-forward">
                        <ul className="nav-forward-item">
                            <li >
                                <NavLink to={"/"}>
                                    Sản phẩm mới
                                </NavLink>

                            </li>
                            <li className="shop">
                                <NavLink to={"/shop"}>
                                    <span>Sản phẩm của chúng tôi</span>
                                    <div className="menu-item">
                                        <ul>
                                            <li>
                                                Giày Nike
                                            </li>
                                            <li>
                                                Giày Adidas
                                            </li>
                                            <li>
                                                Giày Puma
                                            </li>
                                        </ul>
                                    </div>
                                </NavLink>
                            </li>
                            <li >
                                <NavLink to={"/"}>
                                    Bộ sưu tập
                                </NavLink>

                            </li>
                            <li >
                                <NavLink to={"/"}>
                                    Thông báo
                                </NavLink>

                            </li>
                        </ul>

                    </nav>
                </div>
                <div className="header-right">
                    <ul className="nav-option">
                        <li>
                            <FaRegUser fontSize={18} />
                        </li>
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
                </div>


            </div>
            
         

            <Search className="bCart" show={show} handleClose={() => { setShow(false) }} placement={"end"} ></Search>

        </header>
    )
}

export default Header;