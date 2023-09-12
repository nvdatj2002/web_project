import CurrencyFormat from 'react-currency-format';
import './style.scss'
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";

function OrderDetail({ show, handleClose, order }) {
    const getTotal = (orderDetails) => {
        if(orderDetails == null){
            return 0;
        }
        let total = 0
        orderDetails.map((item) => {
            total += item.quantity * item.productOrder.priceSale
        })
        return total
    }
    return (
        <Container>
            <Modal
                show={show}
                onHide={handleClose}

                keyboard={false}
                animation={true}
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng: {order?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='content-top'>
                        <Col>
                            <div>
                                <p><b>Thông tin tài khoản đặt hàng:</b></p>
                                <p>Tên: {order?.accountOrders.fullname}</p>
                                <p>Số điện thoại: {order?.accountOrders.phone}</p>
                                <p>Email: {order?.accountOrders.email}</p>

                            </div>


                        </Col>
                        <Col>
                            <div>
                                <p><b>Thông tin Người nhận hàng:</b></p>
                                <p>Tên : {order?.name}</p>
                                <p>Số điện thoại : {order?.phone}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className='content-top'>
                        <Col>
                            <div>
                                <p><b>Thông tin đơn hàng</b></p>
                                <p>Ngày đặt: {order?.dateAt}</p>
                                <p>Địa chỉ: {order?.addressOrder.note},{" " + order?.addressOrder.ward},
                                    {" " + order?.addressOrder.district},{" " + order?.addressOrder.province}
                                </p>
                                <p><b>{"Tổng Tiền: "} </b>
                                    <CurrencyFormat value={getTotal(order?.orderDetails)} displayType={'text'} thousandSeparator={true} prefix={'$'}></CurrencyFormat>
                                </p>
                            </div>
                        </Col>

                    </Row>
                    <Row className='content-bot'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>

                                    <th>Size </th>
                                    <th>Giá</th>
                                    <th>Số lượng </th>
                                    <th>thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.orderDetails.map((item) => (
                                    <tr key={item?.id}>
                                        <td>{item?.productOrder?.id}</td>
                                        <td>
                                            <img className="order-detail-image" src={`http://localhost:8080/api/files/${item?.productOrder.imageProduct[0]?.name}`}></img>
                                            <div>{item?.productOrder?.name}</div>
                                        </td>

                                        <td>{item?.size}</td>
                                        <td>{item?.productOrder.priceSale}</td>
                                        <td>{item?.quantity}</td>
                                        <td>{item?.quantity * item?.productOrder.priceSale}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-submit-order-detail' type='submit' variant="success">Lưu lại</Button>
                    <Button className='btn-submit-order-detail' variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal >
        </Container>
    );
}

export default OrderDetail;