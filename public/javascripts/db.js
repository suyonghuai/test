/**
 * Created by Yonghuai on 2016/7/22.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected...');
});

var userSchema = mongoose.Schema({
    name: String
});

var usersModel = mongoose.model('users', userSchema);

var models = {
    usersModel:usersModel
}

module.exports = models;