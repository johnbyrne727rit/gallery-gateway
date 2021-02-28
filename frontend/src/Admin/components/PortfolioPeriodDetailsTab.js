import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'reactstrap'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import FaEdit from '@fortawesome/fontawesome-free-solid/faEdit'

class PortfolioPeriodDetailsTab extends Component {
  static propTypes = {
    portfolioPeriod: PropTypes.shape({
      description: PropTypes.string,
      numPieces: PropTypes.number.isRequired
    }).isRequired
  }

  render () {
    const { portfolioPeriod } = this.props
    return (
      <Fragment>
        <Row>
          <Col>
            {portfolioPeriod.description ? (
              <Fragment>
                <dt>Description</dt>
                <dd>{portfolioPeriod.description}</dd>
              </Fragment>
            ) : null}
            <dt>Pieces per portfolio</dt>
            <dd>{portfolioPeriod.numPieces}</dd>
          </Col>
          <Col>
            <Button
              color='dark'
              className='text-left'
              outline
              block
              tag={Link}
              to={`/portfolio/${portfolioPeriod.id}/edit`}
            >
              <FontAwesomeIcon icon={FaEdit} className='align-middle' /> Edit
              Portfolio Period Details
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {portfolioPeriod.scholarships.length > 0 ? (
              <Fragment>
                <dt>Available Scholarships</dt>
                {portfolioPeriod.scholarships.map(scholarship => {
                  return (
                    <dd>{scholarship.name}</dd>
                  )
                })}
              </Fragment>
            ) : null}
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default PortfolioPeriodDetailsTab
