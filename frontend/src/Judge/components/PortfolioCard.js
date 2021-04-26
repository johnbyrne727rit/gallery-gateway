import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Button, Row, Col } from 'reactstrap'
import moment from 'moment'

const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-top: 15px;
  padding: 10px;
  width: 100%;
`

const PortfolioCard = props => {
  console.log(props);
  return (<Card>
    <h2>{props.portfolio.id}</h2>
    <Row>
      <Col>
        <h4>Academic Program</h4>
        <p>
        {props.portfolio.academicProgram}
        </p>
      </Col>
       <Col>
        <h4>Number of Pieces</h4>
        <p>
          {props.portfolio.pieces.length}
        </p>
        <Button
          className='mt-5'
          style={{ cursor: 'pointer' }}
          color='primary'
          block
          tag={Link}
          to={`portfolio/${props.id}/vote`}
        >
        Start
        </Button>
      </Col>
    </Row>
  </Card>);
}

PortfolioCard.defaultProps = {
  id: "-1",
  academicProgram: "error",
  Pieces: [],
}

PortfolioCard.propTypes = {
  id: PropTypes.string.isRequired,
  academicProgram: PropTypes.string.isRequired,
  Pieces: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ),
}

export default PortfolioCard
