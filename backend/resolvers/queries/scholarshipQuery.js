import { UserError } from "graphql-errors";
import { ADMIN } from "../../constants";
import Scholarship from "../../models/scholarship";

export function scholarship(_, args, req) {

  // Apply ordering, if desired
  const order = args.orderBy
    ? { order: [[args.orderBy.sort, args.orderBy.direction]] }
    : {};

  return Scholarship.findAll(order)
}
