const server = require("../index")
const chaiHttp = require("chai-http")
const chai = require("chai")

chai.should()
chai.use(chaiHttp)

describe("addReview", () => {
    it('it should add a review', (done) => {
        const data = {
            Review: "great taste"
        }
        chai
            .request(server)
            .post("/review/addreview/648adeb14f59be71efc6b33e/648da8aadbb7c392c8cb3b79")
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.an("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq('New review added successfully')
            }); done()

    })
})

//list review
describe("list review", () => {
    it('it should list all companies', (done) => {
        chai
            .request(server)
            .get("/review/listreview")
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.an("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq('Here are all the Reviews')
            }); done()
    })
})

//delete
describe("delete review", () => {
    it("should delete a review by ID and return a success message", (done) => {
        chai
            .request(server)
            .delete("/review/deletereview/648daf33b43ea122b47159ed")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.an("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("review deleted successfully");

            }); done();
    });

    it("should return an error if the ID is not found", (done) => {
           chai
            .request(server)
            .delete("/review/deletereview/A48dc67914bd5c6c7754ae92")
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.an("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("No data found");
            }); done();
    });
});

