import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {
  Row,
  Col,
  Button } from 'reactstrap'
import moment from 'moment'
import { FlipCard, NewPiece } from './ImageCard'
import PortfolioSubmissionModal from './PortfolioSubmissionModal'

const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
`

const SubmittedEntries = ({ portfolio, deletePiece }) =>
  portfolio.pieces.map(piece => (
    <Col
      md='3'
      className='mb-3 text-center align-self-center d-flex justify-content-center align-items-center'
      style={{ minHeight: '10em' }}
      title={piece.title}
      key={piece.id}
    >
      <FlipCard
        picture={piece}
        portfolio={portfolio}
        deletePiece={() => deletePiece(piece.id)}
        style={{ width: '100%', height: '100%' }}
      />
    </Col>
  ))

class PortfolioCard extends Component {
  static propTypes = {
    submitPortfolio: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    portfolio: PropTypes.shape({
      id: PropTypes.string,
      pieces: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          path: PropTypes.string,
          pieceType: PropTypes.oneOf(['PHOTO', 'VIDEO', 'OTHER']).isRequired,
          title: PropTypes.string.isRequired
        })
      ),
      portfolioPeriod: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        numPieces: PropTypes.number.isRequired,
        entryEnd: PropTypes.string,
        entryStart: PropTypes.string,
        scholarships: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            requiresEssay: PropTypes.bool
          })
        )
      }),
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string
    }).isRequired
  }

  static defaultProps = {
    portfolio: {
      pieces: []
    }
  }

  state = {
    isScholarshipSelectionOpen: false
  }

  onDismissScholarshipSelection = () => {
    this.setState({
      isScholarshipSelectionOpen: false
    })
  }

  onDisplayScholarshipSelection = () => {
    this.setState({
      isScholarshipSelectionOpen: true
    })
  }

  render () {
    const { portfolio, submitPortfolio, handleError } = this.props

    return (
      <Fragment>
        <PortfolioSubmissionModal
          isOpen={this.state.isScholarshipSelectionOpen}
          toggleFunction={this.onDismissScholarshipSelection}
          portfolio={portfolio}
          submitPortfolio={submitPortfolio}
          handleError={handleError} />
        <Card>
          <Row>
            <Col>
              <div>
                <h2>{portfolio.portfolioPeriod.name}</h2>
              </div>
              <div>
                <h5>
                  {portfolio.pieces.length}/{
                    portfolio.portfolioPeriod.numPieces
                  }{' '}
              Pieces
                </h5>
              </div>
            </Col>
            <Col className='text-right'>
              {moment().isAfter(moment(portfolio.portfolioPeriod.entryEnd)) ? (
                <div>No Longer Accepting Applications</div>
              ) : (
                <div>
                  <div>
                    <h2>
                      <Button color='primary'
                        style={{cursor: 'pointer'}}
                        onClick={() => this.onDisplayScholarshipSelection()}>Apply</Button>
                    </h2>
                  </div>
                  <div>
                Accepting Applications Until:{' '}
                    <Moment format='MMMM D, YYYY hh:mm:ss a'>
                      {portfolio.portfolioPeriod.entryEnd}
                    </Moment>
                  </div>
                </div>
              )}
            </Col>
          </Row>
          <hr />
          <Row style={{ minHeight: '250px' }} className='align-items-center'>
            <Fragment>
              {moment().isBefore(portfolio.portfolioPeriod.entryEnd) &&
          portfolio.pieces.length <
            portfolio.portfolioPeriod.numPieces ? (
                  <NewPiece {...this.props} />
                ) : null}
              <SubmittedEntries {...this.props} />
            </Fragment>
          </Row>
        </Card>
      </Fragment>
    )
  }
}


export default PortfolioCard
