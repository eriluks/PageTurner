// Import bindings
import React, { Component } from 'react';
import axios from 'axios';
// Import components
import Book from './Book';
import BookList from './BookList';

// Search component which handles the search of books
class Search extends Component {
  // Initialise the state in a constructor
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      // Empty query which will hold the updated text value
      query: ''
    };

    // Bind event handler to change
    this.handleChange = this.handleChange.bind(this);
  }

  // Event handler which changes the state of query to the value of the event change
  handleChange(event) {
    this.setState({
      query: event.target.value
    });
    console.log(this.state.query);
  }

  // When the component mounts get the list of books from the server
  componentDidMount() {
    axios.get('/api/users/')
      .then(res => {
        this.setState({
          // Store all books in this component's state
          books: res.data
        });
      }).catch(error => {
        console.log(error);
      });
  }

  // Draw the react component
  render() {
    // for each book object, produce a Book Component
    const bookList = this.state.books.map(u => {
      // Set the name of the book to be all lower case and get the first letter's index from the query state. Then draw the book
      if(u.name.toLowerCase().indexOf(this.state.query.toLowerCase())  >= 0  ) {
        return(
          <Book
            key={u._id}
            id={u._id}
            name={u.name}
            image={u.picture}
            author={u.author}
            handleDelete={this.handleDelete}
          />
        );
      }
    }
    );
    return(
      // Create an id reference which is styled in the app.css file
      <div id="NavBar">
        {/* Main container with an id referened accessed through the app.css file */}
        <div className="container">
          <div className="column">
            <h2 className=" title is-large is-size-1 has-text-left has-text-primary is-full">Search for a Book</h2>
            {/* Search Bar with onChange event handler*/}
            <input value={this.state.query} className="input" type="text" placeholder="Type in a book title to search..." onChange={this.handleChange}/>
            {/* Display the query text in the h2 element */}
            <h2 className="column title is-large is-size-4 has-text-grey-lighter"> Searching for <b className="has-text-grey-dark">{this.state.query}</b>...</h2>
            <hr />
          </div>
          <div className="columns is-multiline">
            {/* Show the list of books associated with the query entered*/}
            {bookList}
          </div>
        </div>
      </div>
    );
  }
}

// Export component
export default Search;
