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
import FormModal from './CategoryCreate';
import CategotyDetail from './CategoryDetail';

function ManagerCategory() {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [search, setSearch] = useState('');
    const [listCategory, setListCategory] = useState([])
    const [typeCategory, setTypeCategory] = useState(true)
    const [showFrom, setShowForm] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        getAllCategory()
    
    }, [isLoad])
   
    const getAllCategory = async () => {
        const response = await callAPI('/api/category/getAll', "GET")
        if (response.status == 'oke') {
            setListCategory(response.data)
            setCategories(response.data)
        }
    }

    const handelOnchangeCategory = async (e) => {
        const value = e.target.value
        if (value == 'true') {
            const response = await callAPI('/api/category/getAll', "GET")
            if (response.status == 'oke') {
                setCategories(response.data)
                setTypeCategory(true)
            }
        } else {
            const response = await callAPI('/api/category/record', "GET")
            if (response.status == 'oke') {
                setCategories(response.data)
                setTypeCategory(false)
            }
        }
    }

    const handelOpenEdit = (item) => {

        setShowForm(!showFrom)
        setCategory(item)
    }

    const handelOnchangeTypeCategory = async (e) => {
        let value = e.target.value
        if (value == 'true') {
            const response = await callAPI('/api/category/getAll', "GET")
            setCategories(response.data)
            return;
        }
        const response = await callAPI('/api/category/getAll?status=false', "GET")
        setCategories(response.data)
    }

    const handelReload = ({ action }) => {
        if (action) {
            setIsLoad(!isLoad)
        }

    }

    function Items({ currentItems }) {
        console.log(typeCategory)
        if (typeCategory) {
            return (
                <Table striped hover >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Loại sản phẩm</th>
                            <th >Mô tả</th>
                            <th>Ngày tạo</th>
                            <th>Người tạo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((item, index) => (
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>
                                    {item.name}
                                </td>
                                <td width={300} height={80} style={{ overflow: 'hidden' }} >
                                    <span className='discription-text'>{item.description}</span>
                                </td>
                                <td>
                                    {item.dateAt}
                                </td>
                                <td>
                                    {item.accountCreate}
                                </td>
                                <td>
                                    <Button onClick={() => {
                                        handelOpenEdit(item)
                                    }} variant="outline-primary">
                                        <FaRegEdit /></Button>
                                    <Button onClick={() => {
                                        removeProduct(id)
                                    }} variant="outline-primary">
                                        <MdDeleteOutline /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            );

        } else {
            return (
                <Table striped hover >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Loại sản phẩm</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng sản phẩm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((item, index) => (
                            <tr key={index} >
                                <td>{++index}</td>
                                <td>
                                    {item.name}
                                </td>
                                <td >
                                    {item.count}
                                </td>
                                <td>
                                    <CurrencyFormat value={item.totalQuantity} displayType={'text'} thousandSeparator={true} />
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            );

        }

    }

    function PaginatedItems({ itemsPerPage }) {
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage;

        const currentItems = categories.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(categories.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % categories.length;

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
                <h1 className="title-text">Quản lý danh mục</h1>
            </div>
            <div className='main'>
                <div className="header-main">
                    <Container className='header-start'>
                        <Row className='header-start-body'>
                            <Col xl={3} className='header-start-body-item'>
                                <p className='header-start-category-title'>Loại sản phẩm</p>
                                <select className='header-start-category' name='category'
                                >
                                    <option value={''}>
                                        Tất cả
                                    </option>
                                    {listCategory.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>

                            <Col xl={3} className='header-start-body-item'>
                                <p className='header-start-category-title'>Sản phẩm: </p>
                                <select className='header-start-category' name='category'
                                    onChange={handelOnchangeCategory}
                                >

                                    <option value={true}>
                                        Danh sách danh mục
                                    </option>
                                    <option value={false}>
                                        Tổng quan danh mục
                                    </option>
                                </select>
                            </Col>
                            {typeCategory && <Col xl={3} className='header-start-body-item'>
                                <p className='header-start-category-title'>Loại: </p>
                                <select className='header-start-category' name='category'
                                    onChange={handelOnchangeTypeCategory}
                                >
                                    <option value={true}>
                                        Đang bán
                                    </option>
                                    <option value={false}>
                                        Ngừng bán
                                    </option>
                                </select>
                            </Col>}
                        </Row>

                        <Row className='header-btn-create'>
                            <div className="header-btn-create--item" >
                                <Button onClick={() => {
                                    setIsOpen(!isOpen)
                                }} >Thêm Loại sản phẩm</Button>
                            </div>

                        </Row>
                        <Row className='header-start-table'>
                            <PaginatedItems itemsPerPage={10} />
                        </Row>

                    </Container>
                </div>
            </div>
            {isOpen == true && <FormModal isOpen={isOpen} handleClose={() => setIsOpen(false)} onReload={handelReload} ></FormModal>}
            {showFrom == true && <CategotyDetail show={showFrom} handleClose={() => setShowForm(false)} item={category} onReload={handelReload}></CategotyDetail>}
        </section >
    );
}
export default ManagerCategory;