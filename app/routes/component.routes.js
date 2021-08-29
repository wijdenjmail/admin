let express = require('express');
let router = express.Router();
 
const components = require('../controllers/component.controller.js');



router.post('/create', components.create);
router.get('/all', components.retrieveAllComponents);
router.get('/onebyid/:id', components.getComponentById);
router.put('/update/:id', components.updateById);
router.delete('/delete/:id', components.deleteById);
router.delete('/deleteAll', components.deleteAll);
router.get('/findAllPublished', components.findAllPublished);



module.exports = router;