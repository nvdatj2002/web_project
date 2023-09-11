import { useState } from 'react';
import '../Login/style.scss'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import Information from '../../components/Information';
import callAPI from '../../API/axios'
function Login() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const onsubmit = async (data) => {
        console.log(data)
        const response = await callAPI('/api/account/login', 'POST', {
            ...data
        })
        if(response.status == 'oke'){
            const user = JSON.stringify(response.data)
            localStorage.setItem('user', user)
            navigate('/') 
        }else {
            setShow(!show)

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
                            <h2>Đăng nhập</h2>
                            <p>Đăng nhập tài khoản để nhận được nhiều ưu đãi hấp dẫn</p>
                        </div>
                    </Col>
                    <Col className='content-right'>
                        <div className='content-right-item'>
                            <div className='content-right-item-body'>

                                <Form method='POST'>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>Tài khoản</Form.Label>
                                        <Form.Control type="text"
                                            {...register("username", { required: true })}
                                            aria-invalid={errors.fullname ? "true" : "false"}
                                        />
                                        {errors?.username?.type === 'required' && <p className="text-danger" role="alert">Nhập tên tài khoản</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password" >
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control
                                            type="password" autoComplete='on'
                                            {...register("password", { required: true })}
                                            aria-invalid={errors.password ? "true" : "false"}
                                        />
                                        {errors?.password?.type === 'required' && <p className="text-danger" role="alert">Nhập mật khẩu</p>}
                                    </Form.Group>

                                    <div className='nav-forward'>
                                        <Link>Bạn chưa có tài khoản?</Link>
                                        <Link>Quên mật khẩu?</Link>
                                    </div>
                                    <div className='footer-form-login'>
                                        <Button type='submit' onClick={handleSubmit(onsubmit)}>
                                            Đăng nhập
                                        </Button>


                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>

                </Row>

            </Container>
            <Information show={show} handleClose={() => { setShow(false) }} message={"Tài khoản hoặc mật khẩu không đúng"}></Information>
        </div>
    )
}



export default Login;