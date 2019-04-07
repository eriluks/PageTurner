// Import bindings
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
// Import stylesheet
import './app.css';
// Import installed components
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// Import general components
import Book from './Book';
import Genre from './Genre';
import SortRadioButton from './SortRadioButton';

// Component represents the list of ALL books that get rendered on the page
class BookList extends Component {
  constructor(props) {
    super(props);
    // store the required variables in state
    this.state = {
      index: 0,
      direction: null,
      // books are stored in this array
      books: [],
      // declare book genres
      genres: ['Art', 'Biography', 'Business',
        'Childrens', 'Classics', 'Comics', 'Contemporary',
        'Cooking', 'Crime', 'Fantasy', 'Fiction', 'History',
        'Horror', 'Comedy', 'Mystery', 'Nonfiction',
        'Paranormal', 'Science Fiction', 'Sports', 'Travel',
        'Young Adult', 'Thriller', 'Romance'],
      selectedGenre:'',
      sort: 'no'};

    // Bind event handlers
    this.updateBooks = this.updateBooks.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // When the component mounts, fetch the book data from the server
    this.updateBooks();
  }

  updateBooks() {
    // Make a GET request to the database and store the fetched books into the book array
    axios.get('api/users')
      .then(response => {
        this.setState({ books: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  // Handle the book selection event
  handleSelect(selectedIndex, e) {
    this.setState({
      // Set the book index
      index: selectedIndex,
      direction: e.direction,
    });
  }

  handleDelete(bookId) {
    // make a DELETE request to the server to remove the book with this bookId
    axios
      .delete('api/users', {
        data: {
          id: bookId
        }
      })
      .then(response => {
        // if delete was successful, re-fetch the list of books which will trigger a re-render
        this.updateBooks();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
  // handle <select> UI elements
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // Set the dropdown select value
    this.setState({
      [name]: value
    });
  }

  render() {
    const { index, direction } = this.state;

    // Check if the radio button hasn't been clciked and create a copy of the books array
    const data = this.state.sort === 'no' ? this.state.books : [].concat(this.state.books)
      // Sort the copy alphabetically otherwise bring back the initial list
      .sort((a, b) => {

        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });

    // For each book object, produce a Book Component
    const bookList = data.map(u => (
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
      <div id="NavBar">
        {/* CREATE THE GENRE CAROUSEL SLIDER*/}
        {/* Hide the carousel when in mobile mode*/}
        <Carousel showThumbs={false} showStatus={false} className="is-hidden-mobile">
          {/* Create a class reference and style in the app.css file*/}
          <div className="columns slider-item-div has-background-primary">
            {/* FIRST SLIDER*/}
            {/* Art genre column which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Art'}>
                <button id="carousel_image" className="column">
                  {/* Find the art button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/art.png"></img>
                  <p className="title is-6 has-text-white">Art</p>
                </button>
              </Link>
            </div>
            {/* Biography genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Biography'}>
                <button id="carousel_image" className="column">
                  {/* Find the biography button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/biography.png"></img>
                  <p className="title is-6 has-text-white">Bio</p>
                </button>
              </Link>
            </div>
            {/* Romance genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Romance'}>
                <button id="carousel_image" className="column">
                  {/* Find the romance button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/romance.png"></img>
                  <p className="title is-6 has-text-white">Romance</p>
                </button>
              </Link>
            </div>
            {/* Childrens genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Childrens'}>
                <button id="carousel_image" className="column">
                  {/* Find the childrens button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/child.png"></img>
                  <p className="title is-6 has-text-white">Children</p>
                </button>
              </Link>
            </div>
            {/* Classics genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Classics'}>
                <button id="carousel_image" className="column">
                  {/* Find the classics button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/classics.png"></img>
                  <p className="title is-6 has-text-white">Classics</p>
                </button>
              </Link>
            </div>
            {/* Comics genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Comics'}>
                <button id="carousel_image" className="column">
                  {/* Find the comics button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/comics.png"></img>
                  <p className="title is-6 has-text-white">Comics</p>
                </button>
              </Link>
            </div>
            {/* Contemporary genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Contemporary'}>
                <button id="carousel_image" className="column">
                  {/* Find the contemporary button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/museum.png"></img>
                  <p className="title is-6 has-text-white">Contemporary</p>
                </button>
              </Link>
            </div>
            {/* Cooking genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Cooking'}>
                <button id="carousel_image" className="column">
                  {/* Find the cooking button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/cooking.png"></img>
                  <p className="title is-6 has-text-white">Cooking</p>
                </button>
              </Link>
            </div>
            {/* Crime genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Crime'}>
                <button id="carousel_image" className="column">
                  {/* Find the crime button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/crime.png"></img>
                  <p className="title is-6 has-text-white">Crime</p>
                </button>
              </Link>
            </div>
            {/* Fantasy genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Fantasy'}>
                <button id="carousel_image" className="column">
                  {/* Find the fantasy button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/fantasy.png"></img>
                  <p className="title is-6 has-text-white">Fantasy</p>
                </button>
              </Link>
            </div>
          </div>
          {/* SECOND SLIDER*/}
          <div className="columns slider-item-div has-background-primary">
            {/* Fiction genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Fiction'}>
                <button id="carousel_image" className="column">
                  {/* Find the fiction button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/fiction.png"></img>
                  <p className="title is-6 has-text-white">Fiction</p>
                </button>
              </Link>
            </div>
            {/* History genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/History'}>
                <button id="carousel_image" className="column">
                  {/* Find the history button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/history.png"></img>
                  <p className="title is-6 has-text-white">History</p>
                </button>
              </Link>
            </div>
            {/* Horror genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Horror'}>
                <button id="carousel_image" className="column">
                  {/* Find the horror button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/horror.png"></img>
                  <p className="title is-6 has-text-white">Horror</p>
                </button>
              </Link>
            </div>
            {/* Comedy genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Comedy'}>
                <button id="carousel_image" className="column">
                  {/* Find the comedy button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/comedy.png"></img>
                  <p className="title is-6 has-text-white">Comedy</p>
                </button>
              </Link>
            </div>
            {/* Mystery genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Mystery'}>
                <button id="carousel_image" className="column">
                  {/* Find the mystery button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/mystery.png"></img>
                  <p className="title is-6 has-text-white">Mystery</p>
                </button>
              </Link>
            </div>
            {/* Nonfiction genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Nonfiction'}>
                <button id="carousel_image" className="column">
                  {/* Find the nonfiction button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/nonfiction.png"></img>
                  <p className="title is-6 has-text-white">Non - fiction</p>
                </button>
              </Link>
            </div>
            {/* Paranormal genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Paranormal'}>
                <button id="carousel_image" className="column">
                  {/* Find the paranormal button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/paranormal.png"></img>
                  <p className="title is-6 has-text-white">Para  normal</p>
                </button>
              </Link>
            </div>
            {/* Science Fiction genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Science Fiction'}>
                <button id="carousel_image" className="column">
                  {/* Find the science fiction button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/sciencefiction.png"></img>
                  <p className="title is-6 has-text-white">Science Fiction</p>
                </button>
              </Link>
            </div>
            {/* Yound Adult genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Young Adult'}>
                <button id="carousel_image" className="column">
                  {/* Find the young adult button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/youngadult.png"></img>
                  <p className="title is-6 has-text-white">Young Adult</p>
                </button>
              </Link>
            </div>
            {/* Travel genre collumn which wraps the button in a link that leads to the required genre URL*/}
            <div className="column">
              <Link to={'/genre/Travel'}>
                <button id="carousel_image" className="column">
                  {/* Find the travel button image*/}
                  <img alt='likes' width="50" height="20" src="../Images/travel.png"></img>
                  <p className="title is-6 has-text-white">Travel</p>
                </button>
              </Link>
            </div>
          </div>
          {/* END OF CAROUSEL*/}
        </Carousel>

        {/* Main container*/}
        <div className="container">
          <h2 className="title is-large is-size-1 has-text-left has-text-primary">List of all Books</h2>
          <hr />
          <div className="columns">
            {/* Show the list of book objects in a 10 out of 12 grid columns */}
            <div className="column is-10">
              <div className="columns is-multiline">
                {bookList}
              </div>
            </div>
            {/* Interactive column elements*/}
            <div className="column">
              {/* Id reference which is used in the app.css file */}
              <div id="stickyDrop" className="field">
                {/* DROPDOWN SELECTION */}
                <div className="control">
                  <div className="select is-primary">
                    {/* Assign the dropdown selection value when clicked */}
                    <select value={this.state.selectedGenre}
                      onChange={(e) => this.setState({selectedGenre: e.target.value})}>
                      <option>Select a genre</option>
                      {
                        // Map the genre array and place each element as an option in the dropdown
                        this.state.genres.map((genre) =>
                          <option key={genre} value={genre}>{genre}</option>
                        )
                      }
                    </select>
                  </div>
                </div>
                {/* Wrap the submit button to lead the selected genre link when clicked*/}
                <Link to={`/genre/${this.state.selectedGenre}`}>
                  <div>
                    <form>
                      <button type="submit" value="Submit" className="button is-primary" onSubmit={this.handleSubmit}>Find</button>
                    </form>
                  </div>
                </Link>
                <br />
                {/* Draw the SortRadioButton component and reference the "sort" state that is initialized as "no" */}
                <SortRadioButton handleChange={this.handleChange} checked={this.state.sort}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Export component
export default BookList;
