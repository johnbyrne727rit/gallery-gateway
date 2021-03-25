import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap'
import moment from 'moment'
import SuccessModal from './SuccessModal'
import { FlipCard, NewPiece } from './ImageCard'
import ScholarshipsTable from 'shared/components/ScholarshipsTable'

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
        scholarships: PropTypes.arrayOf({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          requiresEssay: PropTypes.bool
        })
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
    isScholarshipSelectionOpen: false,
    displaySubmissionSuccess: false,
    selectedScholarships: {},
    isValidSubmission: false
  }

  closeSuccessModal = () => {
    this.setState({ displaySubmissionSuccess: false })
  }

  openSuccessModal = () => {
    this.setState({ displaySubmissionSuccess: true }, () => {
      setTimeout(this.closeSuccessModal, 4000)
    })
  }

  handleSelectedScholarshipsChange = selectedScholarships => {
    const { portfolio } = this.props
    const { portfolioPeriod } = this.props.portfolio

    const scholarshipIDs = Object.keys(selectedScholarships)

    const requiredPieces = scholarshipIDs.map(ID => {
      // Creates array of required photo sizes
      return portfolioPeriod.scholarships.find(scholarship => scholarship.id === ID).requiredPhotos
    })

    const validPortfolio = portfolio.pieces.length >= Math.max(...requiredPieces)

    this.setState({ selectedScholarships, isValidSubmission: validPortfolio && Object.keys(this.state.selectedScholarships).length === 0 })
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
    const { portfolio } = this.props

    return (
      <Fragment>
        <Modal
          isOpen={this.state.isScholarshipSelectionOpen}
        >
          <ModalHeader toggle={this.onDismissScholarshipSelection}>
            Scholarship Selection
          </ModalHeader>
          <ModalBody>
            <ScholarshipsTable scholarships={portfolio.portfolioPeriod.scholarships}
              selected={this.state.selectedScholarships}
              onChange={this.handleSelectedScholarshipsChange}
              studentView={true} />
          </ModalBody>
          <ModalFooter>
            <Button
              color='secondary'
              onClick={() => this.onDismissScholarshipSelection()}
            >
              Cancel
            </Button>
            <Button
              color='primary'
              disabled={!this.state.isValidSubmission}
              onClick={() => {
                if (!this.state.isValidSubmission) {
                  
                } else {
                  this.onDismissScholarshipSelection()
                  this.openSuccessModal()
                }
              }}
            >
              Submit Application
            </Button>
          </ModalFooter>
        </Modal>
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
        <SuccessModal
          isOpen={this.state.displaySubmissionSuccess}
          customBodyText={'Your portfolio was successfully submitted to the scholarships you selected. Check back soon to see if you were selected!'}/>
      </Fragment>
    )
  }
}


export default PortfolioCard
