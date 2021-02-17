import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { displayError } from '../../shared/actions'

import ScholarshipsQuery from '../queries/scholarships.graphql'
import CreateScholarshipMutation from '../mutations/createScholarship.graphql'
import ScholarshipForm from '../components/ScholarshipForm'

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(push('/scholarship')),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(CreateScholarshipMutation, {
    props: ({ mutate }) => ({
      submit: scholarship =>
        mutate({
          variables: { input: scholarship }
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
