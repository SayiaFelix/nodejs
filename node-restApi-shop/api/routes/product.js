const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

// const fileFilter =(req,file,cb)=>{
//     // reject file
//     if (file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
//       cb(null,false);
//     }else{
//           //accept file
//         cb(null,true)
//     }
// }

const upload = multer({
    storage: storage, limit: {
        fileSize: 1024 * 1024 * 5
    }
    // ,fileFilter: fileFilter 
});

const productController = require('../controllers/product')

router.post('/',checkAuth, upload.single('productImage'), productController.product_post_all);
router.get('/', productController.product_get_all);
router.get('/:productId', productController.product_get_by_id);
router.patch('/:productId', productController.product_update);
router.delete('/:productId', productController.product_delete);

module.exports = router;