import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {

  /**
  * @description Clears search results after all DOM components did mount
  */
  componentDidMount() {
    this.props.getSearchResult('');
  }

  /**
  * @description Handles search result
  * @param {event} event
  */
  handleSearch = (event) => {
    event.preventDefault();
      this.props.getSearchResult(event.target.value);
  }

  /**
  * @description Handles shelf change on every event
  * @param { event } event
  */
  handleShelfChange = (event) => {
    event.preventDefault();
    this.props.handleShelfChange(event.target.id, event.target.value);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={this.handleSearch} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books.map((book, index) =>
              <li key={book.id}>
                <Book
                  index={index}
                  book={book}
                  handleShelfChange={this.handleShelfChange}
                  currentShelf={book.shelf}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;