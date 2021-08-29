module.exports = (sequelize, Sequelize) => {
	const Component = sequelize.define('component', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  title: {
			type: Sequelize.STRING
	  },
	  typeDocument: {
		type: Sequelize.STRING
  	  },
	  linkDocument: {
			type: Sequelize.STRING
	  },
	  published: {
			type: Sequelize.BOOLEAN
	  }
	});
	
	return Component;
}