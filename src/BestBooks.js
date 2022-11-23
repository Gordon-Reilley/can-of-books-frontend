import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import './bestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      openModal: false
    }
  }

  handleOpenModal = () => {
    this.setState({
      openModal: true
    })
  }

  handleCloseModal = () => {
    this.setState({
      openModal: false
    })
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value
    }
    this.postBook(newBook);
  }

  getBooks = async() => {
    try {
      const booksURL = `${process.env.REACT_APP_SERVER}/book`
      let bookResults = await axios.get(booksURL);
      this.setState({
        books: bookResults.data
      });
      console.log(bookResults);
    } catch(error) {
      console.log('we have an error: ', error.response.data);
    }
  }

  postBook = async(newBook) => {
    try {
      const bookThatWasAdded = await axios.post(`${process.env.REACT_APP_SERVER}/book`, newBook);
      const aBook = bookThatWasAdded.data
      
      this.setState({
        books: [...this.state.books, aBook]
      })

    }catch(err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  componentDidMount = () => {
    this.getBooks();
  }

  render() {
    console.log(this.state.books);
    let booksDisplay = this.state.books.map((book) => {
      return (
        <Carousel.Item key={book._id}>
          <img
            src="https://media.istockphoto.com/id/1306307586/photo/collection-of-old-books-in-library.jpg?s=612x612&w=is&k=20&c=FG6hFKD--ThDTy0xAZlAiFAUAYO5Cyq5TAi9987xjDw="
            alt="First slide"
            width='30%'
          />
          <Carousel.Caption>
            <h3 className='title'>{book.title}</h3>
            <p className='desStatus'>{book.description}</p>
            <p className='desStatus'>{book.status}</p>
          </Carousel.Caption>
          
        </Carousel.Item>

      );
    });

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        
        {this.state.books.length ? (
          <Carousel>
           {booksDisplay}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <Button onClick={this.handleOpenModal} className='add-book-button'>Add Book</Button>
        <BookFormModal show={this.state.openModal} onHide={this.handleCloseModal} handleBookSubmit={this.handleBookSubmit}/>
      </>
    )
  }
}

export default BestBooks;
