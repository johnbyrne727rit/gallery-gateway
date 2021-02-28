import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose, mapProps } from 'recompose'
import { displayError } from '../../shared/actions'

import EditScholarshipMutation from '../mutations/editScholarship.graphql'
import ScholarshipsQuery from '../queries/scholarships.graphql'
import ScholarshipForm from '../components/ScholarshipForm';

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(push('/scholarship')),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(EditScholarshipMutation, {
    props: ({ mutate, ownProps }) => ({
      submit: scholarship =>
        mutate({
          variables: { id: ownProps.scholarship.id, input: scholarship }
        })
    }),
    options: () => ({
      refetchQueries: [
        {
          query: ScholarshipsQuery
        }
      ]
    })
  })
)(ScholarshipForm)
