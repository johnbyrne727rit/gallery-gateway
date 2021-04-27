import Entry from './types/entryType'
import Photo from './types/photoType'
import Video from './types/videoType'
import OtherMedia from './types/otherMediaType'
import User from './types/userType'
import DateScalar from './types/dateScalar'
import Group from './types/groupType'
import Show from './types/showType'
import Vote from './types/voteType'
import PortfolioPeriod from './types/portfolioPeriodType'
import Portfolio from './types/portfolioType'
import Piece from './types/pieceType'
import PhotoPiece from './types/photoPieceType'
import VideoPiece from './types/videoPieceType'
import OtherMediaPiece from './types/otherMediaPieceType'
import * as EntryMutations from './mutations/entry'
import * as EntryQuery from './queries/entryQuery'
import * as ScholarshipMutations from './mutations/scholarship'
import * as ScholarshipQuery from './queries/scholarshipQuery'
import * as ShowMutations from './mutations/show'
import * as ShowQuery from './queries/showQuery'
import * as UserQuery from './queries/userQuery'
import * as UserMutations from './mutations/user'
import * as VoteMutations from './mutations/vote'
import * as VoteQuery from './queries/voteQuery'
import * as PortfolioQuery from './queries/portfolioQuery'
import * as PortfolioMutations from './mutations/portfolio'
import * as PortfolioPeriodQuery from './queries/portfolioPeriodQuery'
import * as PortfolioPeriodMutations from './mutations/portfolioPeriod'
import * as PieceMutations from './mutations/piece'

export default {
  ...Entry,
  ...Photo,
  ...Video,
  ...OtherMedia,
  ...User,
  ...DateScalar,
  ...Group,
  ...Show,
  ...Vote,
  ...Piece,
  ...PortfolioPeriod,
  ...Portfolio,
  ...PhotoPiece,
  ...VideoPiece,
  ...OtherMediaPiece,
  Query: {
    ...EntryQuery,
    ...UserQuery,
    ...ShowQuery,
    ...VoteQuery,
    ...PortfolioPeriodQuery,
    ...PortfolioQuery,
    ...ScholarshipQuery,
  },
  Mutation: {
    ...EntryMutations,
    ...ShowMutations,
    ...UserMutations,
    ...VoteMutations,
    ...PortfolioPeriodMutations,
    ...PieceMutations,
    ...ScholarshipMutations,
    ...PortfolioMutations
  }
}
