let express = require('express');
let router = express.Router();
 
const sections = require('../controllers/section.controller.js');



router.post('/create', sections.create);
router.get('/all', sections.retrieveAllSections);
router.get('/onebyid/:id', sections.getSectionById);
router.put('/update/:id', sections.updateById);
router.delete('/delete/:id', sections.deleteById);
router.delete('/deleteAll', sections.deleteAll);
router.get('/findPublished', sections.findAllPublished);




module.exports = router;