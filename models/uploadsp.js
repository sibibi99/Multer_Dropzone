var mongoose = require('mongoose');

var Sanpham = new mongoose.Schema({
  ten: {type: String},
  gia: {type: Number},
  anh: {type: Array}
}, {collection: 'uploadsp'})

module.exports = mongoose.model("uploadsp", Sanpham)