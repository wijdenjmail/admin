const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
const db = require('./app/config/db.config');

const categoryRouter = require('./app/routes/category.routes');
const formationRouter = require('./app/routes/formation.routes');
const sectionRouter = require('./app/routes/section.routes');
const componentRouter = require('./app/routes/component.routes');
const adminRouter = require('./app/routes/admin.routes');



// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
}); 


const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api/categories', categoryRouter);
app.use('/api/formation', formationRouter);
app.use('/api/section', sectionRouter);
app.use('/api/component', componentRouter);

app.use('/admin', adminRouter);


// Create a Server
const server = app.listen(5000, function () {
 
    let host = server.address().address
    let port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port); 
  })
