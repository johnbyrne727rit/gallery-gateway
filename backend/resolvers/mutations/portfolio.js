import { UserError } from 'graphql-errors'
import { STUDENT } from '../../constants'
import Portfolio from '../../models/portfolio'

export function submitPortfolio (_, args, req) {
  if (req.auth.type !== STUDENT) {
    throw new UserError('Permission Denied')
  }

  return Portfolio.findById(args.id)
    .then((portfolio) => {
      return portfolio.update(true, {
        fields: ['submitted']
      })
        .then((portfolio) => {
          portfolio.addScholarships(args.selectedScholarships)
            .catch(() => {
              throw new UserError('Cannot find one or more scholarship IDs')
            })
          return true
        })
    })
}