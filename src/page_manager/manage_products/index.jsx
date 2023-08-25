import './style.scss'
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import axios from "axios"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../../API/axios';
function ManagerProduct() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        getAllProductAPI();
    }, [])

    const getAllProductAPI = async () => {
        const response = await callAPI("/api/product/getAll")
        console.log(response)
    }

    const removeProduct = async (id) => {

    }



    return (
        <section>
            <div className="title">
                <h1 className="title-text">Quản lý sản phẩm</h1>
            </div>
            <div className='main'>
                <div className="header-main">
                    <Container className='header-start'>
                        <form className="">
                            <Row className='header-start-body'>
                                <Col className='header-start-body-item' xl={3}>
                                    <div className="header-search">

                                        <BsSearch className='header-search-icon' fontSize={24} />
                                        <input name='search' className="header-search--input" placeholder='Tìm kiếm...' type="text" />

                                    </div>
                                </Col>
                                <Col xl={3} className='header-start-body-item'>
                                    <p className='header-start-category-title'>Loại sản phẩm</p>
                                    <select className='header-start-category' name='category'>
                                        <option>
                                            Loại sản phẩm :
                                        </option>
                                    </select>
                                </Col>
                            </Row>
                        </form>
                        <Row className='header-btn-create'>
                            <div className="header-btn-create--item" >
                                <Link to={"/manager/products/create"}>Thêm sản phẩm mới</Link>
                            </div>

                        </Row>
                        <Row className='header-start-table'>
                            <Table striped hover >
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Hình ảnh</th>
                                        <th>Tên </th>
                                        <th>Giá Nhập</th>
                                        <th>Giá Bán</th>
                                        <th>Số lượng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item) => (
                                        <tr >
                                            <td><input type='checkbox' /></td>
                                            <td><img className='image-product' src='https://myshoes.vn/image/cache/catalog/2023/nike/nk011/giay-nike-court-vision-low-nam-trang-xanh-01-500x500.jpg'></img></td>
                                            <td > <p>{item.name}</p>
                                            </td>

                                            <td>{item.priceBuy}</td>
                                            <td>{item.priceSale}</td>
                                            <td>{item.productDetail}</td>
                                            <td>
                                                <Button variant="outline-primary"><FaRegEdit /></Button>
                                                <Button variant="outline-primary"><MdDeleteOutline /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    );
}
export default ManagerProduct;