import React from 'react';
import Shelf from './Shelf';
import { Link } from 'react-router-dom';

const Library = (props) => {
  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf
            books={props.currentlyReading}
            handleShelfChange={props.handleShelfChange}
            title="Currently Reading" />
          <Shelf
            books={props.wantToRead}
            handleShelfChange={props.handleShelfChange}
            title="Want To Read" />
          <Shelf
            books={props.read}
            handleShelfChange={props.handleShelfChange}
            title="Read" />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          Add a book
        </Link>
      </div>
    </div>
  );
}

export default Library;