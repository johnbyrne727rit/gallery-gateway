import Entry from './entry'
import Group from './group'
import User from './user'
import Show from './show'
import Portfolio from './portfolio'
import PortfolioPeriod from './portfolioPeriod'
import Scholarship from './scholarship'

export default function () {
  // Many users can be on many shows
  User.belongsToMany(Show, {through: 'user_shows', foreignKey: 'username'})
  Show.belongsToMany(User, {through: 'user_shows'})

  Entry.belongsTo(User, {foreignKey: 'studentUsername'})
  Entry.belongsTo(Group, {foreignKey: 'groupId'})
  Entry.belongsTo(Show, {foreignKey: 'showId'})

  User.belongsToMany(PortfolioPeriod, {through: 'user_portfolioPeriods', foreignKey: 'username'})
  PortfolioPeriod.belongsToMany(User, {through: 'user_portfolioPeriods'})

  Scholarship.belongsToMany(PortfolioPeriod, {through: 'portfolioPeriod_scholarships', foreignKey: 'scholarshipId'})
  PortfolioPeriod.belongsToMany(Scholarship, {through: 'portfolioPeriod_scholarships'})

  Scholarship.belongsToMany(Portfolio, {through: 'portfolio_scholarships', foreignKey: 'scholarshipId'})
  Portfolio.belongsToMany(Scholarship, {through: 'portfolio_scholarships'})
}
