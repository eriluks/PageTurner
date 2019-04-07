// Import bindings
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Render the virtual React DOM
ReactDOM.render(
  <div>
    {/* Render the App component*/}
    <App />
    {/* The footer of the application*/}
    <footer id="NavBar" className="footer has-background-primary is-fixed-bottom">
      <div className="content has-text-centered">
        <p>
          <strong>PageTurner</strong> by Erika Volodko. The source code can be found on
          <a href="https://github.com/eriluks/MoviePop"> GitHub</a>.
        </p>
        <img src="../Images/book.png"></img>
      </div>
    </footer>
  </div>, document.getElementById('root')
);
