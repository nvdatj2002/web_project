import { Container } from 'react-bootstrap';
import './style.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { RiImageAddLine } from 'react-icons/ri'
import { MdDeleteOutline } from 'react-icons/md'
import { get, useForm } from 'react-hook-form';
import callAPI from '../../../API/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ProductCreate() {
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState('')

    const [imageSave, setImageSave] = useState([])
    const [imageNew, setImageNew] = useState([])
    const [detailProduct, setDetailProduct] = useState([])
    const [categories, setCategories] = useState([])

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    // call category
    useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => {
        const response = await callAPI("/api/category/getAll", "GET");
        const resetProduct = await callAPI("/api/product/reset", "GET");
        if (response.status == 'oke') {
            setCategories(response.data)
        }
    }

    const handelAddRow = async () => {
        if (size == '') {
            alert('Nhập đầy đủ thông tin phân loại')
         
        } else if (quantity == '') {
            alert('Nhập đầy đủ thông tin phân loại')
            return;
        }
        const data = {
            size: size,
          
            quantity: quantity
        }

        const response = await callAPI("/api/product/product-detail", "POST", data);
        const productDetails = response.data
        setDetailProduct(productDetails)

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
            `/api/fileUpload`, 'uploadFile', formData, )

        if (response.status) {
            
            setImageSave([...imageSave, file])
            setImageNew([...imageNew, response.data])
        } else {
            alert("Tải ảnh lỗi")
        }


    }


    const handelDeleteImage = async (index) => {
        const listImageNew = imageNew.filter((item, i) => {
            return index != i;
        })
        const response = await callAPI(`/api/product/image/remove/${index}`, 'DELETE')
        setImageNew(listImageNew)
    }

    const handelDeleteRow = async (index) => {
        const listRowNew = detailProduct.filter((item, i) => {
            return index != i;
        })
        const response = await callAPI(`/api/product/product-detail/remove/${index}`, 'DELETE')
        setDetailProduct(listRowNew)
    }

    const onSubmit = async (data) => {
        if (imageSave.length == 0) {
            alert("Cần chọn ít nhất 1 ảnh")
            return;
        }
        if (detailProduct.length == 0) {
            alert("Bạn cần phân loại cho sản phẩm")
            return;
        }
        const product = {
            ...data,
            category: {
                id: data.category
            },

            dateAt: new Date()
        }

        const response = await callAPI('/api/product/create', 'POST', product)
        if (response.status == "oke") {
            navigate('/manager/products')
            alert("Thêm sản phẩm thành công")
        }
    }

    return (
        <Container >
            <div className='header-product-create'>
                <h1>Thêm sản phẩm mới</h1>
            </div>
            <div className='content-product-create'>
                <Form method='POST' onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <Row className="mb-3">
                        <span>Hình ảnh </span>
                        <div className='form-file-image'>
                            <div className='image-box'>
                                {
                                    imageNew.map((item, index) => (
                                        <div key={index} className='image-box-item'>
                                            <img src={`http://localhost:8080/api/files/${item}`} className='image' alt='Hình hảnh' />
                                            <div className='image-box-item-button'>
                                                <Button variant='danger'> <MdDeleteOutline /></Button>
                                                <Button onClick={() => {
                                                    handelDeleteImage(index)
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
                            >
                                <option value={""}>Loại sản phẩm</option>
                                {categories.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
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

                    <Row>
                        <Form.Group className="mb-3" >
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
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Phân loại </Form.Label>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                           
                                            <th >Size</th>
                                            <th>Số lượng</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
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
                                                    type='number' value={quantity} className='input-table' />
                                            </td>

                                            <td>
                                                <Button onClick={handelAddRow} variant="primary" type="button">
                                                    Thêm
                                                </Button>
                                            </td>
                                        </tr>
                                        {detailProduct.map((row, index) => (
                                            <tr key={index}>
                                              
                                                <td>
                                                    <input name='size' readOnly='readOnly'
                                                        type='text' value={row.size} className='input-table' /></td>
                                                <td><input name='quantity' readOnly='readOnly'
                                                    type='text' value={row.quantity} className='input-table' /></td>
                                                <td><Button onClick={() => {
                                                    handelDeleteRow(index)
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

export default ProductCreate;