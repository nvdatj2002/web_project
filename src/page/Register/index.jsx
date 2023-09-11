import { useState } from 'react';
import './style.scss'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import callAPI from '../../API/axios';

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onsubmit = async (data) => {
        const response = await callAPI('/api/account/create', 'POST', {
            ...data
        })
        if (response.status == 'oke') {
            alert('Đăng ký thành công')
            navigate("/login")
        }
    }
    return (
        <div className='login-container'>
            <div className='banner'>
            </div>
            <Container className='login-container-body'>
                <Row className='content-login'>
                    <Col className='content-left'>
                        <div className='title'>
                            <h2>Đăng ký</h2>
                            <p>Đăng ký tài khoản để nhận được nhiều ưu đãi hấp dẫn!</p>
                        </div>
                    </Col>
                    <Col className='content-right'>
                        <div className='content-right-item'>
                            <div className='content-right-item-body'>
                                <Form >
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Họ và tên</Form.Label>
                                        <Form.Control type="text" placeholder=""
                                            {...register("fullname", { required: true })}
                                            aria-invalid={errors.fullname ? "true" : "false"} />
                                        {errors?.fullname?.type === 'required' && <p className="text-danger" role="alert">Nhập đầy đủ họ tên</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tài khoản</Form.Label>
                                        <Form.Control type="text" placeholder=""
                                            {...register("username", { required: true })}
                                            aria-invalid={errors.username ? "true" : "false"}
                                        />
                                        {errors?.username?.type === 'required' && <p className="text-danger" role="alert">Nhập tên tài khoản</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control type="password"
                                            {...register("password", { required: true })}
                                            aria-invalid={errors.password ? "true" : "false"}
                                        />
                                        {errors?.password?.type === 'required' && <p className="text-danger" role="alert">Nhập tên sản phẩm</p>}
                                    </Form.Group>
                                    <div className='nav-forward'>
                                        <Link to={'/login'}>Bạn đã có tài khoản?</Link>
                                    </div>
                                    <div className='footer-form-register'>
                                        <Button onClick={handleSubmit(onsubmit)}>
                                            Đăng ký
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}



export default Register;