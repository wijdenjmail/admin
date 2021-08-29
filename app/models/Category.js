
module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define('category', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
			allowNull: false,
            primaryKey: true
      },
	  designation: {
			type: Sequelize.STRING
	  },
	  order: {
		type: Sequelize.INTEGER
  	  },
	  published: {
			type: Sequelize.BOOLEAN
	  }
	});
	
	Category.associate = (models)=> {
		Category.hasMany(models.Formations);
 
	}

	  
	
	return Category;
}