
const db = require('../config/db.config.js');
const Section = db.sections;

//POST or create a new section
exports.create = (req, res) => {
    let section = {};

    try{
        // Building Section object from uploading request's body
        section.designation = req.body.designation;
        section.order = req.body.order;
        section.published = req.body.published;

        
        // Save to MySQL database
        Section.create(section).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Section with id = " + result.id,
                section: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

//GET all Sections

exports.retrieveAllSections = (req, res) => {
    // find all Section information from 
    Section.findAll({include: ["components"]})
        .then(sectionInfo => {
            res.status(200).json({
                message: "Get all Sections' Infos Successfully!",
                sections: sectionInfo
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

//GET section by id
exports.getSectionById = (req, res) => {
    // find all Section information from 
    let sectionId = req.params.id;
    Section.findByPk(sectionId, {include: ["components"]})
        .then(section => {
            res.status(200).json({
                message: " Successfully Get a Category with id = " + sectionId,
                sections: section
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

  //UPDATE a section with id
  exports.updateById = async (req, res) => {
    try{
        let sectionId = req.params.id;
        let section = await Section.findByPk(sectionId);
    
        if(!section){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a section with id = " + sectionId,
                section: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                designation: req.body.designation,
                order: req.body.order,
                published: req.body.published
            }
            let result = await Section.update(updatedObject, {returning: true, where: {id: sectionId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a section with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Category with id = " + sectionId,
                section: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Section with id = " + req.params.id,
            error: error.message
        });
    }
}

//DELETE a Section by id
exports.deleteById = async (req, res) => {
    try{
        let sectionId = req.params.id;
        let section = await Section.findByPk(sectionId);

        if(!section){
            res.status(404).json({
                message: "Does Not exist a Section with id = " + sectionId,
                error: "404",
            });
        } else {
            await section.destroy();
            res.status(200).json({
                message: "Delete Successfully a Section with id = " + sectionId,
                section: section,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a section with id = " + req.params.id,
            error: error.message,
        });
    }
}

//Delete all sections from DB
exports.deleteAll = (req, res) => {
    //let Category = {};
    Section.destroy({
        where: {},
        turncate: true
    })
    .then(nums => {
        res.send({message: `${nums} Sections were deleted successfully`});

    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error whule removing section"
        });
    });
}; 

//find all published categories
exports.findAllPublished = (req, res) => {

    Section.findAll({where:{
        
            published: {
              [Op.eq]: true
            }
          },
          include: ["components"],
    })
    .then(section => {
        res.json(section);
    })
}