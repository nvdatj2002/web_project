import CurrencyFormat from 'react-currency-format';
import './style.scss'
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import callAPI from '../../../API/axios';

function OrderDetail({ show, handleClose, order, onReload }) {
    const getTotal = (orderDetails) => {
        if (orderDetails == null) {
            return 0;
        }
        let total = 0
        orderDetails.map((item) => {
            total += item.quantity * item.productOrder.priceSale
        })
        return total
    }
    const handelConfirmOrder = async () => {
        const response = await callAPI(`/api/order/update/${item.id}?status=2`, 'PUT')

        onReload({
            action: true
        })

    }
    const handleCancelOrder = async () => {
        const response = await callAPI(`/api/order/update/${item.id}?status=5`, 'PUT')
        onReload({
            action: true
        })
    }
    const handleSentOrder = async () => {
        const response = await callAPI(`/api/order/update/${item.id}?status=3`, 'PUT')
        onReload({
            action: true
        })
    }

    const handleReceivedOrder = async () => {
        const response = await callAPI(`/api/order/update/${item.id}?status=4`, 'PUT')
        onReload({
            action: true
        })
    }
    const ButtonAction = ({ status, item }) => {
        switch (status) {
            case 1: {
                return (
                    <>
                        <Button onClick={() => {
                            handelConfirmOrder
                        }} type='button' className='order-btn-action' variant="primary">Nhận đơn
                        </Button>
                        <Button onClick={() => {
                            handleCancelOrder(item.id)
                        }} className='order-btn-action' variant="danger"> Huỷ đơn</Button>
                        <Button onClick={() => {
                            handleClose()
                        }} className='order-btn-action' variant="danger"> Đóng</Button>
                    </>
                )
            } case 2: {
                return (
                    <>

                        <Button onClick={() => {
                            handleSentOrder
                        }} className='order-btn-action' variant="success"> Giao hàng</Button>
                        <Button onClick={() => {
                            handleClose()
                        }} type='button' className='order-btn-action' variant="danger">Đóng
                        </Button>
                    </>
                )
            } case 3: {
                return (
                    <>
                        <Button onClick={() => {
                            handleReceivedOrder
                        }} className='order-btn-action' variant="success"> Đã nhận</Button>
                        <Button onClick={() => {
                            handleClose()
                        }} type='button' className='order-btn-action' variant="danger">Đóng
                        </Button>
                    </>
                )
            }
            default: {
                return (
                    <>
                        <Button onClick={() => {
                            handleClose()
                        }} type='button' className='order-btn-action' variant="danger">Đóng
                        </Button>
                    </>
                )
            }
        }

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
                    <ButtonAction item={order} status={order?.listStatusOrders?.status?.id} />
                </Modal.Footer>

            </Modal >
        </Container>
    );
}

export default OrderDetail;