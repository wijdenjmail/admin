module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
	  name: {
		type: Sequelize.STRING
	  },
	  login: {
		type: Sequelize.STRING
	  },
	  password: {
		  type: Sequelize.INTEGER
	  }
	});
	
	return User;
}