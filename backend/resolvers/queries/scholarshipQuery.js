import { UserError } from "graphql-errors";
import { ADMIN, JUDGE } from "../../constants";
import Scholarship from "../../models/scholarship";
import PortfolioPeriod from "../../models/portfolioPeriod"

export function scholarship(_, args, req) {

  if (
    req.auth.type !== ADMIN
  ) {
    throw new UserError("Permission Denied");
  }

  // Apply ordering, if desired
  const order = args.orderBy
    ? { order: [[args.orderBy.sort, args.orderBy.direction]] }
    : {};

  return Scholarship.findAll(order)
}

export function scholarshipByPeriod(_, args, req ) {

  if (
    req.auth.type !== ADMIN && req.auth.type !== STUDENT
  ) {
    throw new UserError("Permission Denied");
  }

  const periodId  = args.periodId;
  
  return PortfolioPeriod.find({
    where: {id: periodId},
    include: Scholarship
  });
}
