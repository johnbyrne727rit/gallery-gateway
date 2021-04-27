import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import ScholarshipCard from '../components/ScholarshipCard'
import Loading from '../../shared/components/Loading'

const NoShowsContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: large;
`
class Scholarships extends Component {
  componentDidUpdate () {
    const { error, handleError } = this.props
    if (error) {
      error.graphQLErrors.forEach(e => {
        handleError(e.message)
      })
    }
  }

  renderScholarships = user => {
    if (user && user.portfolioPeriods.length) {
      return user.portfolioPeriods.map(portfolioPeriods => <ScholarshipCard key={portfolioPeriods.id} {...portfolioPeriods} />)
    }
    return (
      <NoShowsContainer>
        You are not currently assigned to any future scholarships
      </NoShowsContainer>
    )
  }

  render () {
    const { loading, user } = this.props

    return <div>{loading ? <Loading /> : this.renderScholarships(user)}</div>
  }
}

Scholarships.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
}
export default Scholarships
