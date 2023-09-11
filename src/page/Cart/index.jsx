import { useState } from 'react';
import '../Cart/style.scss'
import Pagination from 'react-bootstrap/Pagination';
import { Button, Card, Col, Container, Form, ListGroup, NavLink, Row, Table } from "react-bootstrap";
import { useEffect } from 'react';
import callAPI from '../../API/axios';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { MdOutlineCancel } from 'react-icons/md'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../../actions/actions';
import cartSilce from '../../Reducer/cartSilce';
import CheckOutCart from '../../components/CheckoutCart';
function Cart() {
    const cart = useSelector(cartSelector)
    const dispatch = useDispatch();
    const [openCheckout, setOpenCheckout] = useState(false)


    const getAmountCart = () => {
        const amount = cart?.reduce((total, currentItem) =>
            total + currentItem.quantity * currentItem.product.priceSale
            , 0)

        return amount
    }
    const handleDetele = (index) => {
        dispatch(
            cartSilce.actions.removeItemToCart(index)
        )
    }
    const handleOpenCheckout = () => {
        setOpenCheckout(true)

    }
    console.log(cart)
    if (cart.length == 0) {
        return (
            <div>
                <div className='banner'>
                </div>
                <Container className='cart-container'>
                    <Row className='cart-no-item'>
                        <h2>Bạn chưa có sản phẩm nào</h2>
                        <Link to={'/shop'}>Mua hàng ngày</Link>
                    </Row>
                </Container>
            </div>
        )
    } else {
        return (
            <div>
                <div className='banner'>
                </div>
                <Container className='cart-container'>

                    <Row>
                        <Col className='cart-list' xs={8}>
                            <div>
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Hình ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <button onClick={() => {
                                                        handleDetele(index)
                                                    }} className='btn-delete'><MdOutlineCancel />
                                                    </button>
                                                </td>
                                                <td width={100}>
                                                    <img className='image-product' src={`http://localhost:8080/api/files/${item.product.imageProduct[0].name}`}></img>
                                                </td>
                                                <td><div className='product-name'>
                                                    <Link to={'/'}>{item?.product?.name}</Link>
                                                    <small>chọn size : {item?.size}</small>
                                                </div></td>
                                                <td >
                                                    <div className='quantity'>

                                                        <input onChange={(e) => {
                                                            dispatch(
                                                                cartSilce.actions.updateToCart(
                                                                    {
                                                                        index: index,
                                                                        quantity: e.target.value
                                                                    }
                                                                )
                                                            )
                                                        }} value={item?.quantity} type='number' min={1}>
                                                        </input>

                                                    </div>
                                                </td>
                                                <td>
                                                    <CurrencyFormat value={Number(item?.product?.priceSale)} displayType={'text'} thousandSeparator={true} />

                                                </td>
                                                <td>
                                                    <CurrencyFormat value={Number((item?.product?.priceSale) * item?.quantity)} displayType={'text'} thousandSeparator={true} />

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className='cart-list-footer'>
                                <Button variant='outline-dark' href='/shop'>
                                    <BiArrowBack></BiArrowBack> Tiếp tục mua hàng
                                </Button>
                            </div>
                        </Col>
                        <Col>
                            <div className='total-cart'>
                                <h2>Cộng giỏ hàng</h2>
                                <div className='total-cart-body'>
                                    <div className='total-cart-body-item'>
                                        <span>Tạm tính</span>
                                        <CurrencyFormat value={Number(getAmountCart())} displayType={'text'} thousandSeparator={true} />
                                    </div>
                                    <div className='total-cart-body-item'>
                                        <span>Tổng</span>
                                        <CurrencyFormat value={Number(getAmountCart())} displayType={'text'} thousandSeparator={true} />
                                    </div>
                                </div>
                                <div className='tatol-cart-footer'>
                                    <Button onClick={
                                        handleOpenCheckout
                                    } variant='danger'>
                                        Tiến hành thanh toán
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {openCheckout && < CheckOutCart />}
                </Container>
            </div>
        )
    }
}


export default Cart;