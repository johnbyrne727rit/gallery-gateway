/*
Externally Passed:
- bool :        Selected // Set to true or false to control button display and handling
- handler :     HandleSelect // Occurs once the "select" button has been pushed
- handler :     HandleUnselect // Occurs once the "unselect" button is pushed
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SelectorCard extends Component {
  static propTypes = {
    dataPoint: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {selected: false};
    this.setState({selected: props.selected});
  }

  render() {
    return (
      <div>
        <div>
          SelectorCard: {this.props.selected ? 'selected' : 'not selected'}.
        </div>
        <div>
          <button onClick={() => {return this.props.onToggle(this.props.dataPoint)}}>
            {this.props.selected ? 'Unselect' : 'Select' }
          </button>
        </div>
      </div>
    );
  }
}

export default SelectorCard