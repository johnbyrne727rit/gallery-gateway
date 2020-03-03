import React, {Component} from 'react'
import PropTypes from 'prop-types'

import SelectorTable from "./SelectorTable";
import ScholarshipSelectorCard from "./ScholarshipSelectorCard";

class ScholarshipSelectorTable extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: []};
  }

  static propTypes = {
    // Inherited props
    dataPoints: PropTypes.array.isRequired,
    unique: PropTypes.string.isRequired,
    selected: PropTypes.object.isRequired,
    cardTemplate: PropTypes.func.isRequired,
    cardTemplateProps: PropTypes.object,
    onChange: PropTypes.func.isRequired,

    // New props
  };

  static defaultProps = {
    // Inherited props defaults
    dataPoints: [],
    selected: {},
    // NOT USED cardTemplate: SelectorCard,
    cardTemplateProps: {},

    // New props defaults
    cardTemplate: ScholarshipSelectorCard,
  };

  handleToggleExpand = template => {

  };

  render() {

    this.props.cardTemplateProps.onToggleExport = this.handleToggleExpand;

    return <div>
      <div>
        ScholarshipSelectorTable
      </div>
      <SelectorTable
        {...this.props}
      />
    </div>;
  }
}

export default ScholarshipSelectorTable