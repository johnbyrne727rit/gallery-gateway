import React from 'react'
import {Container} from 'reactstrap'
import {graphql} from 'react-apollo'
import {compose} from 'recompose'

import ScholarshipQuery from '../queries/scholarship.graphql'
import EditScholarshipForm from '../containers/EditScholarshipForm'

const EditScholarship = props => (
  <Container>
    <h1>Edit Scholarship</h1>
    {props.scholarship ? <EditScholarshipForm scholarship={props.scholarship} editMode={true}/> : null}
  </Container>
)

export default compose(
  graphql(ScholarshipQuery, {
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id
      }
    }),
    props: ({data: {scholarship, loading}}) => ({
      scholarship,
      loading
    })
  })
)(EditScholarship)
