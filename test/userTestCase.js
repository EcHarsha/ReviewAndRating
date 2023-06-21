const server = require("../index");
const chaiHttp = require("chai-http");
const chai = require("chai");
const { object } = require("joi");

chai.should();
chai.use(chaiHttp);

//sign up
describe("user signUp", () => {
    it("it should return success", (done) => {
        let random = Math.floor(Math.random() * 1000)
        const data = {
            name: "ranveer",
            emailId: `manve${random}@gmail.com`,
            password: "919711kk**A",
            phoneNo: "8624175128",
            address: "indore",
        }
        chai
            .request(server)
            .post("/user/signup")
            .set("Content-Type", "multipart/form-data")
            .attach("profilePic", "image_1686937991201_userPhoto.jpg")
            .field(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.an("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Registration Successfully");
            })
        done()
    }); it("it should return error", (done) => {
        const data = {
            name: "ranveer",
            emailId: "manveeer@gmail.com",
            password: "919711kk**A",
            phoneNo: "8624175128",
            address: "Indore",
        }
        chai
            .request(server)
            .post("/user/signup")
            .set("Content-Type", "multipart/form-data")
            .attach("profilePic", "image_1686937991201_userPhoto.jpg")
            .field(data)
            .end((err, res) => {
                res.should.have.status(409)
                res.should.be.an("object");
                res.body.should.have.property("success").eq(false)
                res.body.should.have.property("message").eq("Email already exist")
            });
        done()
    })

})

//login 
describe("user login", () => {
    it("it should return login user details", (done) => {
        const data = {
            email: "manveeer@gmail.com",
            password: "919711kk**A"
        }
        chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.a("object")
                res.body.should.have.property("success").eq(true)
                res.body.should.have.property("message").eq("Login Successfully")
            }); done()
    })
    it("it should return error if password is wrong", (done) => {
        const data = {
            email: "manveeer@gmail.com",
            password: "919711**A"
        }
        chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(401)
                res.should.be.a("object")
                res.body.should.have.property("success").eq(false)
                res.body.should.have.property("message").eq("Invalid email or password")
            }); done()
    })
    it("it should return error if email is not found", (done) => {
        const data = {
            email: "pianve0eer@gmail.com",
            password: "919711kk**A"
        }
        chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(404)
                res.should.be.a("object")
                res.body.should.have.property("success").eq(false)
                res.body.should.have.property("message").eq("UserEmail not found")
            }); done()
    })

})

//forget password
describe("forgot password", () => {
    it("it should return mail successfully", (done) => {
        const data = {
            email: "manve744@gmail.com" //mail present at database
        }
        chai
            .request(server)
            .post("/user/forgotpassword")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.an(object)
                res.body.should.have.property("success").eq(true)
                res.body.should.have.property('message').eq("Mail sent successfully")
            }); done()
    })
    it("it should return error if email is invalid", (done) => {
        const data = {
            email: "znvier@gmail.com"
        }
        chai
            .request(server)
            .post("/user/forgotpassword")
            .send(data)
            .end((err, res) => {
                res.should.have.status(404)
                res.should.be.an(object)
                res.body.should.have.property("success").eq(false)
                res.body.should.have.property('message').eq("User not found")
            }); done()
    })
})

//reset password
describe("reset password", () => {
    it("it should return password reset succesfully details", (done) => {
        const data = {
            newPassword: "heloovH#1",
            confirmPassword: "heloovH#1"
        }
        chai
            .request(server)
            .post("/user/resetpassword/648adeb14f59be71efc6b33e/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhhZGViMTRmNTliZTcxZWZjNmIzM2UiLCJ1c2VyRW1haWwiOiJoYXJzaGFAZ21haWwuY29tIiwiaWF0IjoxNjg2OTEyMzgxLCJleHAiOjE2ODY5MTU5ODF9.flu1xbG_7lUxSP7xa5lj8FDAreDEoNgQXYiQlf-tLkE")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.an(object)
                res.body.should.have.property("success").eq()
                res.body.should.have.property("message").eq("Password updated successfully")
            }); done()

    })
    it("it should return password reset succesfully details", (done) => {
        const data = {
            newPassword: "heloovH#1",
            confirmPassword: "heloovH#1"
        }
        chai
            .request(server)
            .post("/user/resetpassword/648adeb14f59be71efc6b33e/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhhZGViMTRmNTliZTcxZWZjNmIzM2UiLCJ1c2VyRW1haWwiOiJoYXJzaGFAZ21haWwuY29tIiwiaWF0IjoxNjg2OTEyMzgxLCJleHAiOjE2ODY5MTU5ODF9.flu1xbG_7lUxSP7xa5lj8FDAreDEoNgQXYiQlf-tLkE")
            .send(data)
            .end((err, res) => {
                res.should.have.status(403)
                res.should.be.an(object)
                res.body.should.have.property("success").eq(false)
                res.body.should.have.property("message").eq("Password updated successfully")
            }); done()
    })
})