const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

//const Sequelize = require('sequelize');
const db = require('../config/db.config.js');

AdminBro.registerAdapter(AdminBroSequelize);

const locale = {
    translations: {
      labels: {
        // change Heading for Login
        loginWelcome: 'E-learning platform',
      },
      messages: {
        loginWelcome: 'Welcome Admin!',
      },
      noRecordsInResource: {

        actions: "add new",
      },
    },
  };

const adminBro = new AdminBro({
  databases: [db],
  rootPath: '/admin',
  locale,
  branding: {
    logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBiNpzMSFihywUAMYQ-ccCtjAP1N227N96TA&usqp=CAU',
    companyName: "ELEARNIING",
    softwareBrothers: false,
  },
});

const ADMIN = {
    email: 'test@example.com',
    password: 'pwd',
  }

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      if (ADMIN.password === password && ADMIN.email === email) {
        return ADMIN
      }
      return null
    },
    cookieName: 'adminbro',
    cookiePassword: 'somePassword',
  });


module.exports = router;