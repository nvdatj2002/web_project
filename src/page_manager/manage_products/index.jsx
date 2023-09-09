import './style.scss'
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../../API/axios';
import CurrencyFormat from 'react-currency-format';
import ReactPaginate from 'react-paginate';

function ManagerProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState('');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('')
    const [typeProduct, setTypeProduct] = useState(true)
    const [sortName, setSortName] = useState(false)
    const [sortPriceBuy, setSortPriceBuy] = useState(false)
    const [sortPriceSale, setSortPriceSale] = useState(false)


    useEffect(() => {
        getAllProductAPI();
        getAllCategory();
    }, [])

    useEffect(() => {
        getProductByStaus()
    }, [typeProduct])


    const getAllProductAPI = async () => {
        const response = await callAPI(`/api/product/getAll`, "GET")
        if (response.status == 'oke') {
            setProducts(response.data)
        }
    }
    const getAllCategory = async () => {
        const response = await callAPI('/api/category/getAll', "GET")
        if (response.status == 'oke') {
            setCategories(response.data)
        }
    }


    const removeProduct = async (id) => {
        const response = await callAPI(`/api/product/delete/${id}`, "DELETE")
        if (response.status == 'oke') {
            const productsNew = products.filter(item => item.id != id)
            setProducts(productsNew)
        }

    }


    const handleOnchangeCategory = async (e) => {
        const idC = e.target.value;
        setCategory(idC)
        if (idC == '' && typeProduct) {
            const response = await callAPI(`/api/product/getAll?search=${search}&status=${typeProduct}`, "GET")
            setProducts(response.data);
            return;
        }
        const response = await callAPI(`/api/product/category/${idC}?search=${search}&status=${typeProduct}`, "GET")
        setProducts(response.data);
    }

    const handelSearch = async (e) => {
        e.preventDefault()
        console.log(category)
        if (category != '') {
            const response = await callAPI(`/api/product/category/${category}?search=${search}&status=${typeProduct}`, 'GET')
            setProducts(response.data)
            return;
        }
        const response = await callAPI(`/api/product/getAll?search=${search}&status=${typeProduct}`, 'GET')
        setProducts(response.data)


    }
    const getProductByStaus = async () => {
        if (category != '') {
            const response = await
                callAPI(`/api/product/category/${category}?search=${search}&status=${typeProduct}`, 'GET')
            setProducts(response.data)
            return;
        }

        const response = await callAPI(`/api/product/getAll?search=${search}&status=${typeProduct}`, 'GET')
        setProducts(response.data)
    }
    const handelOnchangeProduct = async (e) => {
        let value = e.target.value
        setTypeProduct(value)
    }
    const handelSort = (type) => {
        if (type == 'name') {
            if (!sortName) {
                const productSort = products.sort((a, b) => {
                    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                })
                console.log(productSort)
                setProducts([...productSort])
                setSortName(true)
                return

            }
            const productSort = products.sort((a, b) => {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            })
            console.log(productSort)
            setProducts([...productSort])
            setSortName(false)
        }
        if (type == 'priceBuy') {
            if (!sortPriceBuy) {
                const productSort = products.sort((a, b) => a.priceBuy - b.priceBuy)
                setSortPriceBuy(true)
                setProducts([...productSort])
                return
            }
            const productSort = products.sort((a, b) => b.priceBuy - a.priceBuy)
            setProducts([...productSort])
            setSortPriceBuy(false)
        }
        if (type == 'priceSale') {
            if (!sortPriceSale) {
                const productSort = products.sort((a, b) => a.priceSale - b.priceSale)
                setSortPriceSale(true)
                setProducts([...productSort])
                return
            }
            const productSort = products.sort((a, b) => b.priceSale - a.priceSale)
            setProducts([...productSort])
            setSortPriceSale(false)
        }
    }
    // component
    const ButtonAction = ({ id, type }) => {
        if (type == true) {

            return (
                <div>
                    <Button type='button' href={`/manager/products/detail/${id}`} variant="outline-primary"><FaRegEdit /></Button>
                    <Button onClick={() => {
                        removeProduct(id)
                    }} variant="outline-primary">
                        <MdDeleteOutline /></Button>
                </div>
            )
        }
        return (
            <div>
                <span>Ngừng bán</span>
                <Button onClick={() => {
                    removeProduct(id)
                }} variant="outline-primary">Khôi phục sản phẩm</Button>
            </div>
        )

    }
    // 

    function Items({ currentItems }) {
        return (
            <Table striped hover >
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Hình ảnh</th>
                        <th className='mouse-pointer'
                            onClick={() => {
                                handelSort('name')
                            }}
                        >Tên </th>
                        <th className='mouse-pointer'
                            onClick={() => {
                                handelSort('priceBuy')
                            }}
                        >Giá Nhập</th>
                        <th className='mouse-pointer'
                            onClick={() => {
                                handelSort('priceSale')
                            }}
                        >Giá Bán</th>
                        <th>Loại</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems?.map((item, index) => (
                        <tr key={item.id} >
                            <td>{++index}</td>
                            <td>

                                <img key={image.id} className='image-product'
                                    src={`http://localhost:8080/api/files/${item?.imageProduct[0]?.name}`}>
                                </img>
                            </td>
                            <td > <p>{item.name}</p>
                            </td>
                            <td>
                                <CurrencyFormat value={item.priceBuy} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </td>
                            <td>
                                <CurrencyFormat value={item.priceSale} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </td>
                            <td>{item?.category?.name}</td>
                            <td width={100}>
                                <ButtonAction id={item.id} type={typeProduct} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    function PaginatedItems({ itemsPerPage }) {
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage;

        const currentItems = products.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(products.length / itemsPerPage);
        console.log(pageCount)
        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % products.length;

            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} />
                < ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< "
                    renderOnZeroPageCount={null}
                />
            </>
        );
    }
    return (
        <section>
            <div className="title">
                <h1 className="title-text">Quản lý sản phẩm</h1>
            </div>
            <div className='main'>
                <div className="header-main">
                    <Container className='header-start'>
                        <Row className='header-start-body'>
                            <Col className='header-start-body-item' xl={4}>
                                <form className="" method='GET'>
                                    <div className="header-search">
                                        <input onChange={(e) => {
                                            setSearch(e.target.value)
                                        }} name='search' className="header-search--input" placeholder='Tìm kiếm...' type="text" />
                                        <Button onClick={handelSearch} className='btn-search' type='submit'>
                                            <BsSearch className='header-search-icon' fontSize={24} />
                                        </Button>
                                    </div>
                                </form>
                            </Col>
                            <Col xl={3} className='header-start-body-item'>
                                <p className='header-start-category-title'>Loại sản phẩm</p>
                                <select className='header-start-category' name='category'
                                    onChange={handleOnchangeCategory}
                                >
                                    <option value={''}>
                                        Tất cả
                                    </option>
                                    {categories?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                            <Col xl={3} className='header-start-body-item'>
                                <p className='header-start-category-title'>Sản phẩm: </p>
                                <select className='header-start-category' name='category'
                                    onChange={handelOnchangeProduct}
                                >
                                    <option value={true}>
                                        Đang bán
                                    </option>
                                    <option value={false}>
                                        Ngừng bán
                                    </option>
                                </select>
                            </Col>
                        </Row>

                        <Row className='header-btn-create'>
                            <div className="header-btn-create--item" >
                                <Link to={"/manager/products/create"}>Thêm sản phẩm mới</Link>
                            </div>

                        </Row>
                        <Row className='header-start-table'>

                            <PaginatedItems itemsPerPage={10} />
                        </Row>

                    </Container>
                </div>
            </div>
        </section >
    );
}
export default ManagerProduct;