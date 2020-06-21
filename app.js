require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4500;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('mongoDB is connected!'))
    .catch(e => console.log(e));

// routers
app.use('/writers', require('./routes/writers'));
app.use('/todos', require('./routes/todos'));


app.listen(port, () => console.log(`server listening on PORT ${port}!`));
