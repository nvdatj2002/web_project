import './style.scss'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoSettingsSharp } from 'react-icons/io5'
import { BsSearch } from 'react-icons/bs'
import p from '../../../../img/user.jpg'
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import {CiWarning} from 'react-icons/ci';

function Header() {
    return (
        <div className='header'>
            <div className='header-container'>
                <div className="header-left">
                    {/* <div className="header-search">
                        <form className="header-search-body">
                            <BsSearch className='header-search-icon' fontSize={24} />
                            <input name='search' className="header-search--input" placeholder='Tìm kiếm...' type="text" />
                        </form>
                    </div> */}
                </div>

                <div className="header-right">
                    <div className="header-right-container">
                        <Dropdown className="notification">
                            <Dropdown.Toggle id="dropdown-basic-button" >
                                <IoMdNotificationsOutline fontSize={18} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='notification-menu'>
                                <Dropdown.Item className='notification-item' href='#'>
                                    <AiOutlineCheckCircle className='notification-item-icon' />
                                    <span>5 Đơn hàng mới</span>
                                </Dropdown.Item>
                                <Dropdown.Item className='notification-item' href='#'>
                                    <CiWarning color='red' fontSize={18} />
                                    <span>5 sản phẩm sắp hết</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className='info'>
                            <div className='info-detail'>
                                <p className='info-detail-name'>Nông Văn Đạt </p>
                                <img className='info-detail-image' src={p} />
                            </div>
                        </div>
                        <div className='settings'>
                            <IoSettingsSharp />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

};
export default Header;