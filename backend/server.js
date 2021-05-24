const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const config = require('config');

const auth = require('./routes/auth');
const userSignup = require('./routes/user');
const postData = require('./routes/data');

const app = express();

if(!config.get('jwtPrivateKey')){
    console.log("FATAL ERROR, jwtPrivateKey not set");
    process.exit(1);
}

mongoose.connect(
  "mongodb://localhost/evident-bd",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
).then(() => console.log('connecting width mongodb..')
).catch((error) => console.log(error));

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/api/auth', auth);
app.use('/api/user', userSignup);
app.use('/api/data', postData);


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("app is running on port ", port);
});
