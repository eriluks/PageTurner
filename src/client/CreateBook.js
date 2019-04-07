// Import bindings
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Component which will create a new book object in the database
class CreateBook extends Component {
  constructor(props) {
    super(props);
    // store form fields in state
    this.state = {name: '',
      picture: '',
      author: '',
      overview: '',
      original_title: '',
      isbn: '',
      language: '',
      setting: '',
      publisher: '',
      date: '',
      genres: ['Art', 'Biography', 'Business',
        'Childrens', 'Classics', 'Comics', 'Contemporary',
        'Cooking', 'Crime', 'Fantasy', 'Fiction', 'History',
        'Horror', 'Comedy', 'Mystery', 'Nonfiction',
        'Paranormal', 'Science Fiction', 'Sports', 'Travel',
        'Young Adult', 'Thriller', 'Romance'],
      selectedGenre:''};

    // Bind event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // Update the state whenever the input fields are changed
    const name = event.target.name;
    const value = event.target.value;

    // Set the selection value based on the option selected
    this.setState({[name]: value});
  }

  // Submit event handler
  handleSubmit(event) {
    // Prevent the submit button from a default submission
    event.preventDefault();

    // Send a POST request to the server which contains the state of each book that is created
    axios.post('/api/users', this.state)
      // If the POST request is successful then go back to the BookList component
      .then(res => this.props.history.push('/booklist'))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // Draw the Form
    return (
      <div id="NavBar">
        <div className="container">
          <h2 className=" title is-large is-size-1 has-text-left has-text-primary is-full">Add a new Book</h2>
          <div className="columns">
            <div className="column is-7">
              {/* All input elements are contained in the form which handles the submission event to the server and sets the input value to the state value of the element*/}
              <form onSubmit={this.handleSubmit}>
                {/* Book title */}
                <div className="field">
                  <label className="label is-size-4">Book Title</label>
                  <div className="control">
                    <input className="input" type="text" name="name" value={this.state.name} onChange={this.handleChange}  placeholder="Name of the book" required/>
                  </div>
                </div>
                {/* Image URL */}
                <div className="field">
                  <label className="label is-size-4">Picture</label>
                  <div className="control">
                    <input className="input" type="text" name="picture" value={this.state.picture} onChange={this.handleChange}  placeholder="URL input" required/>
                  </div>
                </div>
                {/* Overview - is a larger text area */}
                <div className="field">
                  <label className="label is-size-4">Overview</label>
                  <div className="control">
                    <textarea className="textarea" name="overview" value={this.state.overview} onChange={this.handleChange} placeholder="Write Description here" required></textarea>
                  </div>
                </div>
                {/* Genre Dropdown */}
                <div className="field">
                  <label className="label is-size-4">Genre</label>
                  <div className="control">
                    <div className="select">
                      {/* Assign the dropdown selection value when clicked */}
                      <select required name="selectedGenre" value={this.state.selectedGenre}
                        onChange={(e) => this.setState({selectedGenre: e.target.value})}>
                        {
                          // Map the genre array and place each element as an option in the dropdown
                          this.state.genres.map((genre) =>
                            <option key={genre} value={genre}>{genre}</option>
                          )
                        }
                      </select>
                    </div>
                  </div>
                </div>
                {/* Author Name */}
                <div className="field">
                  <label className="label is-size-4">Author</label>
                  <div className="control">
                    <input className="input" type="text" name="author" value={this.state.author} onChange={this.handleChange}  placeholder="Author's full name" required/>
                  </div>
                </div>
                {/* Release Date - in date format */}
                <div className="field">
                  <label className="label is-size-4">Date Published</label>
                  <div className="control">
                    <input className="input" type="date" name="date" value={this.state.date} onChange={this.handleChange}  placeholder="date/month/year" required />
                  </div>
                </div>
                {/* Publisher Name */}
                <div className="field">
                  <label className="label is-size-4">Publisher</label>
                  <div className="control">
                    <input className="input" type="text" name="publisher" value={this.state.publisher} onChange={this.handleChange}  placeholder="Publisher name" required/>
                  </div>
                </div>
                {/* Original Title */}
                <div className="field">
                  <label className="label is-size-4">Original Title</label>
                  <div className="control">
                    <input className="input" type="text" name="original_title" value={this.state.original_title} onChange={this.handleChange}  placeholder="Write the original title" required/>
                  </div>
                </div>
                {/* Language */}
                <div className="field">
                  <label className="label is-size-4">Edition Language</label>
                  <div className="control">
                    <input className="input" type="text" name="language" value={this.state.language} onChange={this.handleChange}  placeholder="Language" required/>
                  </div>
                </div>
                {/* Book ISBN number */}
                <div className="field">
                  <label className="label is-size-4">ISBN</label>
                  <div className="control">
                    <input className="input" type="text" name="isbn" value={this.state.isbn} onChange={this.handleChange}  placeholder="ISBN number" required/>
                  </div>
                </div>
                {/* Story setting */}
                <div className="field">
                  <label className="label is-size-4">Setting</label>
                  <div className="control">
                    <input className="input" type="text" name="setting" value={this.state.setting} onChange={this.handleChange}  placeholder="eg. District 12, Panem Capitol, Panem" required />
                  </div>
                </div>
                {/* Submit button*/}
                <div className="control">
                  <button type="submit" value="Submit" className="button is-primary">Submit</button>
                </div>
              </form>
            </div>
            {/* Image */}
            <div className="column">
              <img id="stickyImage" alt="Book Pile" src="../Images/girl.png" width="600" height="600"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Export component
export default CreateBook;
