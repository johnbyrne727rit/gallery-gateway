import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { TabContent, TabPane, Container, Row, Col } from 'reactstrap'
import { RoutedTabs, NavTab } from 'react-router-tabs'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'recompose'

import PortfolioPeriodDetailsTab from '../components/PortfolioPeriodDetailsTab'
import PortfolioPeriodQuery from '../queries/portfolioPeriod.graphql'
import Loading from '../../shared/components/Loading'
import NotFound from '../../shared/components/NotFound'

const ViewPortfolioPeriod = props => {
  if (props.loading) {
    return <Loading />
  }

  if (!props.portfolioPeriod) {
    return <NotFound />
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>{props.portfolioPeriod.name}</h1>
        </Col>
      </Row>

      <hr />

      {/* We must use 'match.url' as the base because it contains the show id */}
      <RoutedTabs
        startPathWith={props.match.url}
        className='nav nav-tabs'
        style={{ marginBottom: '1rem' }}
      >
        {/* 'replace={false} makes it so tab navigation is in the browser history */}
        <NavTab exact to='' replace={false} className='nav-item nav-link'>
          Details
        </NavTab>
      </RoutedTabs>

      <TabContent>
        <TabPane>
          <Switch>
            <Route
              exact
              path={`${props.match.path}`}
              render={() => <PortfolioPeriodDetailsTab portfolioPeriod={props.portfolioPeriod} />}
            />
          </Switch>
        </TabPane>
      </TabContent>
    </Container>
  )
}

ViewPortfolioPeriod.propTypes = {
  loading: PropTypes.bool.isRequired,
  portfolioPeriod: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}

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
)(ViewPortfolioPeriod)
