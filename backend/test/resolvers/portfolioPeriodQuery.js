import { expect } from "chai";

import { openPortfolioPeriod, portfolioPeriod, portfolioPeriods } from "../../resolvers/queries/portfolioPeriodQuery";
import { fakeUser, fakePortfolioPeriod, fakePortfolio } from "../factories";

describe("Portfolio Period Queries", function() {
  describe("portfolioPeriod", function() {
    it("returns correct portfolio period", function() {
      return fakePortfolioPeriod()
      .then(period => {
        return portfolioPeriod({}, {id: period.id}, { auth: { type: "STUDENT" } })
        .then(foundPeriod => {
          expect(foundPeriod.name).to.equal(period.name)
        });
      });
    });
  });

  describe("openPortfolioPeriod", function() {
    it("returns null when the student already has a portfolio", function() {
      return Promise.all([fakeUser(), fakePortfolioPeriod()])
        .then(models => {
          const user = models[0];
          const period = models[1];
          return Promise.all([user, period, fakePortfolio({ user, period })]);
        })
        .then(models => {
          const user = models[0];
          return openPortfolioPeriod(
            {},
            {
              studentUsername: user.username
            },
            { auth: { type: "ADMIN" } }
          );
        })
        .then(period => {
          return expect(period).to.be.null;
        });
    });
    it("returns a period when the student does not have a portfolio", function() {
      return Promise.all([fakeUser(), fakePortfolioPeriod()])
        .then(models => {
          const user = models[0];
          return openPortfolioPeriod(
            {},
            {
              studentUsername: user.username
            },
            { auth: { type: "ADMIN" } }
          );
        })
        .then(period => {
          return expect(period).to.be.not.null;
        });
      });  
    });

    describe("portfolioPeriods", function(){
      it("rejects student user", function(){
        return fakePortfolioPeriod()
          .then(() => {
            return expect(() => {
              portfolioPeriods({}, {}, { auth: { type: "STUDENT" } })
            }).to.throw('Permission Denied')
          });
      });

      it("returns single portfolio period", function(){
        return Promise.all([fakePortfolioPeriod({name: 'B'})])
          .then(models=> {
            return portfolioPeriods({}, {}, { auth: { type: "ADMIN" }})
            .then(periods => {
              expect(periods[0].name).to.equal(models[0].name)
            });
          });
      });

      it("returns multiple portfolio periods, ordered", function(){
        return Promise.all([fakePortfolioPeriod({name: 'B'}), fakePortfolioPeriod({name: 'A'})])
          .then(models=> {
            return portfolioPeriods({}, 
              {orderBy: {sort: 'name', direction: 'ASC'}}, 
              { auth: { type: "ADMIN" }
            })
            .then(periods => {
              expect(periods[0].name).to.equal(models[1].name)
              expect(periods[1].name).to.equal(models[0].name)
            });
          });
      });

    });
});
