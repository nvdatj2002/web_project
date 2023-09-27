import './style.scss'
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import callAPI from '../../API/axios';
import CurrencyFormat from 'react-currency-format';
import { BsCheckSquare } from 'react-icons/bs';
import { MdDeleteOutline, MdOutlineCancel } from 'react-icons/md';
import { TbFileDescription } from 'react-icons/tb'
import OrderDetail from './OrderDetails';

function ManagerOrders() {
    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState(null)
    const [status, setStatus] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [type, setType] = useState(0)
    const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        fecthAPI()
    }, [isLoad])

    const fecthAPI = async () => {
        const responseOrders = await callAPI('/api/order/getAll', 'GET')
        const responseStatus = await callAPI('/api/status/getAll', 'GET')

        setOrders(responseOrders.data)
        setStatus(responseStatus.data)
    }

    const getTotal = (orderDetails) => {
        let total = 0
        orderDetails.map((item) => {
            total += item.quantity * item.productOrder.priceSale
        })
        return total
    }
    const handelOpenEdit = (item) => {
        console.log('edit')
        setIsShow(!isShow)
        setOrder(item)
    }
    const handleTypeOrder = async (id) => {
        const response = await callAPI(`/api/order/getAll?status=${id}`, 'GET')
        setOrders(response.data)
        setType(id)
    }
    const handleCancelOrder = async (id) => {
        const response = await callAPI(`/api/order/update/${id}?status=5`, 'PUT')
        console.log(response)
        const responseOrder = await callAPI(`/api/order/getAll?status=${type}`, 'GET')
        alert('huỷ đơn hàng thành công')
        setOrders(responseOrder.data)

    }
    const handleReload = ({ action }) => {
        if (action) {
            setIsLoad(!isLoad)
        }
    }

    // component
    const ButtonAction = ({ status, item }) => {
        switch (status) {
            case 1: {
                return (
                    <>
                        <Button onClick={() => {
                            handelOpenEdit(item)
                        }} type='button' className='order-btn-action' variant="primary">Chi tiết
                        </Button>
                        <Button onClick={() => {
                            handleCancelOrder(item.id)
                        }} className='order-btn-action' variant="danger"> Huỷ đơn</Button>
                    </>
                )
            } case 2: {
                return (
                    <>
                        <Button onClick={() => {
                            handelOpenEdit(item)
                        }} type='button' className='order-btn-action' variant="primary"><TbFileDescription size={20} />
                        </Button>
                        <Button onClick={() => {
                            handleCancelOrder(item.id)
                        }} className='order-btn-action' variant="danger"> Giao hàng</Button>
                    </>
                )
            } case 3: {
                return (
                    <>
                        <Button onClick={() => {
                            handelOpenEdit(item)
                        }} type='button' className='order-btn-action' variant="primary"><TbFileDescription size={20} />
                        </Button>
                        <Button onClick={() => {
                            handleCancelOrder(item.id)
                        }} className='order-btn-action' variant="danger"> Đã nhận</Button>
                    </>
                )
            }
            default: {
                return (
                    <>
                        <Button onClick={() => {
                            handelOpenEdit(item)
                        }} type='button' className='order-btn-action' variant="primary">Chi tiết
                        </Button>

                    </>
                )
            }
        }

    }


    return (
        <section>
            <div className="title">
                <h1 className="title-text">Quản lý order</h1>
            </div>
            <div className='main'>
                <Container>
                    <Row className='header-start-body'>
                        <Col className='header-start-body-item' xl={4}>
                            <form className="" method='GET'>
                                <div className="header-search">
                                    <input onChange={(e) => {
                                        // setSearch(e.target.value)
                                    }} name='search' className="header-search--input" placeholder='Tìm kiếm...' type="text" />
                                    <Button className='btn-search' type='submit'>
                                        <BsSearch className='header-search-icon' fontSize={24} />
                                    </Button>
                                </div>
                            </form>
                        </Col>
                        <Col xl={3} className='header-start-body-item'>
                            <p className='header-start-category-title'>Sản phẩm: </p>
                            <input className='header-start-category-title--input' type='date'></input>
                        </Col>
                        <Col xl={3} className='header-start-body-item'>
                            <p className='header-start-category-title'>Sản phẩm: </p>
                            <input className='header-start-category-title--input' type='date'></input>
                        </Col>
                    </Row>
                    <Row className='order-type'>
                        <Col className='order-type-item' >
                            < Button variant={type == 0 ? 'danger' : 'outline-danger'} onClick={() => {
                                handleTypeOrder(0)
                            }}>
                                Tất cả
                            </Button>
                            {status?.map((item) => (
                                < Button key={item.id} variant={type == item.id ? 'danger' : 'outline-danger'}
                                    onClick={() => {
                                        handleTypeOrder(item.id)
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </Col>

                    </Row>
                    <Row className="table-container">
                        <Col >
                            <Table striped hover >
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên người nhận</th>
                                        <th>Địa chỉ</th>
                                        <th>Số điện thoại</th>
                                        <th>Ngày đặt</th>
                                        <th>Loại</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {orders?.map((item, index) => (

                                        <tr key={item.id} >
                                            <td>{++index}</td>
                                            <td>{item.name}</td>
                                            <td width={340}>
                                                {item.addressOrder.note},
                                                {item.addressOrder.ward},
                                                {item.addressOrder.district},
                                                {item.addressOrder.province}

                                            </td>
                                            <td>
                                                {item.phone}
                                            </td>
                                            <td>
                                                {item.dateAt}
                                            </td>
                                            <td>
                                                <CurrencyFormat value={getTotal(item.orderDetails)} displayType={'text'} thousandSeparator={true} prefix={'$'}></CurrencyFormat>
                                            </td>
                                            <td>
                                                <ButtonAction item={item} status={item.listStatusOrders[item.listStatusOrders.length - 1].status.id} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
            <OrderDetail show={isShow} handleClose={() => { setIsShow(false) }} order={order} onReload={handleReload}></OrderDetail>
        </section>
    );
}

export default ManagerOrders;