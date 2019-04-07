// Import bindings
import React, { Component } from 'react';

// Home component which holds all the information on the application
class Home extends Component {
  // Draw the react component
  render() {
    return (
      // Create an id reference which is styled in the app.css file
      <div id="NavBar">
        {/* Main container with an id referened accessed through the app.css file */}
        <div className="container" id="home">
          {/* Draw 2 columns */}
          <div className="columns">
            <div className="column">
              {/* Text column */}
              <h2 className=" title is-large is-size-1 has-text-primary">Welcome!</h2>
              <p>PageTurner is a book library website created using <b title="React is a JavaScript library created by Facebook.">React
              </b>. It was styled through <a href="https://bulma.io/"><b>Bulma</b></a> and <b title="CSS stands for Cascading Style Sheets
              CSS describes how HTML elements are to be displayed"> CSS </b>.
              The user can view a list of books, add, delete and edit a book of their choosing. The styling of the website is simple and easy to nagivate so any user from various
              ages can get accustumed to it.<br /><br />
              Each book has it's own genre. The user can search a book from the genre carousel slider with the icons
              and names of each book specified, or by using the dropdown selection. It is also possible to search for a specific book from the "Search" page
              which will enable the user to find a certain book based on the keywords of the book's title.
              </p>
            </div>
            {/* Image column */}
            <div className="column">
              <img alt="Book Pile" src="../Images/bookPile.png" width="300" height="300"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Export the component
export default Home;
