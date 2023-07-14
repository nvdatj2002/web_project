import './style.scss'
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import axios from "axios"
import { useEffect, useState } from 'react';
function ManagerProduct() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        getAllProductAPI();
    }, [])

    const getAllProductAPI = async () => {
        try {
            const path = 'http://localhost:8080/api/product/getAll';
            const reponse = await axios.get(path);
            setProducts(reponse.data)
        } catch (error) {
            console.error(error)
        }
    }

    const removeProduct = async (id) => {
        try {
            const path = `http://localhost:8080/api/product/remove/${id}`;
            const reponse = await axios.delete(path);
            console.log("xoá")
        } catch (error) {
            console.error(error)
        }
    }

    const handelDelete = (id) => {
        console.log(id);
        const productsNew = products.filter(item => item.id != id);
        setProducts(productsNew);
        removeProduct(id);
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

                        <Row className='header-start-table'>
                            <Table striped hover >
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Hình ảnh</th>
                                        <th>Tên </th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr >
                                            <td><input type='checkbox'/></td>
                                            <td><img className='image-product' src='https://myshoes.vn/image/cache/catalog/2023/nike/nk011/giay-nike-court-vision-low-nam-trang-xanh-01-500x500.jpg'></img></td>
                                            <td > <p>Giày Nike Air Max Command Nam - Xám Xanh</p>
                                            </td>

                                            <td>3.000.000</td>
                                            <td>2000</td>
                                            <td>
                                                <Button  variant="outline-primary"><FaRegEdit /></Button>
                                                <Button  variant="outline-primary"><MdDeleteOutline /></Button>
                                            </td>
                                        </tr>
                                    
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