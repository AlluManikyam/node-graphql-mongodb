const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const port = process.env.PORT || 8001;
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');


app.all('/*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.static('build'));


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));
  
  app.use(errorHandler);
  app.listen(port, () => {
   console.log(`club99 running on port ${port}`);
  });