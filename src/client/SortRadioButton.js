// Import bindings
import React from 'react';

// Compnent which handlers the radio button assortment
class SortRadioButton extends React.Component {
  render() {
    return (
      // Main container
      <div className="container">
        <div className="column">
          <label className="label">Sort Alphabetically?</label>
        </div>
        <div className="column">
          <div className="field is-narrow">
            <div className="control">
              {/* Radio button which has a YES value and stores it in the checked state*/}
              <label className="radio">
                <input type="radio" name="sort" value="yes" checked={this.props.checked === 'yes'} onChange={this.props.handleChange}/>
                yes
              </label>
              {/* Radio button which has a NO value and stores it in the checked state*/}
              <label className="radio">
                <input type="radio" name="sort" value="no" checked={this.props.checked === 'no'} onChange={this.props.handleChange}/>
                no
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Export component
export default SortRadioButton;
