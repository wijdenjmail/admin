let express = require('express');
let router = express.Router();
 
const categories = require('../controllers/category.controller');



router.post('/create', categories.create);
router.get('/all', categories.retrieveAllCategories);
router.get('/onebyid/:id', categories.getCategoryById);
router.put('/update/:id', categories.updateById);
router.delete('/delete/:id', categories.deleteById);
router.delete('/deleteAll', categories.deleteAll);
router.get('/findPublished', categories.findAllPublished);



module.exports = router;