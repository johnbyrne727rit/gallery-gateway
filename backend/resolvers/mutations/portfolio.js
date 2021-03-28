import { UserError } from 'graphql-errors'
import moment from 'moment-timezone'
import { ADMIN } from '../../constants'
import Portfolio from '../../models/portfolio'
import db from '../../config/sequelize'

export function submitPortfolio(_, args, req) {
  return Portfolio.findById(args.id)
    .then((Portfolio) => {
      return portfolio.update(true, {
        fields: ['submitted']
      })
    }
}