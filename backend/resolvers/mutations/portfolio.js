import { UserError } from 'graphql-errors'
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
