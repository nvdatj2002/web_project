import { Col, Container, Row } from 'react-bootstrap';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillBarChartFill } from 'react-icons/bs';
import { HiClipboardList } from 'react-icons/hi';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import p1 from './../../img/product/p2.jpg';
import {CgNotes} from 'react-icons/cg'

function Dashboard() {
    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        datasets: [{
            label: 'Doanh thu năm 2023',
            data: [12, 19, 3, 5, 2, 3],

        }]
    }
    const data2 = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        datasets: [{
            label: 'Lượng người truy cập',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ["#fff"],
            borderColor: '#FF6384',
        }]
    }
    return (
        <div className='dashboard'>
            <Container >
                <h2 className='title'>Over view</h2>
                <Row className='start-cards'>
                    <Col className='start-cards-items' xl={3}>
                        <div className='card-item-body'>
                            <div className='card-icon'>
                                <BsFillBarChartFill color='#2f49d1' className='card-icon-item' />
                            </div>
                            <div className='card-info'>
                                <p>175.000.000</p>
                                <p>Doanh thu</p>
                                <p>Tháng trước</p>
                            </div>
                        </div>
                    </Col>
                    <Col className='start-cards-items' xl={3}>
                        <div className='card-item-body'>
                            <div className='card-icon'>
                                <HiClipboardList color='#ffb648' className='card-icon-item' />
                            </div>
                            <div className='card-info'>
                                <p>15.405</p>
                                <p>Đơn hàng</p>
                                <p>Tháng trước</p>
                            </div>
                        </div>
                    </Col>
                    <Col className='start-cards-items' xl={3}>
                        <div className='card-item-body'>
                            <div className='card-icon '>
                                <CgNotes color='green' className='card-icon-item' />
                            </div>
                            <div className='card-info'>
                                <p>175.000.000</p>
                                <p>Doanh thu</p>
                                <p>Tháng trước</p>
                            </div>
                        </div>
                    </Col>
                    <Col className='start-cards-items' xl={3}>
                        <div className='card-item-body'>
                            <div className='card-icon'>
                                <BsFillBarChartFill color='#4bde97' className='card-icon-item' />
                            </div>
                            <div className='card-info'>
                                <p>175.000.000</p>
                                <p>Doanh thu</p>
                                <p>Tháng trước</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={9} >
                        <div className='container-chart'>
                            <Bar data={data} className='chart' />
                        </div>
                        <div className='container-table'>
                            <h2>Sản phẩm bán chạy nhất</h2>
                            <div className='table-content'>
                                <table className='table-product'>
                                    <thead >
                                        <tr>
                                            <th>
                                                Sản phẩm
                                            </th>
                                            <th>
                                                Đã bán
                                            </th>
                                            <th>
                                                Giá
                                            </th>
                                            <th>
                                                Loại
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img className='image-product' src={p1} alt="" />
                                                <p>
                                                    Giày Nike Court Vision Low Nam - Trắng Xanh
                                                </p>

                                            </td>
                                            <td>
                                                600
                                            </td>
                                            <td>
                                                3.500.000
                                            </td>
                                            <td>
                                                NIKE
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img className='image-product' src={p1} alt="" />
                                                <p>
                                                    Giày Nike Court Vision Low Nam - Trắng Xanh
                                                </p>

                                            </td>
                                            <td>
                                                600
                                            </td>
                                            <td>
                                                3.500.000
                                            </td>
                                            <td>
                                                NIKE
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img className='image-product' src={p1} alt="" />
                                                <p>
                                                    Giày Nike Court Vision Low Nam - Trắng Xanh
                                                </p>

                                            </td>
                                            <td>
                                                600
                                            </td>
                                            <td>
                                                3.500.000
                                            </td>
                                            <td>
                                                NIKE
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} className=''>
                        <div className='chart-left'>
                            <Line data={data2} />
                        </div>
                        <div className='categories'>
                            <div className='category-title'>
                                <h3>Top loại bán chạy</h3>
                                <p></p>
                            </div>
                            <div className='categories-body'>
                                <div className='categories-item'>
                                    <ul className='categories-list'>
                                        <li className='categories-list-item'>
                                            <p>NIKE</p>
                                            <p>27.000.00</p>
                                        </li>
                                        <li className='categories-list-item'>
                                            <p>ADDIDAS</p>
                                            <p>27.000.00</p>
                                        </li>
                                        <li className='categories-list-item'>
                                            <p>NIKE</p>
                                            <p>27.000.00</p>
                                        </li>
                                        <li className='categories-list-item'>
                                            <p>NIKE</p>
                                            <p>27.000.00</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='categories'>
                            <div className='category-title'>
                                <h3>Top loại bán chạy</h3>
                                <p></p>
                            </div>
                            <div className='categories-body'>
                                <div className='categories-item'>
                                    <ul className='categories-list'>
                                        <li className='categories-list-item'>
                                            <p>NIKE</p>
                                            <p>27.000.00</p>
                                        </li>
                                        <li className='categories-list-item'>
                                            <p>ADDIDAS</p>
                                            <p>27.000.00</p>
                                        </li>
                                        <li className='categories-list-item'>
                                            <p>NIKE</p>
                                            <p>27.000.00</p>
                                        </li>
                                        <li className='categories-list-item'>
                                            <p>NIKE</p>
                                            <p>27.000.00</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>


    );
}
export default Dashboard;