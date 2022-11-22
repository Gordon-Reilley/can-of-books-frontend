import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import './bestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async() => {
    const booksURL = `${process.env.REACT_APP_SERVER}/book`
    let bookResults = await axios.get(booksURL);
    this.setState({
      books: bookResults.data
    })
    console.log(bookResults);
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
      </>
    )
  }
}

export default BestBooks;
