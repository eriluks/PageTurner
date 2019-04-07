// Import bindings
import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
// Import components
import Book from './Book';
import BookList from './BookList';

// Component which loads the books with the same genre
class Genre extends Component {
  constructor(props) {
    super(props);
    // store the values in state
    this.state = {id: '',
      name: '',
      picture: '',
      author: '',
      books: [],
      genre: []
    };
  }

  componentDidMount() {
    // Fetch all book data which matches the selected genre
    axios.get('/api/' + this.props.match.params.genre)
      .then(response => {
        console.log(response.data);
        this.setState({
          // store all books in this component's state
          books: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // for each book object, produce a Book Component
    const genreList = this.state.books.map(u => (
      <Book
        key={u._id}
        id={u._id}
        name={u.name}
        image={u.picture}
        author={u.author}
        overview={u.overview}
        handleDelete={this.handleDelete}
      />
    ));

    // Draw the list of books
    return (
      // Create an id reference which is styled in the app.css file
      <div id="NavBar">
        {/* Main Container */}
        <div className="container">
          {/* Draw a title which will display the selected genre name*/}
          <h2 className=" title is-large is-size-1 has-text-left has-text-primary is-full">Genre: {this.props.match.params.genre}</h2>
          <hr />
          {/* Create a multiline column which will draw the list of books */}
          <div className="column is-multiline">
            {/* If there are objects in the genreList then draw the list */}
            {genreList.length ? <div className="columns is-multiline">
              <h2 className="column title is-large has-text-grey-lighter">
              We found the books matching this genre...</h2>
              {genreList}
              <hr />
            </div> :
              // Otherwise show the error image
              <div>
                <div className="ErrorImage">
                  <img src="../Images/none.png" alt="None Found"/>
                  <h2 className="subtitle has-text-centered">No books in this genre</h2>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

// Export component
export default Genre;
