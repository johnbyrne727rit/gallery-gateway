import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import ScholarshipsQuery from '../queries/assignedScholarships.graphql'
import Scholarships from '../components/Scholarships'
import { displayError } from '../../shared/actions'

const mapDispatchToProps = dispatch => ({
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(ScholarshipsQuery, {
    options: () => ({ variables: { date: Date.now() } }),
    props: ({ data: { self, loading, error } }) => ({
      user: self,
      loading,
      error
    })
  })
)(Scholarships)
