let express = require('express');
//const { formations } = require('../');
let router = express.Router();
 
const formations = require('../controllers/formation.controller.js');



router.post('/create', formations.create);
router.get('/all', formations.retrieveAllFormations);
router.get('/onebyid/:id', formations.getFormationById);
router.put('/update/:id', formations.updateById);
router.delete('/delete/:id', formations.deleteById);
router.delete('/deleteAll', formations.deleteAll);
router.get('/findPublished', formations.findAllPublished);


module.exports = router;