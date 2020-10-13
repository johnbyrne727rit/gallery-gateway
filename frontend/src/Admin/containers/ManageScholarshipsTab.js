import { compose } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import ScholarshipsQuery from '../queries/scholarships.graphql'
import ManageScholarshipsTab from '../components/ManageScholarshipsTab'
import { displayError } from '../../shared/actions'

const mapDispatchToProps = dispatch => ({
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(ScholarshipsQuery, {
    props: ({ ownProps, data: { scholarship, loading, error } }) => ({
      scholarship,
      loading,
      error
    })
  })
)(ManageScholarshipsTab)
