import { Button, Modal } from "react-bootstrap";

function Information({ show, handleClose, message }) {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Thông Bán</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Đồng ý
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Information;