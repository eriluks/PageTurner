// Import bindings
import React from 'react';
import {
  Link,
  HashRouter,
  Route } from 'react-router-dom';
// Import Components
import Home from './Home';
import CreateBook from './CreateBook';
import EditBook from './EditBook';
import BookList from './BookList';
import Search from './Search';
import ViewBook from './ViewBook';
import Genre from './Genre';

// This is the main component, other component routes are set up here
const App = () => {
  return(
    // Router element which will enable a single page navigation system
    <HashRouter>
      <div className="columns">
        <div className="column">
          <nav className="navbar  has-background-primary is-full" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <div className="navbar-item">
                <img src="../Images/book.png" width="132" height="38"></img>
              </div>
            </div>
            {/* Navigation Bar with a list of links*/}
            <div id="navbarBasicExample" className="navbar-menu is-active has-background-primary is-full">
              <div className="navbar-end">
                {/* When clicked it will lead to the home page which is the default*/}
                <Link className="has-text-white" to="/">
                  <li className ="navbar-item is-size-4 is-primary button">
                    Home
                  </li>
                </Link>
                {/* When clicked it will render the BookList component*/}
                <Link className="has-text-white" to="/booklist">
                  <li className ="navbar-item is-size-4 is-primary button">
                    Books
                  </li>
                </Link>
                {/* When clicked the CreateBook component will be loaded*/}
                <Link className="has-text-white" to="/create-book">
                  <li className ="navbar-item is-size-4 is-primary button">
                    Add a book
                  </li>
                </Link>
                {/* When clicked the Search component is loaded*/}
                <Link className="has-text-white" to="/search">
                  <li className ="navbar-item is-size-4 is-primary button">
                    Search
                  </li>
                </Link>
              </div>
            </div>
          </nav>
          {/* Route to the component paths*/}
          <Route exact path="/" component={Home}/>
          <Route path="/booklist" component={BookList}/>
          <Route path="/create-book" component={CreateBook}/>
          <Route path="/search" component={Search}/>
          {/* Pass the required elements and set them to the URL path*/}
          <Route path="/edit-book/:id" component={EditBook}/>
          <Route path="/view-book/:id" component={ViewBook}/>
          <Route path="/genre/:genre" component={Genre}/>
        </div>
      </div>
    </HashRouter>
  );
};

// Export this component
export default App;
