import { expect } from "chai";

import {
  assignToPortfolioPeriod,
  removeFromPortfolioPeriod,
  createPortfolioPeriod
} from "../../resolvers/mutations/portfolioPeriod";
import { fakeUser, fakePortfolioPeriod, fakePortfolio } from "../factories";
import PortfolioPeriod from "../../models/portfolioPeriod";

describe("Portfolio Periods", () => {
  describe("Create portfolio period", () => {
    it("rejects non admin users", () => {
      return expect(() => {
        createPortfolioPeriod({}, {}, { auth: { type: "STUDENT" } }
      )}).to.throw('Permission Denied')
    });

    it("does not allow null values", () => {
      return expect(() => {
        createPortfolioPeriod({}, {}, { auth: { type: "ADMIN" } }
      )}).to.throw(/Cannot read property 'entryStart' of undefined/)
    });

    it("creates a portfolio period", () => {
      return createPortfolioPeriod({}, { input: {
        name: 'Test Period',
        description: 'Coolest of periods',
        numPieces: 3,
        entryStart: '2015-01-01',
        entryEnd: '2015-01-02',
        judgingStart: '2015-01-03',
        judgingEnd: '2015-01-04'
      }}, { auth: { type: "ADMIN" } }
      )
      .then((period) => {
        expect(period.name).to.eq('Test Period')
        expect(period.entryEnd.getFullYear()).to.eq(2015)
      })
    });

    it("validates start and end dates", (done) => {
        createPortfolioPeriod({}, { input: {
        name: 'Test Period',
        description: 'Coolest of periods',
        numPieces: 3,
        entryStart: '2015-01-05',
        entryEnd: '2015-01-02',
        judgingStart: '2015-01-03',
        judgingEnd: '2015-01-04'
        }}, { auth: { type: "ADMIN" } }
      ).catch((err) => {
        expect(err).to.exist
        expect(err.message).to.equal('Validation error: Entry start date must be before the entry end date')
        done()
      })
    });
  });

  describe("Manages judge assignment on portfolio periods", () => {
    it("rejects non admin users", () => {
      return Promise.all([fakeUser({ type: "JUDGE" }), fakePortfolioPeriod()])
        .then(([user, portfolioPeriod]) => {
            return expect(() => {
              assignToPortfolioPeriod(
              {},
              {
                portfolioPeriodId: portfolioPeriod.id,
                usernames: [user.username]
              },
              { auth: { type: "JUDGE" } }
            )}).to.throw('Permission Denied')
        });  
    });

    it("fails to add without portfolio period", (done) => {
      Promise.all([fakeUser({ type: "JUDGE" })])
        .then(([user]) => {
            assignToPortfolioPeriod({},{usernames: [user.username]}, { auth: { type: "ADMIN" } })
            .catch((err) => {
              expect(err).to.exist
              expect(err.message).to.equal('Portfolio Period Not Found')
              done()
            });
        });  
    });
    
    it("fails to add without judges", (done) => {
      Promise.all([fakePortfolioPeriod()])
        .then(([portfolioPeriod]) => {
            assignToPortfolioPeriod(
              {},
              {
                portfolioPeriodId: portfolioPeriod.id,
                usernames: []
              },
              { auth: { type: "ADMIN" } }
            ).catch((err) => {
              expect(err).to.exist
              expect(err.message).to.equal('Please input one or more usernames')
              done()
            });
        });  
    });

    it("fails to add invalid judges", (done) => {
      Promise.all([fakePortfolioPeriod()])
        .then(([portfolioPeriod]) => {
            assignToPortfolioPeriod(
              {},
              {
                portfolioPeriodId: portfolioPeriod.id,
                usernames: ["INVALID"]
              },
              { auth: { type: "ADMIN" } }
            ).catch((err) => {
              expect(err).to.exist
              expect(err.message).to.equal('Cannot find one or more usernames')
              done()
            });
        });  
    });

    it("adds judges to a portfolio period", () => {
      return Promise.all([fakeUser({ type: "JUDGE" }), fakePortfolioPeriod()])
        .then(([user, portfolioPeriod]) =>
          Promise.all([
            portfolioPeriod,
            assignToPortfolioPeriod(
              {},
              {
                portfolioPeriodId: portfolioPeriod.id,
                usernames: [user.username]
              },
              { auth: { type: "ADMIN" } }
            )
          ])
        )
        .then(([portfolioPeriod]) => portfolioPeriod.getUsers())
        .then(users => expect(users.length).to.equal(1));
    });
    it("removes judges from a portfolio period", () => {
      return Promise.all([fakeUser({ type: "JUDGE" }), fakePortfolioPeriod()])
        .then(([user, portfolioPeriod]) =>
          Promise.all([
            user,
            portfolioPeriod,
            assignToPortfolioPeriod(
              {},
              {
                portfolioPeriodId: portfolioPeriod.id,
                usernames: [user.username]
              },
              { auth: { type: "ADMIN" } }
            )
          ])
        )
        .then(([user, portfolioPeriod]) =>
          Promise.all([
            portfolioPeriod,
            removeFromPortfolioPeriod(
              {},
              {
                portfolioPeriodId: portfolioPeriod.id,
                usernames: [user.username]
              },
              { auth: { type: "ADMIN" } }
            )
          ])
        )
        .then(([portfolioPeriod]) => portfolioPeriod.getUsers())
        .then(users => expect(users.length).to.equal(0));
    });

    it("prevents non admins from removing judges", () => {
      expect(() => {
        removeFromPortfolioPeriod({},{},{ auth: { type: "JUDGE" } })
      }).to.throw('Permission Denied')
    });

    it("fails to remove  with empty judge list", () => {
      expect( () => 
        removeFromPortfolioPeriod({},{usernames: []},{ auth: { type: "ADMIN" } })
      ).to.throw('Please input one or more usernames')
    });

    it("fails to remove  with invalid period id", (done) => {
        removeFromPortfolioPeriod({},{
          usernames: ['USER1'], 
          portfolioPeriodId: 1
        },
        { auth: { type: "ADMIN" } })
      .catch((err) => {
        expect(err).to.exist
        expect(err.message).to.equal('Portfolio Period Not Found')
        done()
      });
    });
    
    it("fails to remove if judge is not assigned", (done) => {
      Promise.all([fakeUser({ type: "JUDGE" }), fakePortfolioPeriod()])
      .then(([user, period]) => {
          removeFromPortfolioPeriod({},{usernames: [user.name], portfolioPeriodId: period.id},{ auth: { type: "ADMIN" } })
          .catch((err) => {
            expect(err).to.exist
            expect(err.message).to.equal('Judge not assigned to portfolio period')
            done()
          });
      })
    });;
    
  });
});
