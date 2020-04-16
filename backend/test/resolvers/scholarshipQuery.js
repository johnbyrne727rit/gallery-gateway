import { expect } from "chai";

import { scholarship } from "../../resolvers/queries/scholarshipQuery";
import { fakeUser, fakePortfolioPeriod, fakePortfolio, fakeScholarship } from "../factories";

describe("Scholarship Queries", function() {
  describe("scholarship", function() {
    it("rejects non admin user", function() {
      return fakeScholarship()
      .then(() => {
        return expect(() => {scholarship({},{},
              { auth: { type: "STUDENT", username: "HackerMan" } }
            );
          }).to.throw('Permission Denied')
      });  
    });

    it("returns single scholarship", function(){
      return fakeScholarship()
        .then(fakeScholarship=> {
          return scholarship({}, {}, { auth: { type: "ADMIN" }})
          .then(result => {
            expect(result[0].name).to.equal(fakeScholarship.name)
          });
        });
    });

    it("returns multiple scholarships, ordered", function(){
      return Promise.all([fakeScholarship({name: 'B'}), fakeScholarship({name: 'A'})])
        .then(models=> {
          return scholarship({}, 
            {orderBy: {sort: 'name', direction: 'ASC'}}, 
            { auth: { type: "ADMIN" }
          })
          .then(scholarships => {
            expect(scholarships[0].name).to.equal(models[1].name)
            expect(scholarships[1].name).to.equal(models[0].name)
          });
        });
    });
  });
});