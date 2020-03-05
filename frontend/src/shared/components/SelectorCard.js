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
    onToggle: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {selected: false};
    this.setState({selected: props.selected});
  }

  render() {
    const { onToggle, onEdit, onDelete, selected, dataPoint } = this.props;
    return (
      <div>
        <div>
          SelectorCard: {selected ? 'selected' : 'not selected'}.
        </div>
        <div>
          {typeof onToggle !== "undefined" && (
            <button onClick={() => {return onToggle(dataPoint)}}>
              {selected ? 'Unselect' : 'Select' }
            </button>
          )}
          {typeof onEdit !== "undefined" && (
            <button onClick={() => {return onEdit(dataPoint)}}>
              Edit
            </button>
          )}
          {typeof onDelete !== "undefined" && (
            <button onClick={() => {return onDelete(dataPoint)}}>
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default SelectorCard