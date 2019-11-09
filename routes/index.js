var express = require('express');
var multer = require('multer');
var router = express.Router();
var mongoose = require('mongoose');
var uploadspModel = require('../models/uploadsp')
mongoose.connect('mongodb://localhost/sanpham', { useNewUrlParser: true})
// Mang duong dan anh
var anhs = [];
//Multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Định nghĩa folder chứa ảnh
    cb(null, './anhsanpham')
  },
  filename: function (req, file, cb) {
    // Định nghĩa tên file
    cb(null, file.originalname + '-' + Date.now())
  }
}) 
var upload = multer({ storage: storage })
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Gọi hàm Upload */
router.post('/uploadfile', upload.any(), function(req, res, next) {
  // Tạo tên file đưa vào mảng ảnhs
  var tentamthoi = req.files[0].path;
  anhs.push(tentamthoi)
  // console.log(anhs);  
  res.status(200).send(req.files)
});

/* Lấy sản phẩm */
router.post('/upsanpham', function(req, res, next) {
  var ten = req.body.ten, gia = req.body.gia
  var motdoituong = {
    'ten': ten,
    'gia': gia,
    'anh': anhs
  }
  var dulieu = new uploadspModel(motdoituong);
  dulieu.save();
  // console.log(anhs);  
  res.render('thanhcong')
});

// Xem dữ liệu
router.get('/xemsp', function(req, res, next) {
  // Sử dụng Mongoose lấy dữ liệu đổ ra VIEW
  uploadspModel.find({}, function(err, data){
    // console.log(data);    
    res.render('xemsp', {  dulieu: data });
  })
});


module.exports = router;
