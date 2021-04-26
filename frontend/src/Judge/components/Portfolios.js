import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import PortfolioCard from '../components/PortfolioCard'
import Loading from '../../shared/components/Loading'

const NoPortfoliosContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: large;
`
class Portfolios extends Component {

  renderPortfolios = portfolios => {
    if (portfolios.length === 0) {
      return (
        <NoPortfoliosContainer>
          No show calls are currently in progress. Check back soon!
        </NoPortfoliosContainer>
      )
    }
    return portfolios.map(portfolio => <PortfolioCard key={portfolio.id} portfolio={portfolio} />)
  }

  componentDidUpdate () {
    const { error, handleError } = this.props
    if (error) {
      error.graphQLErrors.forEach(e => {
        handleError(e.message)
      })
    }
  }

  render () {
    return <div>{this.props.loading ? <Loading /> : this.renderPortfolios(this.props.period.portfolios)}</div>
  }
}

Portfolios.propTypes = {
  period: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    numPieces: PropTypes.number, 
    judgingStart: PropTypes.string,
    judgingEnd: PropTypes.string,
    portfolios: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        academicProgram: PropTypes.string,
        submitted: PropTypes.bool,
        pieces: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            pieceType: PropTypes.string,
            title: PropTypes.string,
          })
        )
      })
    )
  }),

  loading: PropTypes.bool,
  error: PropTypes.object
}

export default Portfolios
