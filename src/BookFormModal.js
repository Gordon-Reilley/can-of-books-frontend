import React from "react";
import {Button, Form, Modal} from 'react-bootstrap';

class BookFormModal extends React.Component {

  render() {
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
            <Form onSubmit={this.props.handleBookSubmit}>
              <Modal.Body>
                <Form.Group className="newBookTitle" controlId="title">
                  <Form.Label>Book Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter Book Title"/>
                </Form.Group>
                <Form.Group className="newBookDescription" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="Enter Book Description"/>
                </Form.Group>
                <Form.Group className="newBookStatus" controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" placeholder="Enter Book Status"/>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Submit New Book
                </Button>
              </Modal.Footer>
            </Form>
        </Modal>
      </>
    )
  }

}

export default BookFormModal;