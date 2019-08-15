import React from 'react';
import Book from './Book';

const Shelf = (props) => {

  /**
  * @description Handles shelf on every event triggered
  * @param { event } event
  */
  const handleShelfChange = (event) => {
    event.preventDefault();
    props.handleShelfChange(event.target.id, event.target.value);
  }

  return (
    <div className="bookshelf">
      <h3 className="bookshelf-title">{props.title}</h3>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book, index) =>
            <li key={book.id}>
              <Book
                index={index}
                book={book}
                handleShelfChange={handleShelfChange}
                currentShelf={book.shelf}
              />
            </li>
          )}
          {props.books.length === 0 &&
          <p className="bookshelf-warning">
           Click <a href="/search">here</a> to add a new book
          </p>
          }
        </ol>
      </div>
    </div>
  );
}

export default Shelf;