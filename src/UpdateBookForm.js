import React from "react";
import {Button, Form, Modal} from 'react-bootstrap';

class UpdateBookForm extends React.Component {

  handleBookSubmit = (e) => {
    console.log('handle submit');
    e.preventDefault();

    // get the data from the form
    let bookToUpdate = {

      title: e.target.title.value || this.props.book.title,
      description: e.target.description.value || this.props.book.description,
      status: e.target.status.value || this.props.book.status,
      _id: this.props.book._id,
      __v: this.props.book.__v
    }
    console.log('updated Book: ', bookToUpdate);
    // call a method the add the book to the database
    // passed down from parent?
    this.props.updatedBook(bookToUpdate);
    console.log('handle submit ran');
  }


  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Update Book
            </Modal.Title>
          </Modal.Header>
            <Form onSubmit={this.handleBookSubmit}>
              <Modal.Body>
                <Form.Group className="newBookTitle" controlId="title">
                  <Form.Label>Book Title</Form.Label>
                  <Form.Control type="text" placeholder={this.props.book.title}/>
                </Form.Group>
                <Form.Group className="newBookDescription" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder={this.props.book.description}/>
                </Form.Group>
                <Form.Group className="newBookStatus" controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" placeholder={this.props.book.status}/>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Submit Updated Book
                </Button>
              </Modal.Footer>
            </Form>
        </Modal>
      </>
    )
  }

}
export default UpdateBookForm;