const Schema = require('mongoose').Schema
const Abstract = require('./abstract')

//* _*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
// Schema Definition
//* _*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
var timeObject = new Schema({
  cinId: { type: String, required: true },
  movieId: { type: String, required: true },
  time: { type: Number, required: true },
  timeDate: { type: Date, required: true },
  timeStr: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

timeObject.pre('save', function (next) {
    this.updatedAt = Date.now();
    next()
})

const timeModel = new Abstract('Time' , timeObject)

module.exports = timeModel