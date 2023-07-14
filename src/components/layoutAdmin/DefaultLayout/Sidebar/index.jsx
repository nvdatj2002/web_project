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
                                <TbClipboardList className='menu-item-icon' />
                                <NavLink className={"sidebar-menu-item-nav"} to={"/manager/dashboard"}>Thống kê</NavLink>
                            </li>
                            <li className='sidebar-menu-item'>
                                <TbClipboardList className='menu-item-icon' />
                                <NavLink className={"sidebar-menu-item-nav"} to={"/manager/products"}>Danh sách sản phẩm</NavLink>
                            </li>
                            <li className='sidebar-menu-item'>
                                <TbClipboardList className='menu-item-icon' />
                                <NavLink className={"sidebar-menu-item-nav"} to={"#"}>Danh mục sản phẩm</NavLink>
                            </li>
                            <li className='sidebar-menu-item'>
                                <div className='menu-item-bodys' >
                                    <div className='menu-item-body' onClick={handel}>
                                        <TbClipboardList className='menu-item-icon' />
                                        <p className='menu-item-body-text'>Đơn hàng</p>
                                        <AiOutlineDown className='menu-item-body-icon' color='#fff' />
                                    </div>

                                    <ul className={showSubMenu ? "show sub-menu" : "sub-menu"}>
                                        <li className='sub-menu-item'>
                                            <TbClipboardList color='#fff' />
                                            <NavLink to={"#"}>Tất cả đơn hàng</NavLink>
                                        </li>
                                        <li className='sub-menu-item'>
                                            <TbClipboardList color='#fff' />
                                            <NavLink to={"#"}>Chờ xác nhận</NavLink>

                                        </li>
                                        <li className='sub-menu-item'>
                                            <TbClipboardList color='#fff' />
                                            <NavLink to={"#"}>Chờ lấy hàng</NavLink>
                                        </li>
                                        <li className='sub-menu-item'>
                                            <TbClipboardList color='#fff' />
                                            <NavLink to={"#"}>Đang giao</NavLink>
                                        </li>
                                        <li className='sub-menu-item'>
                                            <TbClipboardList color='#fff' />
                                            <NavLink to={"#"}>Đã giao</NavLink>
                                        </li>
                                        <li className='sub-menu-item'>
                                            <TbClipboardList color='#fff' />
                                            <NavLink to={"#"}>Đã huỷ</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <hr />
                    </div>
                    <div className='sidebar-footer'>
                    <p className='sidebar-footer-title'>Hệ thống</p>
                        <ul className='sidebar-menu'>
                            <li className='sidebar-menu-item'>
                                <TbClipboardList className='menu-item-icon' />
                                <NavLink className={"sidebar-menu-item-nav"} to={"#"}>Thông tin</NavLink>
                            </li>
                            <li className='sidebar-menu-item'>
                                <BiLogOut className='menu-item-icon' />
                                <NavLink className={"sidebar-menu-item-nav"} to={"#"}>Đăng xuất</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
};
export default Sidebar;