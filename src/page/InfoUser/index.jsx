import './style.scss'
import { Button, Col, Container, Form, NavLink, Row } from "react-bootstrap";
import { GrEdit } from 'react-icons/gr'
import { FaUserAlt, FaClipboardList } from 'react-icons/fa'
import { AiOutlineRollback, AiOutlineBell } from 'react-icons/ai'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import callAPI from '../../API/axios';
import { useEffect } from 'react';
import Purchase from './purchase';
function InfoUser() {
    const navigate = useNavigate()
    const [view, setView] = useState('')
    const [component, setComponent] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: JSON.parse(localStorage.getItem('user'))
    }
    );


    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user'))
    )

    const onsubmit = async (data) => {
        const response = await callAPI('/api/account/update', 'PUT', {
            ...data
        })
        if (response.status == 'oke') {
            localStorage.setItem('user', JSON.stringify({ ...data }))
            alert('update thành công')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }


    return (
        <div className='login-container'>
            <div className='banner'>
            </div>
            <Container className="info-user-container">
                <Row>
                    <Col xs={3}>
                        <div className="info-user-content-left">
                            <div className="left-top">

                                <div className="left-top-body">
                                    <img className="left-top-img" src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-1/340893237_1462835367791086_5869007206923584817_n.jpg?stp=dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=754033&_nc_ohc=XmOSu8_evrkAX-QKy1-&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBcFYsi7Z7enVJgO4rIFkomUjvkGbBjEFKVe5GPA98sXg&oe=64FF7FA0" ></img>
                                    <p>
                                        {user.fullname}
                                    </p>
                                    <GrEdit></GrEdit>

                                </div>
                                <div className='footer-left-top'>
                                    <ul>
                                        <li>
                                            <FaUserAlt></FaUserAlt>
                                            <NavLink>
                                                Tài khoản của tôi
                                            </NavLink>
                                        </li>
                                        <li onClick={() => {
                                            setView('purchase')
                                        }} >
                                            <FaClipboardList></FaClipboardList>
                                            <NavLink >
                                                Đơn hàng
                                            </NavLink>
                                        </li>
                                        <li>
                                            <AiOutlineBell ></AiOutlineBell>
                                            <NavLink >
                                                Thông báo
                                            </NavLink>
                                        </li>
                                        <li>
                                            <AiOutlineRollback ></AiOutlineRollback>
                                            <button onClick={handleLogout}>
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>


                    <Col xs={9}>
                        {view == 'purchase' && <Purchase></Purchase>}
                        {view == '' &&
                            <div className='info-user-right'>


                                <div className='info-user-right-title'>
                                    <h2>
                                        Thông tin của tôi
                                    </h2>
                                    <p>Quản lí thông tin để bảo mật tài khoản</p>
                                </div>
                                <div className='info-user-content'>
                                    <Form method='POST' onSubmit={handleSubmit(onsubmit)}>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Họ và tên:</Form.Label>
                                            <Form.Control type="text" name='fullname'
                                                {...register("fullname", { required: true })}
                                                aria-invalid={errors.fullname ? "true" : "false"}
                                            />
                                            {errors?.fullname?.type === 'required' && <p className="text-danger" role="alert">Nhập họ và tên</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control type='email' name='email'
                                                {...register("email", { required: true })}
                                                aria-invalid={errors.email ? "true" : "false"} />
                                            {errors?.email?.type === 'required' && <p className="text-danger" role="alert">Nhập email</p>}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Số điện thoại:</Form.Label>
                                            <Form.Control type='text' name='phone'
                                                {...register("phone", { required: true })}
                                                aria-invalid={errors.phone ? "true" : "false"} />
                                            {errors?.phone?.type === 'required' && <p className="text-danger" role="alert">Nhập số điện thoại</p>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check className='radio-gender'
                                                reverse
                                                inline
                                                label="Nam"
                                                name="gender"
                                                type={'radio'}
                                                id={`1`}
                                                value={true}
                                                {...register("gender", { required: true })}
                                                aria-invalid={errors.gender ? "true" : "false"}
                                            />
                                            <Form.Check className='radio-gender'
                                                inline
                                                reverse
                                                value={false}
                                                label="Nữ"
                                                type={'radio'}
                                                id={`2`}
                                                name="gender"
                                                {...register("gender", { required: true })}
                                                aria-invalid={errors.gender ? "true" : "false"}
                                            />
                                            {errors?.gender?.type === 'required' && <p className="text-danger" role="alert">chọn giới tính</p>}
                                        </Form.Group>
                                        <Form.Group className='footer-form-info-user'>
                                            <Button type='submit' variant='danger'> Lưu lại</Button>
                                        </Form.Group>
                                    </Form>
                                </div>

                            </div>
                        }
                    </Col>

                </Row>
            </Container>
        </div>
    );
}

export default InfoUser;