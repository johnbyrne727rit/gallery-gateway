import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { displayError } from '../../shared/actions'

import PortfolioPeriodsQuery from '../queries/portfolioPeriods.graphql'
import ScholarshipsQuery from '../queries/scholarships.graphql'
import CreatePortfolioPeriodMutation from '../mutations/createPortfolioPeriod.graphql'
import PortfolioPeriodForm from '../components/PortfolioPeriodForm'

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(push('/portfolio')),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(ScholarshipsQuery, {
    props: (
      { data: { scholarships, loading, error } }) => ({
      scholarships,
      loading,
      error
    })
  }),
  graphql(CreatePortfolioPeriodMutation, {
    props: ({ mutate }) => ({
      create: (portfolioPeriod, scholarshipList) =>
        mutate({
          variables: { input: portfolioPeriod, scholarships: scholarshipList }
        })
    }),
    options: () => ({
      refetchQueries: [
        {
          query: PortfolioPeriodsQuery
        }
      ]
    })
  })
)(PortfolioPeriodForm)
