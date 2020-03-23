/*
Must Extend SelectorCard
Externally Passed:
- bool :        Expanded // Set to true or false to control expansion
- handler :     HandleExpanded // Occurs before this component expands
- scholarship : Scholarship // Contains the data displayed here
 */

import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Row, Col, CardBody} from 'reactstrap'

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
        <Col>
          <Row>
            <Col style={{marginLeft:20}}>
              <Row style={{whiteSpace:'nowrap'}}> Full-Time </Row>
              <Row> <h4 style={{fontWeight:'bold'}}>
                {dataPoint.fulltime ? 'Y' : 'N'}
              </h4> </Row>
            </Col>
            <Col style={{marginLeft:20}}>
              <Row style={{whiteSpace:'nowrap'}}> Renewable </Row>
              <Row> <h4 style={{fontWeight:'bold'}}>
                {dataPoint.renewable ? 'Y' : 'N'}
              </h4> </Row>
            </Col>
            <Col style={{marginLeft:20}}>
              <Row style={{whiteSpace:'nowrap'}}> Programs </Row>
              <Row> <h4 style={{fontWeight:'bold'}}>
                {dataPoint.degreePrograms}
              </h4> </Row>
            </Col>
            <Col style={{marginLeft:20}}>
              <Row style={{whiteSpace:'nowrap'}}> Essay Req. </Row>
              <Row> <h4 style={{fontWeight:'bold'}}>
                {dataPoint.requiresEssay ? 'Y' : 'N'}
              </h4> </Row>
            </Col>
          </Row>
          <hr/>
          {dataPoint.description}
          {JSON.stringify(dataPoint)}
        </Col>
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