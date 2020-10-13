import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

import ManageScholarshipsTab from '../containers/ManageScholarshipsTab'

function ScholarshipsDashboard () {
  return (
    <Container>
      <Row className='align-items-baseline'>
        <Col>
          <h1>Scholarships Dashboard</h1>
        </Col>
        <Col md='3'>
          <Button
            color='primary'
            className='btn-block'
            style={{ cursor: 'pointer' }}
            tag={Link}
            to='/scholarship/new'
          >
            Create Scholarship
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ManageScholarshipsTab />
        </Col>
      </Row>
    </Container>
  )
}

export default ScholarshipsDashboard
