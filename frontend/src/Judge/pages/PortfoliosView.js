import React from 'react'
import styled from 'styled-components'
import { Container, Button, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Portfolios from '../containers/Portfolios'

const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-top: 15px;
  padding: 10px;
  width: 100%;
`

const PortfoliosView = (props) => (
  <Container style={{ paddingTop: '25px' }}>
    <Row>
      <Col>
        <h1>Portfolios</h1>
        <Portfolios id={props.match.params.id}></Portfolios>
      </Col>
    </Row>
  </Container>
)

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    portId: ownProps.match.params.id,
  }
}

export default compose(connect(null, mapDispatchToProps))(PortfoliosView)
