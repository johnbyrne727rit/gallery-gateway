import React, {Component} from 'react'
import PropTypes from 'prop-types'

import SelectorCard from "./SelectorCard";

class SelectorTable extends Component {
  static propTypes = {
    dataPoints: PropTypes.array.isRequired,
    unique: PropTypes.string.isRequired,
    // TODO: This is changed for SelectorTable, rewrite
    // eg. if 'unique' is 'username',
    // 'selected' could be used like:
    // { user1: true, user2: true }
    // but should not be used like:
    // { user1: false }
    // as this component only checks for prescence in 'selected' and total
    // number of keys. In the second example 'user1' would still be considered selected.
    // Also note, this component does not verify that the keys in 'selected' are valid 'unique' properties in 'data'.
    selected: PropTypes.object.isRequired,
    cardTemplate: PropTypes.func.isRequired,
    cardTemplateProps: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    dataPoints: [],
    selected: {},
    cardTemplate: SelectorCard,
    cardTemplateProps: {},
  };

  constructor(props) {
    super(props);
    this.state = { expanded: null };
  };

  handleToggle = dataPoint => {
    console.log("SelectorTable.handleToggle()");
    const {onChange, unique, selected} = this.props;

    const newSelected = {
      ...selected
    };
    if (newSelected[dataPoint[unique]]) {
      // We're unchecking this row, so remove the key
      delete newSelected[dataPoint[unique]];
    } else {
      // We're checking this row, so add it in
      newSelected[dataPoint[unique]] = true
    }

    onChange(newSelected);
  };

  cardExpandCollapse = (dataPoint) => {
    if (dataPoint === this.state.expanded) {
      this.setState({expanded: null});
    } else {
      this.setState({expanded: dataPoint});
    }
  };

  render() {
    const Template = this.props.cardTemplate;
    const allowSelectUnselect = (typeof this.props.onChange !== "undefined");

    const listedCards = this.props.dataPoints.map((dataPoint) => {
      let thisSelected;
      let {unique, selected} = this.props;
      let {expanded} = this.state;
      if (selected[dataPoint[unique]]) {
        thisSelected = selected[dataPoint[unique]];
      } else {
        thisSelected = false;
      }
      let thisExpanded = (expanded === dataPoint);
      console.log(thisExpanded);
      let key = selected[dataPoint[unique]];
      if (allowSelectUnselect) {
        return <Template
          key={key}
          selected={thisSelected}
          onExpandCollapse={this.cardExpandCollapse}
          expanded={thisExpanded}
          dataPoint={dataPoint}
          onToggle={this.handleToggle}
          {...this.props.cardTemplateProps}
        />;
      } else {
        return <Template
          key={key}
          selected={thisSelected}
          onExpandCollapse={this.cardExpandCollapse}
          expanded={thisExpanded}
          dataPoint={dataPoint}
          {...this.props.cardTemplateProps}
        />;
      }
    });

    return (
      <div>
        <div key="ChildDiv">
          {listedCards}
        </div>
      </div>
    );
  }
}

export default SelectorTable
