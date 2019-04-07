// Import bindings
import React from 'react';
import { Link } from 'react-router-dom';

// This component represents a single Book component
class Book extends React.Component {

  // Draw this component when it gets loaded
  render() {
    return (
      // Each book is a size 2 in a 12 grid column system
      <div className="column is-2">
        <div className="card">
          {/* Set the clickable image element which is styled in app.css file*/}
          <div id="imageContainer">
            <div className="card-image">
              <figure className="image">
                {/* Wrap a link to the ViewBook component which passes the prop id based on the book image that was clicked*/}
                <Link to={`/view-book/${this.props.id}`}>
                  <img id="bookImage" alt="Book Cover" src={this.props.image} />
                </Link>
              </figure>
              <div className="textShow">
                {/* Also add a clickable text element which also leads to the ViewBook component with a passable id in the URL*/}
                <Link className="has-text-primary title is-5" to={`/view-book/${this.props.id}`}>
                  Click to View
                </Link>
              </div>
              {/* Add two buttons inside the book image which is styled in the app.css file*/}
              <div className="middle field is-grouped">
                <div className="control">
                  {/* Wrap the button in a link which leads to the EditBook component*/}
                  <Link to={`/edit-book/${this.props.id}`}>
                    <button className="editButton button is-primary is-outlined is-active" type="button">
                    Edit
                    </button>
                  </Link>
                  {/* Declare an onClick function that gets loaded from the props when it is clicked*/}
                  <button className="deleteButton button is-danger is-outlined" type="button is-active" onClick={() => {this.props.handleDelete(this.props.id);}}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Display the name of each book in the database based on it's id*/}
          <div  className="card-content">
            <div className="media">
              <div className="media-content">
                <h1 className="title is-6">{this.props.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Export component 
export default Book;
