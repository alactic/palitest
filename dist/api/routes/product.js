'use strict';

var express = require('express');
var router = express.Router();

var productController = require('../controllers/products');
var checkAuth = require('../middlewares/check-auth-token');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function filename(req, file, cb) {
        var imageName = new Date().toDateString() + file.originalname;
        cb(null, imageName);
    }
});

var fileFilter = function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File format not supported'), false);
    }
};

var upload = multer({
    storage: storage,
    limit: {
        fileSize: 1024 * 1024
    },
    fileFilter: fileFilter
});

router.get('/', productController.get_all_products);

router.post('/', checkAuth, upload.single('productImage'), productController.post_product);

router.get('/:productId', checkAuth, productController.get_product_by_id);

router.patch('/:productId', checkAuth, productController.update_product);

router.delete('/:productId', checkAuth, productController.delete_update);

module.exports = router;