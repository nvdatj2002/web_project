import { useEffect, useState } from 'react';
import './style.scss'
import { Button, Col } from "react-bootstrap";
import callAPI from '../../../API/axios'
import CurrencyFormat from 'react-currency-format';
function Purchase() {
    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState([])
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const [reload, setReload] = useState(false)
    const [viewStatus, setViewStatus] = useState(0)
    useEffect(() => {
        getAllOrderAPI()
        getAllStatus()
    }, [reload])
    const getAllOrderAPI = async () => {
        const response = await callAPI(`/api/order/account/${currentUser.id}`, 'GET')

        setOrders(response.data)
    }
    const getAllStatus = async () => {
        const response = await callAPI(`/api/status/getAll`, 'GET')

        setStatus(response.data)
    }
    const getTotal = (orderDetails) => {
        let total = 0
        orderDetails.map((item) => {
            total += item.quantity * item.productOrder.priceSale
        })
        return total
    }

    const handleCanelOrder = async (id) => {
        const response = await callAPI(`/api/order/update/${id}?status=5`, 'PUT')

        setReload(!reload)
    }
    const handelGetOrderByStatus = async (id) => {
        const response = await callAPI(`/api/order/account/${currentUser.id}?status=${id}`, 'GET')

        setOrders(response.data)
        setViewStatus(id)
    }

    return (
        <Col>
            <div className="purchase-content">
                <div className="purchase-header">
                    <ul>
                        <li>
                            <Button onClick={() => {
                                handelGetOrderByStatus(0)
                            }} variant={viewStatus == 0 ? "danger" : "outline-danger"}>
                                Tất cả
                            </Button>
                        </li>
                        {status.map((item) => (
                            <li key={item.id}>
                                <Button
                                    onClick={() => {
                                        handelGetOrderByStatus(item.id)
                                    }}
                                    variant={viewStatus == item.id ? "danger" : "outline-danger"}>
                                    {item.name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                {orders?.map((item) => (
                    <div key={item.id} className="purchase-body">
                        <div className='purchase-body-top'>
                            <div className='purchase-body-top-right'>
                                <p>Lúc đặt : {item.dateAt}</p>
                            </div>
                            <div className='purchase-body-top-left'>
                                <p>Trạng thái: <span>{item?.listSaStatusOrders[item.listSaStatusOrders.length - 1].status.name}</span></p>
                            </div>
                        </div>
                        <hr />
                        {item.orderDetails.map((orderDetail) => (

                            <div key={orderDetail.id} className='purchase-body-mid'>
                                <div className='purchase-body-mid-right'>
                                    <img src={`http://localhost:8080/api/files/${orderDetail.productOrder.imageProduct[0].name
                                        }`} className='purchase-body-mid-right--image'></img>
                                    <div className='purchase-detail-product'>
                                        <p className='purchase-detail-product--name'>Tên sản phẩm: <b>{orderDetail.productOrder.name}</b></p>
                                        <p className='purchase-detail-product--type'>Size đã chọn: {orderDetail.size}</p>
                                        <p className='purchase-detail-product--type'>Số lượng: {orderDetail.quantity}</p>
                                    </div>
                                </div>
                                <div className='purchase-body-mid-left'>
                                    <p>Giá: </p>
                                    <CurrencyFormat value={(orderDetail?.productOrder?.priceSale) * 1} displayType={'text'} thousandSeparator={true} prefix={'$'} />

                                </div>
                            </div>
                        ))}
                        <div className='purchase-body-bot'>
                            <div className='purchase-body-bot--item'>
                                <p className='purchase-body-bot--item--total-price'>
                                    <CurrencyFormat value={(getTotal(item.orderDetails)) * 1} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </p>
                                <div className='purchase-body-bot-box-button'>
                                    <Button variant='outline-success'>Chi tiết</Button>

                                    {item?.listSaStatusOrders[item.listSaStatusOrders.length - 1].status.id == 1
                                        &&
                                        <Button onClick={() => {
                                            handleCanelOrder(item.id)
                                        }} variant='danger'>Huỷ</Button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Col>
    );
}

export default Purchase;