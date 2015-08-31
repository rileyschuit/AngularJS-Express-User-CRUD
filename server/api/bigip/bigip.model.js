'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BIGIPSchema = new Schema({
  name: String,
  address: String,
  active: Boolean
});

module.exports = mongoose.model('BIGIP', BIGIPSchema);