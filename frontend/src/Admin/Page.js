import React from 'react'
import { Route, Switch } from 'react-router-dom'

// - Shows Dashboard & Tools
import Dashboard from './pages/Dashboard'
import CreateShow from './pages/CreateShow'
import EditShow from './pages/EditShow'
import AssignJudges from './pages/AssignJudges'
import PrintableReport from './pages/PrintableReport'
import ViewShow from './pages/ViewShow'

// - Portfolio Dashboard & Tools
import PortfolioDashboard from './pages/PortfolioDashboard'
import AssignPortfolioJudges from './pages/AssignPortfolioJudges'
import CreatePortfolioPeriod from './pages/CreatePortfolioPeriod'
import ViewPortfolioPeriod from './pages/ViewPortfolioPeriod'
import EditPortfolioPeriod from './pages/EditPortfolioPeriod'

// - Scholarship Dashboard & Tools
import ScholarshipsDashboard from './pages/ScholarshipsDashboard'
import CreateScholarship from './pages/CreateScholarship'

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
      <Route exact path='/show/:id/edit' component={EditShow} />
      <Route path='/show/:id/print' component={PrintableReport} />
      <Route path='/show/:id' component={ViewShow} />
      {/* Portfolio Period Dashboard & Tools */}
      <Route exact path='/portfolio' component={PortfolioDashboard}/>
      <Route exact path='/portfolio/new' component={CreatePortfolioPeriod} />
      <Route exact path='/portfolio/:id/judges/assign' component={AssignPortfolioJudges} />
      <Route path='/portfolio/:id/edit' component={EditPortfolioPeriod} />
      <Route path='/portfolio/:id' component={ViewPortfolioPeriod} />
      {/* Scholarship Dashboard & Tools */}
      <Route exact path='/scholarship' component={ScholarshipsDashboard}/>
      <Route exact path='/scholarship/new' component = {CreateScholarship} />
      {/* Misc Tools */}
      <Route path='/users' component={ManageUsers} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
)

export default Admin
