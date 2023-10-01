import { Link, NavLink } from "react-router-dom";
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
        <header className={header ? "header-active" : "header"}>
            <div className={header ? "container-header-active" : "container-header"}>
                <div className="content-top">
                    <div className="content-top-body">
                        <div className="content-top-left">
                            <p>
                                Authentic Shoes - Nhà sưu tầm và phân phối chính hãng các thương hiệu thời trang quốc tế hàng đầu Việt Nam
                            </p>
                        </div>
                        <div className="content-top-right">
                            <Link to={'/login'}>
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-logo">
                        <img className="container-logo-img" src=""></img>
                    </div>
                    <div className="container-menu">
                        <nav className="nav-forward">
                            <ul className="nav-forward-item">
                                <li >
                                    <NavLink to={"/"}>
                                        Trang chủ
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
                                <li>
                                    <NavLink to={"/"}>
                                        Tin tức
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/"}>
                                        Liên hệ
                                    </NavLink>
                                </li>

                            </ul>

                        </nav>
                    </div>
                    <div className="option">
                        <ul className="nav-option">

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
            </div>
            <Search className="bCart" show={show} handleClose={() => { setShow(false) }} placement={"end"} ></Search>

        </header>
    )
}

export default Header;