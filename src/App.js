import React from 'react'
import { Route, Switch } from 'react-router-dom';
import update from 'immutability-helper';
import * as BooksAPI from './BooksAPI';
import './styles/App.css';
import Search from './components/Search';
import Library from './components/Library';
import ErrorPage from "./components/ErrorPage";

class BooksApp extends React.Component {
  
  // Constants
  READ = "read"
  WANT_TO_READ = "wantToRead"
  CURRENTLY_READING = "currentlyReading"

  /**
  * @description Stores states
  * books: Stores the books based on user shelves.
  * searchResults: Stores the books from search.
  */
  state = {
    books: [],
    searchResult: []
  }

  /**
  * @description Calls backend API's getAllBooks() function after all DOM components did mount
  */
  componentDidMount() {
    this.getAllBooks();
  }

  /**
  * @description Returns all books from backend API and set the state with results
  */
  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      });
    });
  }

  /**
  * @description Returns search results from backend API and set the state with results
  * @param {  }
  */
  getSearchResult = (query) => {
    (query.length > 0) ?
      BooksAPI.search(query).then((searchResult) => {
        if (!searchResult.error) {
          this.setState({ searchResult });
          this.updateSearchResultsWithShelf();
        } else {
          this.setState({ searchResult: [] });
        }
      })
      :
      this.setState({ searchResult: [] });
  }

  /**
  * @description Updates all shelves based on backend API's result
  */
  handleShelfChange = (bookId, shelf) => {
    BooksAPI.get(bookId).then((book) => {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(previousState => ({
          books: previousState.books.filter(b => b.id !== book.id).concat([book])
        }))
        this.updateSearchResultsWithShelf();
      });
    });
  }

  /**
  * @description Updates all shelves based on backend API's search results
  */
  updateSearchResultsWithShelf = () => {
    let newMyBooks = update(this.state.books, { $set: this.state.books });
    return this.setState(previousState => ({
      searchResult: previousState.searchResult.map(book => {
        book.shelf = 'none'
        newMyBooks.forEach(bookOnShelf => {
          bookOnShelf.id === book.id && (book.shelf = bookOnShelf.shelf)
        })
        return book;
      })
    }))
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
              <Library
                currentlyReading={this.state.books.filter(book => book.shelf === this.CURRENTLY_READING)}
                wantToRead={this.state.books.filter(book => book.shelf === this.WANT_TO_READ)}
                read={this.state.books.filter(book => book.shelf === this.READ)}
                handleShelfChange={this.handleShelfChange}
              />
            )}
          />
          <Route path="/search" render={({ history }) => (
              <Search
                books={this.state.searchResult}
                getSearchResult={this.getSearchResult}
                handleShelfChange={this.handleShelfChange}
                goHomePage={() => { history.push('/') }}
              />
            )}
          />
          <Route component={ErrorPage}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
