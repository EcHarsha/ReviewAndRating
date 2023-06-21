const server = require("../index")
const chaiHttp = require("chai-http")
const chai = require("chai")

chai.should()
chai.use(chaiHttp)

describe('addCompany', () => {
  it('should add a company', (done) => {
    const data = {
      companyName: 'Dairy',
      companyDetails: 'AMUL the taste of India',
      companyLocation: 'Anand',
      city: 'Anand',
      country: 'India',
      companyEmail: 'amul@gmail.com',
      companyWebsite: 'amul.com',
      foundedDate: '14 Dec, 1946',
    };

    chai
      .request(server)
      .post('/company/addcompany')
      .set('Content-Type', 'multipart/form-data')
      .attach('companyLogo', 'image_1687005358043_Amul.jpg')
      .field(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eq(true);
        res.body.should.have.property('message').eq('Company added successfully');
      }); done();
  });
});

//list company
describe("Test for product list Api", () => {
  it("it should return list of all product", (done) => {
    chai
      .request(server)
      .get("/company/listcompany")
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have.property("message").eq("Here is the list of company");
        res.body.should.have.property("listAll");

      }); done();
  });
});

//updateCompany
describe("Update Company Details", () => {
  it("should update a company and return success message", (done) => {
    const data = {
      companyName: "hhhhh",
      companyDetails: "AMUL the taste of India",
      companyLocation: "Anand",
      city: "Anand",
      country: "India",
      companyEmail: "Amul@gmail.com",
      companyWebsite: "amul@.com",
      foundedDate: "14 Dec, 1946",
    }
    chai
      .request(server)
      .patch("/company/updatecompany/648da8bddbb7c392c8cb3b7d")
      .set("Content-Type", "multipart/form-data")
      .attach("companyLogo", "image_1687005358043_Amul.jpg")
      .field(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have.property("message").eq('Update sucessfully')
      }); done()
  })
})

//delete
describe("delete company", () => {
  it("should delete a company by id and returns success msg", (done) => {
    chai
      .request(server)
      .delete("/company/deletecompany/648da8aadbb7c392c8cb3b79")
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have.property("message").eq("Company deleted successfully")
      }); done()
  })
  it("should retun error if id not found", (done) => {
    chai
      .request(server)
      .delete("/company/deletecompany/648dad650003b30ecca712e")
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have.property("message").eq("No data found")
      }); done()
  })
})
