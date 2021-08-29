const Category = require("./Category");

module.exports = (sequelize, Sequelize) => {
	const Formation = sequelize.define('formation', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  designation: {
			type: Sequelize.STRING
	  },
	  description: {
		type: Sequelize.STRING
  	  },
	  photo: {
			type: Sequelize.STRING
	  },
	  duration: {
			type: Sequelize.INTEGER
    },
    maxLearner: {
            type: Sequelize.INTEGER
    },
        language: {
            type: Sequelize.STRING
    },
        comment: {
            type: Sequelize.STRING
    },
    published: {
        type: Sequelize.BOOLEAN
}

	});
 

	return Formation;
}