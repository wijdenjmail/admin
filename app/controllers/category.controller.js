
const db = require('../config/db.config.js');
const Category = db.categories;
const Formation = db.formations;
const {Op} = require("sequelize");

//POST or create a new category
exports.create = (req, res) => {
    let category = {};

     //validate that designation is not empty!
     if (!req.body.designation) {
        res.status(400).send({
          message: "Designation can not be empty!"
        });
        return;
      }
    try{
        // Building Category object from uploading request's body
        category.designation = req.body.designation;
        category.order = req.body.order;
        category.published = req.body.published;

        
        // Save to MySQL database
        Category.create(category).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Category with id = " + result.id,
                category: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

//GET all categories

exports.retrieveAllCategories = (req, res) => {
    // find all Category information from 
    Category.findAll({include: ["formations"]})
        .then(categoryInfo => {
            res.status(200).json({
                message: "Get all Categories' Infos Successfully!",
                categories: categoryInfo
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

//GET category by id
exports.getCategoryById = (req, res) => {
    // find all Category information from 
    let categoryId = req.params.id;
    Category.findByPk(categoryId, {include: ["formations"]})
        .then(category => {
            res.status(200).json({
                message: " Successfully Get a Category with id = " + categoryId,
                categories: category
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

  //UPDATE a category with id
  exports.updateById = async (req, res) => {
    try{
        let categoryId = req.params.id;
        let category = await Category.findByPk(categoryId);
    
        if(!category){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a category with id = " + categoryId,
                category: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                designation: req.body.designation,
                order: req.body.order,
                published: req.body.published
            }
            let result = await Category.update(updatedObject, {returning: true, where: {id: categoryId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a category with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Category with id = " + categoryId,
                category: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a category with id = " + req.params.id,
            error: error.message
        });
    }
}

//DELETE a Category by id
exports.deleteById = async (req, res) => {
    try{
        let categoryId = req.params.id;
        let category = await Category.findByPk(categoryId);

        if(!category){
            res.status(404).json({
                message: "Does Not exist a Category with id = " + categoryId,
                error: "404",
            });
        } else {
            await category.destroy();
            res.status(200).json({
                message: "Delete Successfully a Category with id = " + categoryId,
                category: category,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a category with id = " + req.params.id,
            error: error.message,
        });
    }
};


//Delete all categories from DB
exports.deleteAll = (req, res) => {
    //let Category = {};
    Category.destroy({
        where: {},
        turncate: true
    })
    .then(nums => {
        res.send({message: `${nums} Categories were deleted successfully`});

    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error whule removing category"
        });
    });
}; 

//find all published categories
exports.findAllPublished = (req, res) => {

    Category.findAll({where:{
        
            published: {
              [Op.eq]: true
            }
          },
          include: ["formations"],
    })
    .then(category => {
        res.json(category);
    })
}