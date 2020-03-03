import React from 'react'
import { Route, Switch } from 'react-router-dom'

// - Shows Dashboard & Tools
import Dashboard from './pages/Dashboard'
import CreateShow from './pages/CreateShow'
import AssignJudges from './pages/AssignJudges'
import PrintableReport from './pages/PrintableReport'
import ViewShow from './pages/ViewShow'
// - Portfolio Dashboard & Tools
import PortfolioDashboard from './pages/PortfolioDashboard'
import CreatePortfolioPeriod from './pages/CreatePortfolioPeriod'
// - Scholarship Dashboard & Tools
import ScholarshipsDashboard from './pages/ScholarshipsDashboard'
// - Misc Tools
import ManageUsers from './pages/ManageUsers'

import Layout from './components/Layout'
import NotFound from '../shared/components/NotFound'

const Admin = () => (
  <Layout>
    <Switch>
      {/* Shows Dashboard & Tools */}
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/show/new' component={CreateShow} />
      <Route exact path='/show/:id/judges/assign' component={AssignJudges} />
      <Route path='/show/:id/print' component={PrintableReport} />
      <Route path='/show/:id' component={ViewShow} />
      {/* Portfolio Dashboard & Tools */}
      <Route exact path='/portfolio' component={PortfolioDashboard}/>
      <Route exact path='/portfolio/new' component={CreatePortfolioPeriod} />
      {/* Scholarship Dashboard & Tools */}
      <Route exact path='/scholarship' component={ScholarshipsDashboard}/>
      {/* Misc Tools */}
      <Route path='/users' component={ManageUsers} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default Admin
