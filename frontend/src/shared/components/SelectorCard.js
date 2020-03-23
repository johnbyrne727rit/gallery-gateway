/*
Externally Passed:
- bool :        Selected // Set to true or false to control button display and handling
- handler :     HandleSelect // Occurs once the "select" button has been pushed
- handler :     HandleUnselect // Occurs once the "unselect" button is pushed
 */

import React, {Component, Fragment} from 'react'
import {Button, Row, Col, Container} from "reactstrap";
import PropTypes from 'prop-types'
import styled from "styled-components";

const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-top: 15px;
  padding: 10px;
  width: 100%;
`

class SelectorCard extends Component {
  static propTypes = {
    title: PropTypes.object,
    body: PropTypes.object,
    dataPoint: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onToggle: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    title: "",
    body: "",
  };

  constructor(props) {
    super(props);
    this.state = {selected: false};
    this.setState({selected: props.selected});
  }

  renderButtons(props) {
    const {onToggle, onEdit, onDelete, dataPoint, selected} = props;


    return (
      <Fragment>
        <Row noGutters={true}>
          {typeof onEdit !== "undefined" && (
            <Col>
              <Button
                onClick={() => {
                  return onEdit(dataPoint)
                }}
                color='primary'
                block
              >
                Edit
              </Button>
            </Col>
          )}
          {typeof onDelete !== "undefined" && (
            <Col>
              <Button
                onClick={() => {
                  return onDelete(dataPoint)
                }}
                color='danger'
                block
              >
                Delete
              </Button>
            </Col>
          )}
          {typeof onToggle !== "undefined" && (
            <Col>
              <Button
                onClick={() => {
                  return onToggle(dataPoint)
                }}
                color='primary'
                block
              >
                {selected ? 'Unselect' : 'Select'}
              </Button>
            </Col>
          )}
        </Row>
      </Fragment>
    );
  }

  // The whole render operation
  render() {
    const {selected, body, title} = this.props;
    return (
      <Card>
        <Row>
          <Col md="9">
            {title}
          </Col>
          <Col md="3">
            { this.renderButtons(this.props) }
          </Col>
        </Row>
        {body}
      </Card>
    );
  }
}

export default SelectorCard