import { UserError } from 'graphql-errors'
<<<<<<< HEAD
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
=======
import sequelize from '../../config/sequelize'
import { STUDENT } from '../../constants'
import Portfolio from '../../models/portfolio'

export function submitPortfolio (_, args, req) {
  if (req.auth.type !== STUDENT) {
    throw new UserError('Permission Denied')
  }

  return Portfolio.findByPk(args.id)
    .then((portfolio) => {
      return portfolio.update({submitted: true}, { where: { id: args.id } })
        .then((portfolio) => {
          portfolio.addScholarships(args.scholarships)
            .catch(() => {
              throw new UserError('Cannot find one or more scholarship IDs')
            })
          return true
        })
    })
}
>>>>>>> select-scholarships
