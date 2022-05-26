const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    }
}, {timestamps: true})


const Movie = mongoose.model("Movie", movieSchema)


module.exports = Movie