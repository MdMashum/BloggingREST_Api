const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');2
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


 mongoose.connect("mongodb+srv://khushboobabil12:khushboo12345@cluster0.j9hng.mongodb.net/Blogging-Sites", {
     useNewUrlParser: true
 })
 .then( () => console.log("MongoDb is connected"))
 .catch ( err => console.log(err) )


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
