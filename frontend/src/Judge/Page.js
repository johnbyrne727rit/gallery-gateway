import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import ScholarshipsDashboard from './pages/Scholarships'
import Review from './pages/Review'
import Portfolios from './pages/PortfoliosView'
import Vote from './pages/Vote'
import PortfolioVote from './pages/PortfolioVote'

import Layout from './components/Layout'
import NotFound from '../shared/components/NotFound'

const Judge = () => (
  <Layout>
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/show/:id' component={Review} />
      <Route exact path='/scholarship/:id' component={Portfolios} />
      <Route exact path='/scholarships' component={ScholarshipsDashboard} />
      <Route exact path='/show/:id/vote' component={Vote} />
      <Route exact path='/portfolio/:id/vote' component={PortfolioVote} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
)

export default Judge
