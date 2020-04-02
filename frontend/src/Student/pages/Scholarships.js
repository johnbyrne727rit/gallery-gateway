import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import ViewScholarshipsTab from '../containers/ViewScholarshipsTab'

const addIdPropFromQueryParams = () => {
  return window.location.search.split('=')[1]
}

const Scholarships = () => (
  <Container>
    <Row>
      <Col>
        <ViewScholarshipsTab id={addIdPropFromQueryParams()}/>
      </Col>
    </Row>
  </Container>
)

export default Scholarships
