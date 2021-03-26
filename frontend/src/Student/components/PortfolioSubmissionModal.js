import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap'
import SuccessModal from './SuccessModal'
import ScholarshipsTable from 'shared/components/ScholarshipsTable'

class PortfolioSubmissionModal extends Component {
    static propTypes = {
      isOpen: PropTypes.bool.isRequired,
      toggleFunction: PropTypes.func.isRequired,
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

      const scholarshipRequiredPieces = scholarshipIDs.map(ID => {
        // Creates array of required photo sizes
        return portfolioPeriod.scholarships.find(scholarship => scholarship.id === ID).requiredPhotos
      })

      const validPortfolio = scholarshipIDs.length > 0 && portfolio.pieces.length >= Math.max(...scholarshipRequiredPieces)

      this.setState({ selectedScholarships, isValidSubmission: validPortfolio })
    }

    render () {
      const { portfolio, isOpen, toggleFunction } = this.props

      return (
        <Fragment>
          <Modal
            isOpen={isOpen}
          >
            <ModalHeader toggle={toggleFunction}>
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
                onClick={toggleFunction}
              >
              Cancel
              </Button>
              <Button
                color='primary'
                disabled={!this.state.isValidSubmission}
                onClick={() => {
                  toggleFunction()
                  this.openSuccessModal()
                }}
              >
              Submit Application
              </Button>
            </ModalFooter>
          </Modal>
          <SuccessModal
            isOpen={this.state.displaySubmissionSuccess}
            customBodyText={'Your portfolio was successfully submitted to the scholarships you selected. Check back soon to see if you were selected!'}/>
        </Fragment>
      )
    }
}

export default PortfolioSubmissionModal
