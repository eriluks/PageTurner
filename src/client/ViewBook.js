// Import bindings
import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
// Import installed components
import StarRatingComponent from 'react-star-rating-component';
import ShowMoreText from 'react-show-more-text';
// Import the Book component
import Book from './Book';

// Component which handles the book's full information panel
class ViewBook extends Component {
  constructor(props) {
    super(props);
    // Store values in state
    this.state = {
      rating: null,
      isHidden: true,
      id: null
    };
  }

  // Star review event handler which checks for the previous and next values
  onStarClick(nextValue, prevValue, name) {
    this.setState({
      rating: nextValue,
      isHidden: true
    });
  }

  componentDidMount() {
    // When the component mounts fetch the book's value which is passed through the id
    axios.get('/api/users/' + this.props.match.params.id)
      .then(response => {
        // Store values to state
        this.setState({
          id: response.data._id,
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
          genre: response.data.selectedGenre,
          isHidden: !this.state.isHidden
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // Set the rating to state
    const { rating } = this.state;
    // Draw the component
    return (
      // Create an id reference which is styled in the app.css file
      <div id="NavBar">
        {/* Main container */}
        <div className="contrainer">
          <div className="container">
            {/* Show the title of the book based on the state's name value */}
            <h2 className=" title is-large is-size-1 has-text-left has-text-primary">{this.state.name}</h2>
            <div className="columns is-gapless">
              <div className="column is-one-quarter">
                <div className="card">
                  <div className="card-image">
                    <figure className="image">
                      {/* Show the book image based on the state's value */}
                      <img alt='Movie' src={this.state.picture}></img>
                    </figure>
                    {/* Draw the review stars and create a class name that is accessed through the app.css styling sheet */}
                    <div className="column review">
                      {/* Get the rating star component */}
                      <StarRatingComponent
                        name="rate1"
                        // The amount of stars that are drawn
                        starCount={5}
                        // Set the value
                        value={rating}
                        // Set the star click handler
                        onStarClick={this.onStarClick.bind(this)}
                      />
                      {/* Check if the stars are hidden and show the star value */}
                      {this.state.isHidden ?  <h2 className="subtitle is-5"> You rated {rating} stars!</h2> : null }
                    </div>
                    <div className="column">
                      <div className="control">
                        {/* Wrap the button in a link which leads to the EditBook component*/}
                        <Link to={`/edit-book/${this.state.id}`}>
                          <button className="button is-primary is-fullwidth" type="button">
                          Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                {/* Each of the card content is styled and data associated with each book is displayed through the state */}
                <div className="card">
                  <div className="card-content">
                    <h1 className="title is-2">{this.state.name}</h1>
                    <p className="subtitle is-5">Author: <b>{this.state.author}</b>
                      <br />
                    </p>
                    <p className="subtitle is-6"><i>{this.state.date}</i></p>
                    <hr />
                    <h1 className="title is-5"> <b>Movie Description: </b></h1>
                    {/* Get the ShowMoreText component which will enable and disable the reading format of the overview */}
                    <ShowMoreText
                      // Initially display only 3 lines of the paragraph
                      lines={3}
                      // Text value for more
                      more='Show more'
                      // Text value for less
                      less='Show less'
                      anchorClass=''
                      // Execute the on click handler
                      onClick={this.executeOnClick}>
                      {/* Get the overview value from the state */}
                      <p>{this.state.overview}</p>
                    </ShowMoreText>
                    <br />
                    <br />
                    <h4> <b>Genre: </b> {this.state.genre}</h4>
                    <h4> <b>Original Title:</b> {this.state.original_title}</h4>
                    <h4> <b>ISBN:</b> {this.state.isbn}</h4>
                    <h4> <b>Edition Language:</b> {this.state.language}</h4>
                    <h4> <b>Setting:</b> {this.state.setting}</h4>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Export component
export default ViewBook;
