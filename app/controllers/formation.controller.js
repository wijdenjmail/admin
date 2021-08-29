
const db = require('../config/db.config.js');
const Formation = db.formations;

//POST or create a new category
exports.create = (req, res) => {
    let formation = {};

    try{
        // Building Category object from uploading request's body
        formation.designation = req.body.designation;
        formation.description = req.body.description;
        formation.photo = req.body.photo;
        formation.duration = req.body.duration;
        formation.maxLearner = req.body.maxLearner;
        formation.language = req.body.language;
        formation.comment = req.body.comment;
        formation.published = req.body.published;
        formation.categoryId = req.body.categoryId;
        



        
        // Save to MySQL database
        Formation.create(formation).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Formation with id = " + result.id,
                formation: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}




//GET all formations

exports.retrieveAllFormations = (req, res) => {
  // find all Formation information from 
  Formation.findAll({include: ["sections"]})
      .then(formationInfo => {
          res.status(200).json({
              message: "Get all Formations' Infos Successfully!",
              formations: formationInfo
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}

//GET formation by id
exports.getFormationById = (req, res) => {
  // find all Formation information from 
  let formationId = req.params.id;
  Formation.findByPk(formationId,  {include: ["sections"]})
      .then(formation => {
          res.status(200).json({
              message: " Successfully Get a Formation with id = " + formationId,
              formations: formation
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}

//UPDATE a formation with id
exports.updateById = async (req, res) => {
  try{
      let formationId = req.params.id;
      let formation = await Formation.findByPk(formationId);
  
      if(!formation){
          // return a response to client
          res.status(404).json({
              message: "Not Found for updating a formation with id = " + formationId,
              formation: "",
              error: "404"
          });
      } else {    
          // update new change to database
          let updatedObject = {
              designation: req.body.designation,
              description: req.body.description,
              photo: req.body.photo,
              duration: req.body.duration,
              maxLearner: req.body.maxLearner,
              language: req.body.language,
              comment: req.body.comment,
              published: req.body.published
          
 
          }
          let result = await Formation.update(updatedObject, {returning: true, where: {id: formationId}});
          
          // return the response to client
          if(!result) {
              res.status(500).json({
                  message: "Error -> Can not update a formation with id = " + req.params.id,
                  error: "Can NOT Updated",
              });
          }

          res.status(200).json({
              message: "Update successfully a Formation with id = " + formationId,
              formation: updatedObject,
          });
      }
  } catch(error){
      res.status(500).json({
          message: "Error -> Can not update a formation with id = " + req.params.id,
          error: error.message
      });
  }
}

//DELETE a Formation by id
exports.deleteById = async (req, res) => {
  try{
      let formationId = req.params.id;
      let formation = await Formation.findByPk(formationId);

      if(!formation){
          res.status(404).json({
              message: "Does Not exist a Formation with id = " + formationId,
              error: "404",
          });
      } else {
          await formation.destroy();
          res.status(200).json({
              message: "Delete Successfully a Formation with id = " + formationId,
              formation: formation,
          });
      }
  } catch(error) {
      res.status(500).json({
          message: "Error -> Can NOT delete a Formation with id = " + req.params.id,
          error: error.message,
      });
  }
}


//Delete all formations from DB
exports.deleteAll = (req, res) => {
    //let Category = {};
    Formation.destroy({
        where: {},
        turncate: true
    })
    .then(nums => {
        res.send({message: `${nums} Formations were deleted successfully`});

    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error whule removing formation"
        });
    });
}; 

//find all published categories
exports.findAllPublished = (req, res) => {

    Formation.findAll({where:{
        
            published: {
              [Op.eq]: true
            }
          },
          include: ["components"],
    })
    .then(formation => {
        res.json(formation);
    })
}