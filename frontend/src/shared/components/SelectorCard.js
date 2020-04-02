/*
Externally Passed:
- bool :        Selected // Set to true or false to control button display and handling
- handler :     HandleSelect // Occurs once the "select" button has been pushed
- handler :     HandleUnselect // Occurs once the "unselect" button is pushed
 */

import React, {Component, Fragment} from 'react'
import {Button, Row, Col, Container, CardBlock, Collapse} from "reactstrap";
import PropTypes from 'prop-types'
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import FaCaretRight from "@fortawesome/fontawesome-free-solid/faCaretRight";
import FaCaretLeft from "@fortawesome/fontawesome-free-solid/faCaretLeft";

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
    onExpandCollapse: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
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
  }

  renderButtons(props) {
    const { onToggle, onEdit, onDelete, dataPoint, selected } = props;

    return (
      <Fragment>
        <Row noGutters={true}>
          {onEdit && (
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
          {onDelete && (
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
          {onToggle && (
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

  toggleExpand = () => {
    const { onExpandCollapse, dataPoint } = this.props;
    if (onExpandCollapse) {
      onExpandCollapse(dataPoint);
    }
  };

  // The whole render operation
  render() {
    const { body, title, expanded, selected } = this.props;
    return (
      <Card>
        <Row>
          <Col>
            <Button
              md="1"
              block
              onClick={this.toggleExpand}
              style={{ alignItems: 'center' }}
            >
              {!expanded ? (
                <FontAwesomeIcon icon={FaCaretLeft} className='mr-2' size='lg'/>
                ) : (
                <FontAwesomeIcon icon={FaCaretRight} size='lg'/>
              )}
            </Button>
          </Col>
          <Col md="8">
            {title}
          </Col>
          <Col md="3">
            { this.renderButtons(this.props) }
          </Col>
        </Row>
        <div className={expanded ? 'collapse show' : 'collapse' }>
          {body}
        </div>
      </Card>
    );
  }
}

export default SelectorCard