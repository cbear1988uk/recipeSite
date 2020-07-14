const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//Allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb+srv://cbull33:dbaccess@cluster0.xtewk.mongodb.net/Cluster0?retryWrites=true&w=majority');
mongoose.connection.once('open', ()=>{
  console.log('Live together, die alone');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000')
});
