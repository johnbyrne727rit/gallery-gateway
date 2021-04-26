import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import FaChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft'
import FaChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight'
import queryString from 'query-string'
import { compose } from 'recompose'

import { setViewing, fetchPortfolios, fetchVotes } from '../actions'
import Portfolio from '../components/Portfolio'
import VotePanel from '../containers/VotePanel'

const Arrow = styled.span`
  color: white;
  position: fixed;
  opacity: 0.25;
  transition: opacity 0.25s ease-in; /* fade light to dark when hover over */
  z-index: 10; /* to always be above the submission container */

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`

const Previous = Arrow.extend`
  left: 25px;
  padding: 35vh 25px 15vh 0; /* Create a larger click target */
`

const Next = Arrow.extend`
  padding: 35vh 0 15vh 25px; /* Create a larger click target */
  right: 25px;
`

const Progress = styled.div`
  color: white;
  position: absolute;
  right: 0;
  top: 0;
`

class PortfolioVote extends Component {
  static propTypes = {
    //TODO this isn't being populated:
    portfolio: PropTypes.shape({
      pieces: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        pieceType: PropTypes.string.isRequired,
        title: PropTypes.string,
        provider: PropTypes.string,
        videoId: PropTypes.string,
        path: PropTypes.string
      }))
    }).isRequired,
    setViewing: PropTypes.func.isRequired,
    fetchPortfolios: PropTypes.func.isRequired,
    previous: PropTypes.shape({
      id: PropTypes.string
    }),
    next: PropTypes.shape({
      id: PropTypes.string
    }),
    fetchVotes: PropTypes.func.isRequired,
    vote: PropTypes.object,
    totalSubmissions: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired
  }

  static defaultProps = {
    portfolio: null,
    totalSubmissions: 0,
    currentIndex: 0
  }

  handleKeyInput = e => {
    const { setViewing, previous, next } = this.props
    if (e.key === 'ArrowRight') {
      if (next && next.id) {
        setViewing(next.id)
      }
    } else if (e.key === 'ArrowLeft') {
      if (previous && previous.id) {
        setViewing(previous.id)
      }
    }
  }

  componentDidMount () {
    this.props.fetchPortfolios()
    this.props.fetchVotes()
    document.addEventListener('keydown', this.handleKeyInput)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyInput)
  }

  render () {
    const {
      setViewing,
      portfolio,
      previous,
      next,
      vote,
      totalSubmissions,
      currentIndex
    } = this.props

    return (
      <Container fluid>
        <Row
          style={{
            backgroundColor: '#777777',
            minHeight: 'calc(100vh - 56px)',
            paddingTop: '25px'
          }}
        >
          <Col xs='12' style={{ maxHeight: '60vh' }}>
            <Row>
              <Col xs='1'>
                {previous && previous.id ? (
                  <Previous onClick={() => setViewing(previous.id)}>
                    <FontAwesomeIcon icon={FaChevronLeft} size='4x' />
                  </Previous>
                ) : null}
              </Col>
              <Col xs='10'>
                <Progress>
                  {currentIndex} / {totalSubmissions}
                </Progress>
                {portfolio ? <Portfolio portfolio={portfolio} /> : null}
              </Col>
              <Col xs='1'>
                {next && next.id ? (
                  <Next onClick={() => setViewing(next.id)}>
                    <FontAwesomeIcon icon={FaChevronRight} size='4x' />
                  </Next>
                ) : null}
              </Col>
            </Row>
          </Col>
          {portfolio ? (
            <Col xs='12'>
              <VotePanel portfolio={portfolio} vote={vote} />
            </Col>
          ) : null}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const scholarshipId = ownProps.match.params.id
  const { order = [], loadingVotes = true, loadingSubmissions = true } =
    state.judge.queues[scholarshipId] || {}
  let { on: portfolioId } = queryString.parse(state.router.location.search)

  // If this portfolioId is not in the ordering, throw it out
  if (order.indexOf(portfolioId) < 0) {
    portfolioId = null
  }

  // No satisfactory submission ID was found. If the data is loaded, loop
  // through the order and find the first un-voted submission; we'll use that one.
  // In the event that _all_ submissions have votes, use the first submission.
  if (portfolioId === null && !loadingSubmissions && !loadingVotes) {
    for (let i = 0; i < order.length; i++) {
      const candidateportfolioId = order[i]
      const isVoted = !!state.judge.votes.byEntryId[candidateportfolioId]
      if (!isVoted) {
        portfolioId = candidateportfolioId
        break
      }
    }

    // If everything is voted on, just set the current submission to the first one
    if (portfolioId === null) {
      portfolioId = order[0] || null
    }

    if (portfolioId !== null) {
      const newQueryString = queryString.stringify({
        ...queryString.parse(ownProps.location.search),
        on: portfolioId
      })
      ownProps.history.replace(`/scholarships/${scholarshipId}/vote?${newQueryString}`)
    }
  }

  const viewing = portfolioId !== null ? order.indexOf(portfolioId) : null
  const submissions = state.judge.submissions
  const votes = state.judge.votes

  const obj = {
    portfolio: {
      id: scholarshipId
    },
    submission: portfolioId !== null ? submissions[portfolioId] : null,
    vote: portfolioId !== null ? votes.byEntryId[portfolioId] : null,
    currentIndex: viewing + 1,
    totalSubmissions: order.length
  }

  // Show the previous button
  if (viewing !== null && viewing > 0) {
    obj.previous = {
      id: order[viewing - 1]
    }
  }

  // Show the next button
  if (viewing !== null && viewing + 1 < order.length) {
    obj.next = {
      id: order[viewing + 1]
    }
  }

  return obj
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const scholarshipId = ownProps.match.params.id

  return {
    setViewing: portfolioId => dispatch(setViewing(scholarshipId, portfolioId)),
    fetchPortfolios: () => dispatch(fetchPortfolios(scholarshipId)),
    fetchVotes: () => dispatch(fetchVotes(scholarshipId))
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(PortfolioVote)
