/*
Must Extend SelectorCard
Externally Passed:
- bool :        Expanded // Set to true or false to control expansion
- handler :     HandleExpanded // Occurs before this component expands
- scholarship : Scholarship // Contains the data displayed here
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import SelectorCard from "./SelectorCard";

class ScholarshipSelectorCard extends Component {
  static propTypes = {
    // Inherited prop types from SelectorCard
    selected: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    // New prop types
    dataPoint: PropTypes.object,
    expanded: PropTypes.bool.isRequired,
    onToggleExpand: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <div>
          ScholarshipSelectorCard: {this.props.dataPoint.name}
        </div>
        <SelectorCard {...this.props}/>
      </div>
    );
  }
}

export default ScholarshipSelectorCard