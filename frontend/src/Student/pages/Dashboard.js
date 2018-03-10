import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'

import Shows from '../containers/Shows'

const Dashboard = props => (
  <Container>
    <Row>
      <Col>
        <Shows studentUsername={props.studentUsername}/>
        {/* TODO: Show all open shows w/ link to any submissions a student made to them */}
      </Col>
    </Row>
  </Container>
)

const mapStateToProps = ({ student }, ownProps) => ({
  show: student.shows[ownProps.match.params.id]
})

export default connect(mapStateToProps)(Dashboard)
