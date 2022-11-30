import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import UpdateBookForm from './UpdateBookForm';
import { withAuth0 } from '@auth0/auth0-react';
import './bestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      openModal: false,
      openUpdateModal: false,
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

  handleOpenUpdateModal = () => {
    this.setState({
      openUpdateModal: true
    })
  }

  handleCloseUpdateModal = () => {
    this.setState({
      openUpdateModal: false
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
      if (this.props.auth0.isAuthenticated) {

        // get the token from Auth0
        const res = await this.props.auth0.getIdTokenClaims();
  
        // extract the token from the response
        // MUST use double underscore
        const jwt = res.__raw;
        console.log(jwt); 

        let config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/book',
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        }
        
        let bookResults = await axios(config);
        this.setState({
          books: bookResults.data
        });
        console.log(bookResults);
      }
    } catch(error) {
      console.log('we have an error: ', error.response.data);
    }
  }


  postBook = async(newBook) => {
    try {
      if (this.props.auth0.isAuthenticated) {

        // get the token from Auth0
        const res = await this.props.auth0.getIdTokenClaims();
  
        // extract the token from the response
        // MUST use double underscore
        const jwt = res.__raw;
        console.log(jwt);

        let config = {
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/book',
          data: newBook,
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        }

        const bookThatWasAdded = await axios(config);
        const aBook = bookThatWasAdded.data
        
        this.setState({
          books: [...this.state.books, aBook]
        })
      }

    }catch(err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  handleDelete = async (bookToDelete) => {
    const url = `${process.env.REACT_APP_SERVER}/book/${bookToDelete._id}`;

    try {
      
      const response = await axios.delete(url);
      console.log(response.data);
      const filteredBooks = this.state.books.filter(book => book._id !== bookToDelete._id);
      this.setState({ books: filteredBooks });
    } catch (error) {
      console.error(error);
    }
  }

  updatedBook = async (bookToUpdate) => {
    try {
      if (this.props.auth0.isAuthenticated) {

        // get the token from Auth0
        const res = await this.props.auth0.getIdTokenClaims();
  
        // extract the token from the response
        // MUST use double underscore
        const jwt = res.__raw;
        console.log(jwt);

        let config = {
          method: 'put',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/book/${bookToUpdate._id}`,
          data: bookToUpdate,
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        }
        
        let updatedBookObj = await axios(config);

        console.log('inside updateBook Function');
        
        // find the book we updated in state, and replace it with the data we got back from the database
        let updateBooksArray = this.state.books.map(book => {
          return book._id === bookToUpdate._id ? updatedBookObj.data : book;
        });
        this.setState({
          books: updateBooksArray
        });
      }
    } catch (err) {
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
            <Button onClick={() => this.handleDelete(book)}>Delete</Button>
            <Button onClick={this.handleOpenUpdateModal}>Update Book</Button>
            <UpdateBookForm show={this.state.openUpdateModal} onHide={this.handleCloseUpdateModal} updatedBook={this.updatedBook} book={book}/> 
            
            
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

export default withAuth0(BestBooks);
