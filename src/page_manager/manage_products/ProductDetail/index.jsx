import { Container } from 'react-bootstrap';
import './style.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { RiImageAddLine } from 'react-icons/ri'
import { MdDeleteOutline } from 'react-icons/md'
import { useForm, useController } from 'react-hook-form';
import callAPI from '../../../API/axios';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formartDate } from '../../../Helper/helper';

function ProductDetail() {
    const [size, setSize] = useState('')

    const [quantity, setQuantity] = useState('')
    const [rows, setRows] = useState([])
    const [productDetail, setProductDetail] = useState({})
    const [imageSave, setImageSave] = useState([])
    const [imageNew, setImageNew] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})
    const [product, setProduct] = useState({})
   
    const form = useForm({
        defaultValues: async () => {
            const response = await callAPI(`/api/product/detail/${id}`, "GET");
            const p = response.data
            p.category = p.category.id
            return {
                ...p
            }
        }
    })

    const { register, handleSubmit, control, reset, formState: { errors } } = form

    const { field } = useController({ name: 'category', control })

    const navigate = useNavigate()


    const { id } = useParams()
    // call category
    useEffect(() => {
        fetchAPI()
    }, [])


    const fetchAPI = async () => {
        const response = await callAPI(`/api/product/detail/${id}`, "GET");
        const responseC = await callAPI("/api/category/getAll", "GET");
        if (responseC) {
            setCategories(responseC.data)
        }
        if (response) {
            setProduct(response.data)
        }
    }

    const handelAddRow = async () => {

        if (size == '') {
            alert('Nhập đầy đủ thông tin phân loại')
            return;
        } else if (quantity == '') {
            alert('Nhập đầy đủ thông tin phân loại')
            return;
        }

        const data = {
            size: size,
            quantity: quantity
        }

        const response = await callAPI(`/api/product/product-detail?idProduct=${id}`, "POST", data);
        if (response.status == 'oke') {
            const responseProduct = await callAPI(`/api/product/detail/${id}`, "GET");
            setProduct(responseProduct.data)
        }
        setSize('')

        setQuantity('')
    }

    const handelImage = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData();
        formData.append(
            'file',
            file,
            file.name
        )
        const response = await callAPI(
            `/api/fileUpload?idProduct=${product.id}`, 'uploadFile', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        console.log(response);
        if (response.status == 'ok') {
            const response = await callAPI(`/api/product/detail/${id}`, "GET");
            setProduct(response.data)
        } else {
            alert("Tải ảnh lỗi")
        }
    }


    const handelDeleteImage = async (idImage) => {
        const response = await callAPI(`/api/image/delete/${idImage}`, "DELETE")

        const responseProduct = await callAPI(`/api/product/detail/${id}`, "GET");
        setProduct(responseProduct.data)
    }

    const handelDeleteRow = async (idProductDetail) => {
        const response = await callAPI(`/api/product/product-detail/delete/${idProductDetail}`, "DELETE")

        const responseProduct = await callAPI(`/api/product/detail/${id}`, "GET");
        setProduct(responseProduct.data)
    }

    const onSubmit = async (data) => {
        if (data.imageProduct.length == 0) {
            alert("Cần chọn ít nhất 1 ảnh")
            return;
        }
        if (data.productDetails.length == 0) {
            alert("Bạn cần phân loại cho sản phẩm")
            return;
        }
        const productSave = {
            ...data,
            category: {
                id: data.category
            },
            imageProduct: product.imageProduct,
            productDetails: product.productDetails

        }
        console.log('productSave: ', productSave)
        const response = await callAPI('/api/product/update', 'PUT', productSave)
        if (response.status == "oke") {
            const responseProduct = await callAPI(`/api/product/detail/${id}`, "GET")
            alert("Sửa sản phẩm thành công")
        }
    }
    const handelOnchnageValue = (e) => {
        console.log('onchange')
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    
    return (
        <Container >
            <div className='header-product-create'>
                <h1>Thông tin sản phẩm </h1>
                <p>Người tạo</p>
                <p>ngày tạo : {}</p>
            </div>
            <div className='content-product-create'>
                <Form method='POST' onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <Row className="mb-3">
                        <span>Hình ảnh </span>
                        <div className='form-file-image'>
                            <div className='image-box'>
                                {
                                    product?.imageProduct?.map((item) => (
                                        <div key={item.id} className='image-box-item'>
                                            <img src={`http://localhost:8080/api/files/${item.name}`} className='image' alt='Hình hảnh' />
                                            <div className='image-box-item-button'>
                                                <Button variant='danger'>
                                                    <MdDeleteOutline /></Button>
                                                <Button onClick={() => {
                                                    handelDeleteImage(item.id)
                                                }} variant='danger'> <MdDeleteOutline /></Button>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                            <Form.Group controlId="formFileMultiple" className='form-input-file' >
                                <Form.Label className='lable-input' >
                                    <RiImageAddLine size={30} color='#c80000' />
                                    <span className='lable-input-text' >chọn ảnh (.JPG hoặc .PNG)</span>
                                </Form.Label>
                                <Form.Control
                                    type="file" name='file' hidden='hidden' onChange={handelImage} />
                            </Form.Group>
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control name='name'
                                type="text"
                                placeholder="Nhập vào"
                                {...register("name", { required: true })}
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            {errors?.name?.type === 'required' && <p className="text-danger" role="alert">Nhập tên sản phẩm</p>}
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Loại </Form.Label>
                            <Form.Select name='category' className='select' size='lg'
                                {...register("category", { required: true })}
                                aria-invalid={errors.category ? "true" : "false"}
                                value={field.value}
                            >
                                {categories.map(item => (
                                    <option key={item.id}
                                        value={item.id}>{item.name}</option>
                                ))}
                            </Form.Select>
                            {errors?.category?.type === 'required' && <p className="text-danger" role="alert">Hãy chọn loại sản phẩm</p>}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Label>Giá nhập</Form.Label>
                            <Form.Control
                                name='priceBuy'


                                type="text"
                                placeholder="Nhập vào"
                                {...register("priceBuy", { required: true })}
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            {errors?.priceBuy?.type === 'required' && < p className="text-danger" role="alert">Nhập giá nhập</p>}
                        </Form.Group  >

                        <Form.Group as={Col}>
                            <Form.Label>Giá bán</Form.Label>
                            <Form.Control name='priceSale'


                                type="text"
                                placeholder="Nhập giá bán sản phẩm"
                                {...register("priceSale", { required: true })}
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            {
                                errors?.priceSale?.type === 'required'
                                && (< p className="text-danger" role="alert">Nhập giá bán</p>)
                            }

                        </Form.Group>
                    </Row>



                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả </Form.Label>
                        <Form.Control as="textarea" rows={3}


                            name='description'
                            {...register("description", { required: true })}
                            aria-invalid={errors.description ? "true" : "false"}
                        />
                        {
                            errors?.description?.type === 'required'
                            && (< p className="text-danger" role="alert">Thêm mô tả cho sản phẩm</p>)
                        }
                    </Form.Group>
                    <Row>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Phân loại </Form.Label>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th >STT</th>
                                            <th >Size</th>

                                            <th>Số lượng</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>Mới</td>
                                            <td>
                                                <input name='size' onChange={(e) => {
                                                    setSize(e.target.value)
                                                }}
                                                    type='text' placeholder='Ví dụ: 38, 39, ...'
                                                    value={size} className='input-table' /></td>


                                            <td>
                                                <input name='quantity' onChange={(e) => {
                                                    setQuantity(e.target.value)
                                                }}
                                                    type='text' value={quantity} className='input-table' />
                                            </td>

                                            <td>
                                                <Button onClick={handelAddRow} variant="primary" type="button">
                                                    Thêm
                                                </Button>
                                            </td>
                                        </tr>
                                        {product?.productDetails?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {++index}
                                                </td>
                                                <td>
                                                    <input name='size' readOnly='readOnly'
                                                        type='text' value={item.size} className='input-table' /></td>

                                                <td><input name='quantity' readOnly='readOnly'
                                                    type='text' value={item.quantity} className='input-table' /></td>
                                                <td><Button onClick={() => {
                                                    handelDeleteRow(item.id)
                                                }} variant="outline-danger" type='button'>Xoá</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className='footer-form'>
                        <Button className='btn-Submit' variant="primary" type='submit'>
                            Lưu lại và hiển thị
                        </Button>
                        <Button className='btn-Submit' variant="danger" >
                            Huỷ bỏ
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );
}

export default ProductDetail;