const Schema = require('mongoose').Schema
const Abstract = require('./abstract')

//* _*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
// Schema Definition
//* _*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
var timeObject = new Schema({
  cinId: { type: String, required: true },
  movieId: { type: String, required: true },
  timeList: { type: Array, required: true },
  timeStrList: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
})

timeObject.pre('save', function (next) {
    this.updatedAt = Date.now();
    next()
})

const timeModel = new Abstract('Time' , timeObject)

module.exports = timeModel