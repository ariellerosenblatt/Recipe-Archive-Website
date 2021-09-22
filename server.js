const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./server/config/db.config');

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors({ corsOptions, credentials: true }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./server/models');
const Role = db.role;
const MONGO_URI =
  'mongodb+srv://user1:user1@cluster0.e6fli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
db.mongoose
  .connect(
    MONGO_URI || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    initial();
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Arielle's creative project application." });
});

// routes
require('./server/routes/auth.routes')(app);
require('./server/routes/user.routes')(app);
require('./server/routes/recipe.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'moderator',
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: 'admin',
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
