import './style.scss'
import { NavLink } from 'react-router-dom';
import { AiOutlineDown } from 'react-icons/ai'
import { TbClipboardList } from 'react-icons/tb'
import { BiLogOut } from 'react-icons/bi'
import { useState } from 'react';
function Sidebar() {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const handel = () => {
        setShowSubMenu(!showSubMenu)
    }

    return (
        <aside className='sidebar'>
            <div className='container-sidebar'>
                <div className='sidebar-start'>
                    <a href='#' className='sidebar-top'>
                        <span className='logo'></span>
                        <div className='logo-text'>
                            <span className='logo-title'>ĐạtShop</span>
                            <span  >Dashboard</span>
                        </div>
                    </a>
                    <div className='sidebar-body'>
                        <ul className='sidebar-menu'>
                            <li className='sidebar-menu-item'>

                                <NavLink className={"sidebar-menu-item-nav"} to={"/manager/dashboard"}>
                                    <TbClipboardList className='menu-item-icon' />
                                    Thống kê</NavLink>
                            </li>
                            <li className='sidebar-menu-item'>
                                
                                <NavLink className={"sidebar-menu-item-nav"} to={"/manager/products"}>
                                <TbClipboardList className='menu-item-icon' />
                                    Quản lý sản phẩm</NavLink>
                            </li>
                            <li className='sidebar-menu-item'>
                                <NavLink className={"sidebar-menu-item-nav"} to={"/manager/categories"}>
                                <TbClipboardList className='menu-item-icon' />
                                    
                                    Danh mục </NavLink>
                            </li>
                            <li className='sidebar-menu-item'>
                                <NavLink className={"sidebar-menu-item-nav"} to={"/manager/orders"}>
                                <TbClipboardList className='menu-item-icon' />
                                    Quản lý đơn hàng</NavLink>
                            </li>
                            <li className='sidebar-menu-item'>
                                <NavLink className={"sidebar-menu-item-nav"} to={"/manager/orders"}>
                                <TbClipboardList className='menu-item-icon' />
                                    Quản lý tài khoản</NavLink>
                            </li>
                        </ul>
                        <hr />
                    </div>
                    <div className='sidebar-footer'>
                        <p className='sidebar-footer-title'>Hệ thống</p>
                        <ul className='sidebar-menu'>
                            <li className='sidebar-menu-item'>
                                <TbClipboardList className='menu-item-icon' />
                                <NavLink className={"sidebar-menu-item-nav"} to={"/profile"}>Thông tin</NavLink>
                            </li>
                            <li className='sidebar-menu-item'>
                                <BiLogOut className='menu-item-icon' />
                                <NavLink className={"sidebar-menu-item-nav"} to={"logout#"}>Đăng xuất</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
};
export default Sidebar;