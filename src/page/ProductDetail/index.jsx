import { useEffect, useState } from 'react';
import './style.scss'
import { Button, Tab, Tabs, Col, Container, Form, Row, Card, Carousel } from "react-bootstrap";
import CurrencyFormat from 'react-currency-format';
import { useParams } from 'react-router-dom';
import callAPI from '../../API/axios';
import cartSilce from '../../Reducer/cartSilce';
import { useDispatch } from 'react-redux';



function ProductDetailUser() {
    const [product, setProduct] = useState()
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [productAdd, setProductAdd] = useState({});
    const { id } = useParams()
    const dispatch = useDispatch();


    const getProductAPI = async () => {
        const response = await callAPI(`/api/product/detail/${id}`, 'GET')
        if (response.status == 'oke') {
            setProduct(response.data)
            console.log('success')
        }
    }

    useEffect(() => {
        getProductAPI()
    }, [])


    const handleSize = (e) => {
        let value = e.target.value
        setSize(value)
    }
    const handlePay = (e) => {
        e.preventDefault()
        if (size == null) {
            alert('Bạn cần chọn size')
            return;
        }


    }
    const handleAddCart = (e) => {
        e.preventDefault()

        if (size == null) {
            alert('Bạn cần chọn size')
            return;
        }

        dispatch(
            cartSilce.actions.addToCart({
                id: crypto.randomUUID(),
                product: product,
                size: size,
                quantity: quantity
            })
        )

    }
    return (
        <div className='product-detail-body'>
            <div className='banner'>
            </div>
            <Container className="detail-product-container">
                <Row className='detail-product-container-box'>
                    <Col className='product-detail-content'>

                        <Carousel variant='danger' >
                            {product?.imageProduct?.map((image) => (
                                <Carousel.Item key={image.id}>
                                    <div className='image-detail'>
                                        <img className="image-title-item" src={`http://localhost:8080/api/files/${image.name}`} >
                                        </img>
                                    </div>

                                </Carousel.Item>
                            ))}
                        </Carousel>

                    </Col>
                    <Col>
                        <div className="detail-product-right">
                            <Form action='' method=''>
                                <div className='product-right-body'>
                                    <h1>{product?.name}</h1>
                                    <p className='product-price'>
                                        <b>Giá:</b> <CurrencyFormat value={Number(product?.priceSale)} displayType={'text'} thousandSeparator={true} />
                                    </p>
                                    <div className='product-right-box--size'>
                                        <p>
                                            <b>Chọn kích thước: </b>
                                        </p>
                                        {/* <div>
                                            <ButtonGroup size='lg' bsPrefix='size-group'
                                                className="me-5" aria-label="size-group">
                                                {
                                                    product?.productDetails?.map((item) => (
                                                        <Button value={item.size} key={item.id}>{item.size}</Button>
                                                    ))
                                                }

                                            </ButtonGroup>

                                        </div> */}
                                        <div className='size-product'>
                                            {
                                                product?.productDetails?.map((item) => (
                                                    <Form.Check key={item.id} type={'radio'} id={`check-api-radio`} >
                                                        <Form.Check.Input type={'radio'} onChange={handleSize} hidden name='size' id={item.size} value={item.size}
                                                        />
                                                        <Form.Check.Label className={size == item.size ? 'activeSize label-size' : 'label-size'} htmlFor={item.size}>{item.size}</Form.Check.Label>

                                                    </Form.Check>
                                                ))}
                                        </div>
                                    </div>
                                    <Form.Label htmlFor="quantity">Số lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="quantity"
                                        aria-describedby="quantity"
                                        name='quantity'
                                        min={1}
                                        defaultValue={1}
                                        onChange={(e) => {
                                            setQuantity(e.target.value)
                                        }}
                                    />
                                    <div>
                                        <p><b>Khuyễn mãi: </b></p>
                                        <p>Giày Nike Air Jordan 1 Low là một trong những dòng giày sneaker
                                            nổi tiếng nhất của thương hiệu Jordan, một mẫu giày mà mỗi khi
                                            xuất hiện luôn tạo ra cơn sốt trên toàn cầu, một mẫu giày huyện
                                            thoại của biết bao nhiêu thế hệ.</p>
                                    </div>
                                    <div className='footer-detail-product'>
                                        <Button variant="danger" onClick={handlePay} type='submit' className='footer--btn'>Mua ngay</Button>
                                        <Button variant="danger" onClick={handleAddCart} className='footer--btn'>Thêm vào giỏ hàng</Button>
                                        <Button variant="danger" className='footer--btn'>Trả góp</Button>
                                    </div>
                                </div>
                            </Form>

                        </div>

                    </Col>
                </Row>
                <Row className='description-area'>
                    <Tabs
                        defaultActiveKey="description"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="description" title="Mô tả sản phẩm">
                            <p>
                                Giày Nike Air Jordan 1 Low là một trong những dòng giày sneaker
                                nổi tiếng nhất của thương hiệu Jordan, một mẫu giày mà mỗi khi
                                xuất hiện luôn tạo ra cơn sốt trên toàn cầu, một mẫu giày huyện
                                thoại của biết bao nhiêu thế hệ.
                            </p>
                        </Tab>

                    </Tabs>
                </Row>
                <Row className='product-area'>
                    <div className='product-title'>
                        <h2>
                            Sản phẩm tương tự
                        </h2>
                    </div>
                    <Col xs={3} className='product-item' >
                        <Card >
                            <Card.Img variant="top" src={`http://localhost:8080/api/files/59ead53c357443a2b58a567326b61e4f.jpeg`} />
                            <Card.Body>
                                <div className='card-content'>
                                    <span>GIÀY SNEAKER</span>
                                    <Card.Title>Giày Nike Air Force 1 07 Triple White CW2288-111</Card.Title>
                                    <Card.Text>
                                        <CurrencyFormat value={Number(2000000)} displayType={'text'} thousandSeparator={true} />

                                    </Card.Text>
                                </div>
                                <Button href={`/shop/product-detail/`} variant="primary">Xem thêm</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={3} className='product-item' >
                        <Card >
                            <Card.Img variant="top" src={`http://localhost:8080/api/files/59ead53c357443a2b58a567326b61e4f.jpeg`} />
                            <Card.Body>
                                <div className='card-content'>
                                    <span>GIÀY SNEAKER</span>
                                    <Card.Title>Giày Nike Air Force 1 07 Triple White CW2288-111</Card.Title>
                                    <Card.Text>
                                        <CurrencyFormat value={Number(2000000)} displayType={'text'} thousandSeparator={true} />

                                    </Card.Text>
                                </div>
                                <Button href={`/shop/product-detail/`} variant="primary">Xem thêm</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={3} className='product-item' >
                        <Card >
                            <Card.Img variant="top" src={`http://localhost:8080/api/files/59ead53c357443a2b58a567326b61e4f.jpeg`} />
                            <Card.Body>
                                <div className='card-content'>
                                    <span>GIÀY SNEAKER</span>
                                    <Card.Title>Giày Nike Air Force 1 07 Triple White CW2288-111</Card.Title>
                                    <Card.Text>
                                        <CurrencyFormat value={Number(2000000)} displayType={'text'} thousandSeparator={true} />

                                    </Card.Text>
                                </div>
                                <Button href={`/shop/product-detail/`} variant="primary">Xem thêm</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={3} className='product-item' >
                        <Card >
                            <Card.Img variant="top" src={`http://localhost:8080/api/files/59ead53c357443a2b58a567326b61e4f.jpeg`} />
                            <Card.Body>
                                <div className='card-content'>
                                    <span>GIÀY SNEAKER</span>
                                    <Card.Title>Giày Nike Air Force 1 07 Triple White CW2288-111</Card.Title>
                                    <Card.Text>
                                        <CurrencyFormat value={Number(2000000)} displayType={'text'} thousandSeparator={true} />

                                    </Card.Text>
                                </div>
                                <Button href={`/shop/product-detail/`} variant="primary">Xem thêm</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default ProductDetailUser;