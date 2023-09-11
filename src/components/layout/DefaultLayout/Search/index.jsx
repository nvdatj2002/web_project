import { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Search({ show, handleClose, ...props }) {
    return (
        <Offcanvas show={show} onHide={handleClose} {...props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Tìm kiếm sản phẩm</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form action="" method="GET">
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" placeholder="" name="keyword"  />
                    </Form.Group>
                    <Button type="submit" variant="outline-success">Tìm kiếm</Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Search;