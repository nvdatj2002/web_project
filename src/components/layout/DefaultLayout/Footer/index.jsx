import './style.scss'
import zalo from '../../../../img/icons/zalo.png'
import momo from '../../../../img/icons/momo.png'
import bankking from '../../../../img/icons/bankking.png'

function Footer() {
    return (
        <footer>
            <div className="container-footer">
                <div className="footer-content">
                    <div className="footer-grid">
                        <div className="footer-profile">
                            <h3>CÔNG TY CỔ PHẦN DỊCH VỤ THƯƠNG MẠI...</h3>
                            <div className='footer-profile-content'>
                                <ul>
                                    <li>
                                        Q5-05 Đường 37 - Đô thị Vạn Phúc,
                                        Phường Hiệp Bình Phước, Thành phố Thủ Đức,
                                        Thành phố Hồ Chí Minh, Việt Nam
                                    </li>
                                    <li>
                                        1900 638083
                                    </li>
                                    <li>
                                        Giờ làm việc: 8h30 - 17Cách thức thanh toán
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="footer-support">
                            <h3>Customer Support</h3>
                            <div className='footer-support-content'>
                                <ul>
                                    <li>
                                        Bảo hành và đổi trả
                                    </li>
                                    <li>
                                        Hướng dẫn mua hàng
                                    </li><li>
                                        Chính sách giao hàng
                                    </li><li>
                                        Bảo mật thông tin
                                    </li><li>
                                        Chính sách thanh toán
                                    </li><li>
                                        Chính sách hoàn tiền
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-payment">
                            <h3>CÁCH THỨC THANH TOÁN</h3>
                            <div className='footer-payment-content'>
                                <ul>
                                    <li>
                                        <img src={zalo}></img>
                                    </li>
                                    <li>
                                        <img src={momo}></img>
                                    </li>
                                    <li>
                                        <img src={bankking}></img>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;