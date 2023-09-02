
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import callAPI from '../../../API/axios';
import '../../manager_category/CategoryDetail/style.scss'
function CategotyDetail({ show, handleClose, item, onReload }) {

    const [category, setCategory] = useState({})
    console.log(item)
    const form = useForm({
        defaultValues: item
    });


    const { register, handleSubmit, control, reset, formState: { errors } } = form

    const onsubmit = async (data) => {

        const response = await callAPI('/api/category/update', 'PUT', {
            ...data
        })
        if (response.status == 'oke') {
            onReload(
                {
                    action: true
                }
            )
            handleClose()
        }
    }


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        > <Form onSubmit={handleSubmit(onsubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="mb-3" >
                        <Form.Label>Tên danh mục</Form.Label>
                        <Form.Control type="text" placeholder="Nhập vào" name='name'
                            {...register("name", { required: true })}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors?.name?.type === 'required' && <p className="text-danger" role="alert">Nhập tên loại sản phẩm</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mổ tả </Form.Label>
                        <Form.Control as="textarea" rows={3} className='descripton-text'
                            {...register("description", { required: true })}
                            aria-invalid={errors.description ? "true" : "false"} />
                        {errors?.description?.type === 'required' && <p className="text-danger" role="alert">Mô tả sản phẩm</p>}
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button type='submit' variant="primary">Lưu lại</Button>
                </Modal.Footer>
            </Form>
        </Modal >
    );
}

export default CategotyDetail;