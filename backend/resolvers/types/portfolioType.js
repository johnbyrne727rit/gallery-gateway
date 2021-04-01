import Piece from '../../models/piece'
import PortfolioPeriod from '../../models/portfolioPeriod'

export default {
  Portfolio: {
    pieces (portfolio, _, req) {
      return Piece.findAll({ where: { portfolioId: portfolio.id } })
    },
    scholarships (portfolio, _, req) {
      return portfolio.getScholarships()
    },
    portfolioPeriod (portfolio, _, req) {
      return PortfolioPeriod.findOne({ where: { id: portfolio.portfolioPeriodId } })
    }
  }
}
