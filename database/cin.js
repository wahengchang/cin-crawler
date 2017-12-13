const Schema = require('mongoose').Schema
const Abstract = require('./abstract')


//* _*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
// Schema Definition
//* _*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
var cinObject = new Schema({
  name: { type: String, required: true },
  yId: { type: String, required: true },
  id: { type: String, required: true },
  alias: { type: String, required: true },
  location: { type: String, required: true },
  geo: { type: Array, default: [-1,-1] },  
  createdAt: { type: Date, default: Date.now },
})

cinObject.pre('save', function (next) {
    this.updatedAt = Date.now();
    next()
})

const cinModel = new Abstract('Cin' , cinObject)

module.exports = cinModel