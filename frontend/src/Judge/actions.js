import { push } from 'connected-react-router'

import SubmissionQuery from './queries/submission.graphql'
import SubmissionsQuery from './queries/submissions.graphql'
import PortfoliosQuery from './queries/portfolios.graphql'
import { displayError } from '../shared/actions'
import ShowVotes from './queries/showVotes.graphql'
import GetVote from './queries/entryVote.graphql'

export const FETCH_SUBMISSION = 'FETCH_SUBMISSION'
export const FETCH_SUBMISSIONS = 'FETCH_SUBMISSIONS'
export const FETCH_VOTES = 'FETCH_VOTES'
export const FETCH_VOTE = 'FETCH_VOTE'
export const WILL_FETCH_VOTES = 'WILL_FETCH_VOTES'
export const WILL_FETCH_SUBMISSIONS = 'WILL_FETCH_SUBMISSIONS'
export const WILL_FETCH_PORTFOLIOS = 'WILL_FETCH_PORTFOLIOS'

export const fetchSubmission = submissionId => (dispatch, getState, client) => {
  return client
    .query({
      query: SubmissionQuery,
      variables: {
        id: submissionId
      }
    })
    .then(({ data: { submission } }) =>
      dispatch({ type: FETCH_SUBMISSION, payload: submission })
    )
    .catch(err => dispatch(displayError(err.message)))
}

export const fetchSubmissions = showId => (dispatch, getState, client) => {
  const { shared: { auth: { user: { username } } } } = getState()

  dispatch({ type: WILL_FETCH_SUBMISSIONS, payload: showId })
  return client
    .query({
      query: SubmissionsQuery,
      variables: {
        id: showId
      }
    })
    .then(({ data: { submissions } }) =>
      dispatch({
        type: FETCH_SUBMISSIONS,
        payload: {
          submissions: submissions.filter(s => !s.excludeFromJudging),
          username
        }
      })
    )
    .catch(err => dispatch(displayError(err.message)))
}

export const fetchPortfolios = scholarshipId => (dispatch, getState, client) => {
  return client
    .query({
      query: PortfoliosQuery,
      variables: {
        id: scholarshipId
      }
    })
    .then(({ data: { portfolioPeriod } }) =>
      dispatch({ type: WILL_FETCH_PORTFOLIOS, payload: portfolioPeriod })
    )
    .catch(err => dispatch(displayError(err.message)))
}

export const fetchVotes = showId => (dispatch, getState, client) => {
  const { shared: { auth: { user: { username } } } } = getState()

  dispatch({ type: WILL_FETCH_VOTES, payload: showId })
  return client
    .query({
      query: ShowVotes,
      variables: {
        showId,
        username
      }
    })
    .then(({ data: { votes } }) =>
      dispatch({ type: FETCH_VOTES, payload: { votes, showId } })
    )
    .catch(err => dispatch(displayError(err.message)))
}

export const fetchVote = submissionId => (dispatch, getState, client) => {
  const { shared: { auth: { user: { username } } } } = getState()
  return client
    .query({
      query: GetVote,
      variables: {
        entryId: submissionId,
        username
      }
    })
    .then(({ data: { vote } }) => dispatch({ type: FETCH_VOTE, payload: vote }))
    .catch(err => dispatch(displayError(err.message)))
}

export const setViewing = (showId, entryId) => (dispatch, getState, client) => {
  dispatch(push(`/show/${showId}/vote?on=${entryId}`))
}
