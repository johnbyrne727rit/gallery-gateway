import { expect } from "chai";

import { portfoliosByStudent, portfolioByPeriod } from "../../resolvers/queries/portfolioQuery";
import { fakeUser, fakePortfolioPeriod, fakePortfolio } from "../factories";

describe("Portfolio Queries", function() {
  describe("portfoliosByStudent", function() {
    it("rejects wrong user", function() {
      return Promise.all([fakeUser({name:"user1"}), fakePortfolioPeriod()])
      .then(models => {
        const user = models[0];
        const period = models[1];
        return Promise.all([user, period, fakePortfolio({ user, period })]);
      })
      .then(models => {
        const user = models[0];
        return expect(() => {portfoliosByStudent(
              {},
              {
                studentUsername: user.username
              },
              { auth: { type: "STUDENT", username: "HackerMan" } }
            );
          }).to.throw('Permission Denied')
      });  
    });

    it("returns single portfolio to student", function() {
      return Promise.all([fakeUser({name:"user1"}), fakePortfolioPeriod()])
      .then(models => {
        const user = models[0];
        const period = models[1];
        return Promise.all([user, period, fakePortfolio({ user, period })]);
      })
      .then(models => {
        const user = models[0];
        const portfolio = models[2];
        return portfoliosByStudent(
          {},
          {
            studentUsername: user.username
          },
          { auth: { type: "STUDENT", username: user.username } }
        )
        .then(portfolios => {
          return expect(portfolios[0].id).to.equal(portfolio.id)
        });
      });  
    });
    it("returns multiple portfolios to admin", function() {
      return Promise.all([fakeUser({name:"user1"}), fakePortfolioPeriod(), fakePortfolioPeriod()])
      .then(models => {
        const user = models[0];
        const period1 = models[1];
        const period2 = models[2];
        return Promise.all([user, fakePortfolio({ user, period1 }), , fakePortfolio({ user, period2 })]);
      })
      .then(models => {
        const user = models[0];
        const portfolio1 = models[1];
        const portfolio2 = models[2];
        return portfoliosByStudent(
          {},
          {
            studentUsername: user.username
          },
          { auth: { type: "ADMIN"} }
        )
        .then(portfolios => {
          expect(portfolios.length).to.equal(2)
        });
      });  
    });
  });
  describe("portfolioByPeriod", function() {
    it("rejects wrong user", function() {
      return Promise.all([fakeUser({name:"user1"}), fakePortfolioPeriod()])
      .then(models => {
        const user = models[0];
        const period = models[1];
        return Promise.all([user, period, fakePortfolio({ user, period })]);
      })
      .then(models => {
        const user = models[0];
        const period = models[1];
        return expect(() => {portfolioByPeriod(
              {},
              {
                studentUsername: user.username,
                periodId: period.id
              },
              { auth: { type: "STUDENT", username: "HackerMan" } }
            );
          }).to.throw('Permission Denied')
      });  
    });

    it("returns single portfolio to student", function() {
      return Promise.all([fakeUser({name:"user1"}), fakePortfolioPeriod()])
      .then(models => {
        const user = models[0];
        const period = models[1];
        return Promise.all([user, period, fakePortfolio({ user, period })]);
      })
      .then(models => {
        const user = models[0];
        const period = models[1];
        const portfolio = models[2];
        return portfolioByPeriod(
          {},
          {
            studentUsername: user.username,
            periodId: period.id

          },
          { auth: { type: "STUDENT", username: user.username } }
        )
        .then(portfolios => {
          return expect(portfolios[0].id).to.equal(portfolio.id)
        });
      });  
    });
    it("returns single portfolio to Admin", function() {
      return Promise.all([fakeUser({name:"user1"}), fakePortfolioPeriod()])
      .then(models => {
        const user = models[0];
        const period = models[1];
        return Promise.all([user, period, fakePortfolio({ user, period })]);
      })
      .then(models => {
        const user = models[0];
        const period = models[1];
        const portfolio = models[2];
        return portfolioByPeriod(
          {},
          {
            studentUsername: user.username,
            periodId: period.id

          },
          { auth: { type: "ADMIN"} }
        )
        .then(result => {
          return expect(result.id).to.equal(portfolio.id)
        });
      });  
    });
  });
});