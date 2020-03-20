import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import ViewScholarshipsTab from '../containers/ViewScholarshipsTab'

const Scholarships = () => (
  <Container>
    <Row>
      <Col>
        <ViewScholarshipsTab />
      </Col>
    </Row>
  </Container>
)

export default Scholarships
