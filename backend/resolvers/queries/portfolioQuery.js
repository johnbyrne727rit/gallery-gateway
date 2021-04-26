import { UserError } from "graphql-errors";
import { ADMIN } from "../../constants";
import Portfolio from "../../models/portfolio";

export function portfoliosByStudent(_, args, req) {
  if (
    args.studentUsername &&
    req.auth.type !== ADMIN &&
    args.studentUsername !== req.auth.username
  ) {
    throw new UserError("Permission Denied");
  }
  const studentUsername = args.studentUsername
    ? args.studentUsername
    : req.auth.username;

  return Portfolio.findAll({
    where: {
      studentUsername
    }
  });
}

export function portfolioByPeriod(_, args, req) {
  // Students can only look at their own portfolios
  let hasPermissionPromise = Promise.resolve(false)
  const isRequestingOwnUser = req.auth.username !== undefined &&
    req.auth.username === args.studentUsername
  if (isRequestingOwnUser) {
    // everyone can request their own portfolios
    hasPermissionPromise = Promise.resolve(true)
  } else if (req.auth.type === ADMIN) {
    // admins can do everything
    hasPermissionPromise = Promise.resolve(true)
  } else if (req.auth.type === JUDGE && args.portfolioPeriodId) {
    // judges can request the entries for shows to which they're assigned
    hasPermissionPromise = Portfolio.findById(args.portfolioPeriodId, {rejectOnEmpty: true})
  }

  const studentUsername = args.studentUsername
    ? args.studentUsername
    : req.auth.username;

  return hasPermissionPromise.then(hasPermission => {
    if (!hasPermission) {
      throw new UserError('Permission Denied')
    }
    if (!args.portfolioPeriodId && !args.studentUsername) {
      return Portfolio.all()
    } else if (args.portfolioPeriodId) {
      return Portfolio.findAll({ where: { portfolioPeriodId: args.portfolioPeriodId } })
    } else if (args.studentUsername) { // get entries by username
      Portfolio.find({
        where: {
          studentUsername,
          portfolioPeriodId: {args}
        }
      })
    } else {
      return Portfolio.findAll({ where: { args } })
    }
  })
}
