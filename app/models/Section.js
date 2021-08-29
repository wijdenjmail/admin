module.exports = (sequelize, Sequelize) => {
	const Section = sequelize.define('section', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
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
	
	return Section;
}