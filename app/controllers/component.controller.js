
const db = require('../config/db.config.js');
const Component = db.components;

//POST or create a new Component
exports.create = (req, res) => {
    let component = {};

    try{
        // Building Component object from uploading request's body
        component.title = req.body.title;
        component.typeDocument = req.body.typeDocument;
        component.linkDocument = req.body.linkDocument;
        component.published = req.body.published;


       
        // Save to MySQL database
        Component.create(component).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Component with id = " + result.id,
                component: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

//GET all Components

exports.retrieveAllComponents = (req, res) => {
    // find all Components information from 
    Component.findAll()
        .then(componentInfo => {
            res.status(200).json({
                message: "Get all Components' Infos Successfully!",
                components: componentInfo
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

//GET Component by id
exports.getComponentById = (req, res) => {
    // find all Component information from 
    let componentId = req.params.id;
    Component.findByPk(componentId)
        .then(component => {
            res.status(200).json({
                message: " Successfully Get a Component with id = " + componentId,
                components: component
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

  //UPDATE a Component with id
  exports.updateById = async (req, res) => {
    try{
        let componentId = req.params.id;
        let component = await Component.findByPk(componentId);
    
        if(!component){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a Component with id = " + componentId,
                component: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                title: req.body.title,
                typeDocument: req.body.typeDocument,
                linkDocument: req.body.linkDocument,
                published: req.body.published
                
            }
            let result = await Component.update(updatedObject, {returning: true, where: {id: componentId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Component with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Component with id = " + componentId,
                component: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Component with id = " + req.params.id,
            error: error.message
        });
    }
}

//DELETE a Component by id
exports.deleteById = async (req, res) => {
    try{
        let componentId = req.params.id;
        let component = await Component.findByPk(componentId);

        if(!component){
            res.status(404).json({
                message: "Does Not exist a Component with id = " + componentId,
                error: "404",
            });
        } else {
            await component.destroy();
            res.status(200).json({
                message: "Delete Successfully a Component with id = " + componentId,
                component: component,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Component with id = " + req.params.id,
            error: error.message,
        });
    }
}

//Delete all components from DB
exports.deleteAll = (req, res) => {
    //let Category = {};
    Component.destroy({
        where: {},
        turncate: true
    })
    .then(nums => {
        res.send({message: `${nums} Components were deleted successfully`});

    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error whule removing component"
        });
    });
};


//find all published categories
exports.findAllPublished = (req, res) => {

    Component.findAll({where:{
        
            published: {
              [Op.eq]: true
            }
          },
          include: ["formations"],
    })
    .then(component => {
        res.json(component);
    }).catch(err);
}