const Schema = require('mongoose').Schema
const Abstract = require('./abstract')

//* _*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
// Schema Definition
//* _*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
var movieObject = new Schema({
    id: { type: String, required: true },
    titleCh: { type: String, required: true },
    titleEn: { type: String, required: true },
    duration: { type: Number, default: -1 },
    grade: { type: Number, required: true },
    classified: { type: String, required: true },
    img: { type: String, required: true },
    imgLarge: { type: String, required: true },
    releaseDate: { type: String, required: true },
    midasRating: { type: Object },
    createdAt: { type: Date, default: Date.now },
})

movieObject.pre('save', function (next) {
    this.updatedAt = Date.now();
    next()
})

const movieModel = new Abstract('Movie' , movieObject)

module.exports = movieModel