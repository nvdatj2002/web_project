import { useState } from 'react';
import '../Products/style.scss'
import Pagination from 'react-bootstrap/Pagination';
import { Button, Card, Col, Container, Form, ListGroup, NavLink, Row } from "react-bootstrap";
import { useEffect } from 'react';
import callAPI from '../../API/axios';
import { useParams, useSearchParams } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

function Product() {
    const [products, setProduct] = useState([])
    const [categories, setCategories] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    const [category, setCategory] = useState()
    let [searchParams] = useSearchParams('');
    let keywords = searchParams.get('keyword')
    const [page, setPage] = useState(1)
    let limit = 1;


    useEffect(() => {
        fecthAPI();
    }, [isLoad])
    const fecthAPI = async () => {
        if (keywords == null) {
            const response = await callAPI(`/api/product/getAll`, 'GET')
            if (response.status == 'oke') {
                setProduct(response.data)
            }
        } else {
            const response = await callAPI(`/api/product/getAll?search=${keywords}`, 'GET')
            if (response.status == 'oke') {
                setProduct(response.data)
            }
        }
        const responseCategory = await callAPI(`/api/category/getAll`, 'GET')
        setCategories(responseCategory.data)
    }
    const handleCategory = async (idC) => {
        if (keywords != null) {
            const response = await callAPI(`/api/product/category/${idC}?search=${keywords}`, 'GET')
            setProduct(response.data)
            setCategory(idC)
        } else {
            const response = await callAPI(`/api/product/category/${idC}`, 'GET')
            setProduct(response.data)
            setCategory(idC)
        }
    }

    let items = [];
    for (let number = 1; number <= products.length / limit; number++) {
        items.push(
            <Pagination.Item
                onClick={() => {
                    setPage(number);
                }}
                key={number}
                active={number === page}
            >
                {number}
            </Pagination.Item>
        );
    }
    return (
        <div>
            <div className='banner'>
            </div>
            <Container className='product-container'>
                <Row className="header-product">
                    <Col className="header-product-container">
                        <div className="header-product-box">
                            <h3 className="header-product-box--search">
                                Tìm kiếm : {keywords !== null && keywords}
                            </h3>
                        </div>
                        <div className='header-product-box--select'>
                            <p>Hiển thị kết quả cho: </p>
                            <Form.Select aria-label="Default select example">
                                <option value="1">Mới nhất</option>
                                <option value="2">Giá giảm dần</option>
                                <option value="3">Giá tăng dần </option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>
                <Row className='product-content'>
                    <Col xs={3}>
                        <div className='sibar-category'>
                            <ListGroup>
                                <ListGroup.Item active onClick={() => {
                                    setIsLoad(!isLoad)
                                }} action >Tất cả</ListGroup.Item>
                                {categories.map((item) => (
                                    <ListGroup.Item onClick={() => {
                                        handleCategory(item.id)
                                    }}
                                        key={item.id} action>{item.name}</ListGroup.Item>
                                ))}

                            </ListGroup>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Row >
                            {products.map((item) => (
                                <Col key={item.id} xs={3} className='product-item' >
                                    <Card >
                                        <Card.Img variant="top" src={`http://localhost:8080/api/files/${item?.imageProduct[0]?.name}`} />
                                        <Card.Body>
                                            <div className='card-content'>
                                                <span>{item.category.name}</span>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Text>
                                                    <CurrencyFormat value={Number(item.priceSale)} displayType={'text'} thousandSeparator={true} />

                                                </Card.Text>
                                            </div>
                                            <Button href={`/shop/product-detail/${item.id}`} variant="primary">Xem thêm</Button>
                                        </Card.Body>


                                    </Card>
                                </Col>
                            ))}
                            <div className='pagination-container'>
                                <Pagination size="lg">{items}</Pagination>
                            </div>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Product;