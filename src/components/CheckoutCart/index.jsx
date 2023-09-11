import { useEffect, useState } from 'react';
import './style.scss'
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from 'axios';
import { useController, useForm } from 'react-hook-form';
import callAPI from '../../API/axios'
import { cartSelector } from '../../actions/actions';
import { useSelector } from 'react-redux';

function CheckOutCart() {
    const [p, setP] = useState('')
    const [d, setD] = useState('')
    const [w, setW] = useState('')
    const [provinces, setProvines] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [isProvincesError, setIsProvincesError] = useState(false)
    const [isDistrictsError, setIsDistrictsError] = useState(false)
    const [isWardsError, setIsWardsError] = useState(false)
    const [note, setNote] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const cart = useSelector(cartSelector)
    let orderDetailsSave = []
    useEffect(() => {
        fetchProvices()
    }, [])

    const fetchProvices = async () => {
        const response = await axios.get('https://provinces.open-api.vn/api/?depth=3')
        if (response.status === 200) {
            setProvines(response.data)
        }
    }
    const handleOnchangeProvices = (e) => {
        let value = e.target.value
        if (value == '') {
            setIsProvincesError(true)
            setDistricts([])
            setWards([])
            setP('')
        } else {
            const findDistrictByProvices = provinces.find(item => item.code == value)

            setDistricts(findDistrictByProvices.districts)
            setIsProvincesError(false)
            setP(findDistrictByProvices.name)

        }

    }
    const handleOnchangeDistrict = (e) => {
        let value = e.target.value
        if (value == '') {
            setIsDistrictsError(true)
            setWards([])
            setD('')
        } else {
            const wardNew = districts.find(item => item.code == value)

            setWards(wardNew.wards)
            setIsDistrictsError(false)
            setD(wardNew.name)
        }
    }

    const handleOnchangeWard = (e) => {
        let value = e.target.value
        if (value == '') {
            setIsWardsError(true)
            setWards([])
            setD('')
        } else {
            const ward = wards.find(item => item.code == value)
            setIsWardsError(false)
            setW(ward.name)
        }
    }

    const onSubmit = async (data) => {
        if (p == '') {
            setIsProvincesError(true)
            return;
        } if (d == '') {
            setIsDistrictsError(true)
            return;
        } if (w == '') {
            setIsWardsError(true)
            return;
        }
  
        cart.forEach(item => {
            const detail = {
                productOrder: {
                    id: item.product.id
                },
                quantity: item.quantity,
                size: item.size
            }
            orderDetailsSave.push(detail)
        })
        const user = JSON.parse(localStorage.getItem('user'))
        const order = {
            ...data,
            addressOrder: {
                province: p,
                district: d,
                ward: w,
                note: note
            },
            orderDetails: orderDetailsSave,
            accountOrders: {
                id: user.id
            }
        }

        const response = await callAPI('/api/order/create', 'POST', {
            ...order
        })

        if(response.status == 'oke'){
            localStorage.removeItem('carts')
            window.location.reload(true);
            alert('đặt hàng thành công')
        }
    }
    return (
        <Row className='checkout-cart'>
            <Col>
                <div>
                    <h2>Tiếp tục thanh toán</h2>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Tên người nhận</Form.Label>
                            <Form.Control type="name" placeholder="Nhập vào" name='name'
                                {...register("name", { required: true })}
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            {errors?.name?.type === 'required' && <p className="text-danger" role="alert">Nhập họ và tên</p>}
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Số điện thoại người nhận</Form.Label>
                            <Form.Control type="phone" placeholder="Nhập vào"
                                {...register("phone", { required: true })}
                                aria-invalid={errors.phone ? "true" : "false"} />
                            {errors?.phone?.type === 'required' && <p className="text-danger" role="alert">Nhập số điện thoại</p>}

                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group className="select-address" as={Col} controlId="formGridState">
                            <Form.Label>Tỉnh</Form.Label>
                            <Form.Select name='province'
                                onChange={handleOnchangeProvices}
                            >
                                <option value={''}>---- Tỉnh/ Thành phố ----</option>
                                {provinces?.map((item) => (
                                    <option value={item.code} key={item.code} >{item.name}</option>
                                ))}
                            </Form.Select>
                            {isProvincesError && <p className="text-danger" role="alert">Bạn cần chọn thành phố</p>}
                        </Form.Group>

                        <Form.Group className="select-address" as={Col} controlId="formGridState">
                            <Form.Label>Huyện</Form.Label>
                            <Form.Select name='district' onChange={handleOnchangeDistrict}

                            >
                                <option value={''}>---- Quận/Huyện ----</option>
                                {districts?.map((item) => (
                                    <option key={item.code} value={item.code} >{item.name}</option>
                                ))}
                            </Form.Select>
                            {isDistrictsError && <p className="text-danger" role="alert">Bạn cần chọn quận huyện</p>}

                        </Form.Group>

                        <Form.Group className="select-address" as={Col} controlId="formGridState">
                            <Form.Label>Phường/xã</Form.Label>
                            <Form.Select name='ward' onChange={handleOnchangeWard}
                            >
                                <option value={''}>---- Phường/xã ----</option>
                                {wards?.map((item) => (
                                    <option key={item.code} value={item.code} >{item.name}</option>
                                ))}
                            </Form.Select>
                            {isWardsError && <p className="text-danger" role="alert">Bạn cần chọn quận huyện</p>}
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" >
                        <Form.Label>Địa chỉ chi tiết <i>(bạn cần ghi rõ để người giao hàng dễ dàng đến đúng vị trị của bạn)</i></Form.Label>
                        <Form.Control onChange={(e) => {
                            setNote(e.target.value)
                        }}
                            name='detailAddress' as='textarea' placeholder="Ví dụ: 123 Nguyễn khuyến" />
                    </Form.Group>


                    <Button className='btn-submit-checkout' variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

export default CheckOutCart;