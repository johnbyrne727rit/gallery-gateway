import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import VideoSubmission from '../components/VideoSubmission'
import PhotoSubmission from '../components/PhotoSubmission'
import OtherMediaSubmission from '../components/OtherMediaSubmission'

// Portfolio types
const VIDEO = 'VIDEO'
const PHOTO = 'PHOTO'
const OTHER = 'OTHER'

const Title = styled.h4`
  color: white;
  padding-bottom: 10px;
  text-align: center;
`

const PortfolioCard = props =>
props.pieces.map(piece => (
  <Col
    md='3'
    className='text-center align-self-center d-flex justify-content-center align-items-center'
    style={{ minHeight: '10em' }}
    title={piece.title}
    key={piece.id}
  >
  {piece.pieceType === VIDEO ? (
    <VideoSubmission
      provider={piece.provider}
      videoId={piece.videoId}
    />
  ) : piece.pieceType === PHOTO ? (
    <PhotoSubmission path={piece.path} />
  ) : piece.pieceType === OTHER ? (
    <OtherMediaSubmission path={piece.path} />
  ) : null}
  </Col>
))

PortfolioCard.propTypes = {
  pieces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    pieceType: PropTypes.string.isRequired,
    title: PropTypes.string,
    provider: PropTypes.string,
    videoId: PropTypes.string,
    path: PropTypes.string
  }))
}

export default PortfolioCard
