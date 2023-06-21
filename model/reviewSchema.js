const mongoose = require("mongoose")
require("./userSchema")
require("./companySchema")
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "user"
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "company",
    },
    Review: {
        type: String,
        require: true,

    },

    isActive: {
        type: Boolean,
        default: true
    }

})
reviewSchema.set('timestamps', true)
module.exports = mongoose.model('review', reviewSchema)