/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var BIGIP = require('../api/bigip/bigip.model');
var User = require('../api/user/user.model');

BIGIP.find({}).remove(function() {
  BIGIP.create({
    name : 'BigIP01.shakeweight.com',
    address : '192.168.0.100',
    active : true
  }, {
    name : 'BigIP01.shamwow.com',
    address : '10.0.1.100',
    active : true
  }, {
    name : 'BigIP01.mightyputty.com',
    address : '10.10.5.100',
    active : false
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});