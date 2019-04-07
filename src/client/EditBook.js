// Import bindings
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Component which will get book based on the selected id and update the values
class EditBook extends Component {
  constructor(props) {
    super(props);
    // store information relating to the book in the state
    this.state = {_id: '',
      name: '',
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

  componentDidMount() {
    // When the component mounts, get the data relating to the book
    // The book's id is passed in through the URL which is then accessed by props
    axios.get('/api/users/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          // Set the response values and assign to this component's state
          _id: response.data._id,
          name: response.data.name,
          picture: response.data.picture,
          author: response.data.author,
          overview: response.data.overview,
          original_title: response.data.original_title,
          isbn: response.data.isbn,
          language: response.data.language,
          setting: response.data.setting,
          publisher: response.data.publisher,
          date: response.data.date,
          selectedGenre: response.data.selectedGenre
        });
      })
      .catch(error => {
        console.log(error);
      });
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

    // Send a PUT request to the server which includes the state with the updated values
    // console.log(this.state);
    axios.put('/api/users', this.state)
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
          <h2 className=" title is-large is-size-1 has-text-left has-text-primary is-full">Edit: {this.state.name}</h2>
          <div className="columns">
            <div className="column is-7">
              {/* All input elements are contained in the form which handles the submission event to the server and sets the input value to the state value of the element*/}
              <form onSubmit={this.handleSubmit}>
                {/* Book title */}
                <div className="field">
                  <label className="label is-size-4">Book Title</label>
                  <div className="control">
                    <input className="input" type="text" name="name" value={this.state.name} onChange={this.handleChange}  placeholder="Name of the book" />
                  </div>
                </div>
                {/* Image URL */}
                <div className="field">
                  <label className="label is-size-4">Picture</label>
                  <div className="control">
                    <input className="input" type="text" name="picture" value={this.state.picture} onChange={this.handleChange}  placeholder="URL input" />
                  </div>
                </div>
                {/* Overview - is a larger text area */}
                <div className="field">
                  <label className="label is-size-4">Overview</label>
                  <div className="control">
                    <textarea className="textarea" name="overview" value={this.state.overview} onChange={this.handleChange} placeholder="Write Description here"></textarea>
                  </div>
                </div>
                {/* Genre Dropdown */}
                <div className="field">
                  <label className="label is-size-4">Genre</label>
                  <div className="control">
                    <div className="select">
                      {/* Assign the dropdown selection value when clicked */}
                      <select value={this.state.selectedGenre}
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
                    <input className="input" type="text" name="author" value={this.state.author} onChange={this.handleChange}  placeholder="Author's full name" />
                  </div>
                </div>
                {/* Release Date - in date format */}
                <div className="field">
                  <label className="label is-size-4">Date Published</label>
                  <div className="control">
                    <input className="input" type="date" name="date" value={this.state.date} onChange={this.handleChange}  placeholder="date/month/year" />
                  </div>
                </div>
                {/* Publisher Name */}
                <div className="field">
                  <label className="label is-size-4">Publisher</label>
                  <div className="control">
                    <input className="input" type="text" name="publisher" value={this.state.publisher} onChange={this.handleChange}  placeholder="Publisher name" />
                  </div>
                </div>
                {/* Original Title */}
                <div className="field">
                  <label className="label is-size-4">Original Title</label>
                  <div className="control">
                    <input className="input" type="text" name="original_title" value={this.state.original_title} onChange={this.handleChange}  placeholder="Write the original title" />
                  </div>
                </div>
                {/* Language */}
                <div className="field">
                  <label className="label is-size-4">Edition Language</label>
                  <div className="control">
                    <input className="input" type="text" name="language" value={this.state.language} onChange={this.handleChange}  placeholder="Language" />
                  </div>
                </div>
                {/* Book ISBN number */}
                <div className="field">
                  <label className="label is-size-4">ISBN</label>
                  <div className="control">
                    <input className="input" type="text" name="isbn" value={this.state.isbn} onChange={this.handleChange}  placeholder="ISBN number" />
                  </div>
                </div>
                {/* Story setting */}
                <div className="field">
                  <label className="label is-size-4">Setting</label>
                  <div className="control">
                    <input className="input" type="text" name="setting" value={this.state.setting} onChange={this.handleChange}  placeholder="eg. District 12, Panem Capitol, Panem" />
                  </div>
                </div>
                {/* Submit button*/}
                <div className="control">
                  <button type="submit" value="Submit" className="button is-primary">Submit</button>
                </div>
              </form>
            </div>
            {/* Image which is accessed through the specific book's state*/}
            <div className="column">
              <img id="stickyImage" alt="Book Pile" src={this.state.picture} width="300" height="300"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Export component
export default EditBook;
