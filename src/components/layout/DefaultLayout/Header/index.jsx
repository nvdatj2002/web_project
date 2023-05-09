import { NavLink } from "react-router-dom";
import './style.scss'
import { useState } from "react";
import { BsBag } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'

function Header() {
    const [header, setHeader] = useState(false);

    const changHeader = () => {
        console.log(window.scrollY)
        if (window.scrollY >= 100) {
            console.log("lớn hơn")
            setHeader(true);
        } else {
            setHeader(false);
        }
    }
    window.addEventListener('scroll', changHeader);

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
                            <ul className="nav-right">
                                <li>
                                    <NavLink to={"/"}>
                                        LOGIN
                                    </NavLink>
                                        <span> / </span>
                                    <NavLink to={"/"}>
                                        REGISTER
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink>
                                        <BsBag fontSize={18}/>
                                    </NavLink>
                                </li>
                                <li>
                                    <button className="bCart" >
                                        <BiSearch fontSize={18}/>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;