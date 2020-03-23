/*
Must Extend SelectorCard
Externally Passed:
- bool :        Expanded // Set to true or false to control expansion
- handler :     HandleExpanded // Occurs before this component expands
- scholarship : Scholarship // Contains the data displayed here
 */

import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'

import SelectorCard from "./SelectorCard";

class ScholarshipSelectorCard extends Component {
  static propTypes = {
    // Inherited prop types from SelectorCard
    selected: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    // New prop types
    dataPoint: PropTypes.object,
    expanded: PropTypes.bool,
    onToggleExpand: PropTypes.func,
  };

  static defaultProps = {
  };

  render() {
    let {dataPoint} = this.props;
    let title = (
        <Row>
          <Col xs='8'>
            <h3>
              {dataPoint.name}
            </h3>
          </Col>
          <Row xs='4'>
            <Col style={{marginLeft:20}}>
              <Row style={{whiteSpace:'nowrap'}}> GPA </Row>
              <Row> <h4 style={{fontWeight:'bold'}}>
                {dataPoint.gpa}
              </h4> </Row>
            </Col>
            <Col style={{marginLeft:20}}>
              <Row style={{whiteSpace:'nowrap'}}> Year Req. </Row>
              <Row> <h4 style={{fontWeight:'bold'}}>
                {dataPoint.yearStatus}
              </h4> </Row>
            </Col>
            <Col style={{marginLeft:20}}>
              <Row style={{whiteSpace:'nowrap'}}> Photos Req. </Row>
              <Row> <h4 style={{fontWeight:'bold'}}>
                {dataPoint.requiredPhotos}
              </h4> </Row>
            </Col>
          </Row>
        </Row>
    );
    let body = (
      <Fragment>
        {dataPoint.description}
      </Fragment>
    );

    return (
      <div>
        <SelectorCard {...this.props}
          title={title}
          body={body}
        />
      </div>
    );
  }
}

export default ScholarshipSelectorCard