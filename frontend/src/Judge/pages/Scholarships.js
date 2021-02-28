import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import Scholarships from '../containers/Scholarships'

const Dashboard = () => (
  <Container style={{ paddingTop: '25px' }}>
    <Row>
      <Col>
        <h1>Portfolio Dashboard</h1>
        <Scholarships />
      </Col>
    </Row>
  </Container>
)

export default Dashboard
