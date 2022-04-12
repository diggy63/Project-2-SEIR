const mongoose = require('mongoose');

// replace your database connection string here
//that the code for release database
//mongoose.connect(process.env.DATABASE_URL,{ 
mongoose.connect('mongodb://localhost/drinks9', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

// database connection event
db.on('connected', function () {
  console.log(`Mongoose connected to: ${db.host}:${db.port}`);
});
