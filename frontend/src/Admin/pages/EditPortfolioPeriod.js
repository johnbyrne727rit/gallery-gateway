import React from 'react'
import { Container } from 'reactstrap'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

import EditPortfolioPeriodForm from '../containers/EditPortfolioPeriodForm'
import PortfolioPeriodQuery from '../queries/portfolioPeriod.graphql'

const EditPortfolioPeriod = props => (
  <Container>
    <h1>Edit Portfolio Period</h1>
    { props.portfolioPeriod ? <EditPortfolioPeriodForm portfolioPeriod={props.portfolioPeriod} /> : null }
  </Container>
)

export default compose(
  graphql(PortfolioPeriodQuery, {
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id
      }
    }),
    props: ({ data: { portfolioPeriod, loading } }) => ({
      portfolioPeriod,
      loading
    })
  })
)(EditPortfolioPeriod)
