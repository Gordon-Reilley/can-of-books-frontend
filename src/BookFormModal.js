import React from "react";
import {Button, Form, Modal} from 'react-bootstrap';

class BookFormModal extends React.Component {

  render() {
    console.log('hi from line 7');
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              New Book
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="newBookTitle" controlId="formNewTitle">
                <Form.Label>
                  Book Title
                </Form.Label>
                <Form.Control type="text" placeholder="Enter Book Title" />
              </Form.Group>
              <Form.Group className="newBookDescription" controlId="formNewDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Description" />
              </Form.Group>
              <Form.Group className="newBookStatus" controlId="formNewStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Status" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit New Book
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

}

export default BookFormModal;