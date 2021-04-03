import PropTypes from 'prop-types'
import React, { Component, useState } from 'react'
import styled from 'styled-components'

import PortfolioCard from '../components/PortfolioCard'
import ConfirmModal from '../components/ConfirmModal'
import Loading from '../../shared/components/Loading'

const NoShowsContainer = styled.div`
  font-size: large;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
`
class Portfolios extends Component {

renderPortfolios = (portfolios, openPeriod, deletePiece, submitPortfolio, handleError) => {
    if (openPeriod) {
      const skeletonPortfolio = {
        portfolioPeriod: openPeriod,
        pieces: [],
        id: -1
      }

      if (!portfolios) {
        portfolios = []
      }
      portfolios = [skeletonPortfolio].concat(portfolios)
    }
    if (!portfolios || portfolios.length === 0) {
      return (
        <NoShowsContainer>
          The scholarship period is not currently open. Check back soon!
        </NoShowsContainer>
      )
    }
    return portfolios.map(portfolios => (
      <PortfolioCard
        key={portfolios.id}
        portfolio={portfolios}
        deletePiece={deletePiece}
        submitPortfolio={submitPortfolio}
        handleError={handleError}
      />
    ))
  }

  componentDidUpdate () {
    const { portfoliosError, openPeriodError, handleError } = this.props
    if (portfoliosError) {
      portfoliosError.graphQLErrors.forEach(e => {
        handleError(e.message)
      })
    }
    if (openPeriodError) {
      openPeriodError.graphQLErrors.forEach(e => {
        handleError(e.message)
      })
    }
  }

  render () {
    const {
      portfoliosLoading,
      openPeriodLoading,
      portfolios,
      openPeriod,
      deletePiece,
      submitPortfolio,
      handleError
    } = this.props

    return (
      <div>
        {portfoliosLoading || openPeriodLoading ? (
          <Loading />
        ) : (
          this.renderPortfolios(portfolios, openPeriod, deletePiece, submitPortfolio, handleError)
        )}
      </div>
    )
  }
}

Portfolios.propTypes = {

  portfolios: PropTypes.array,
  portfoliosLoading: PropTypes.bool.isRequired,
  portfoliosError: PropTypes.object,
  openPeriod: PropTypes.array,
  openPeriodLoading: PropTypes.bool.isRequired,
  openPeriodError: PropTypes.object
}

export default Portfolios
