/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Post = require('../api/Post/Post.model');
var User = require('../api/user/user.model');

// Post.find({}).remove(function() {
//   Post.create({
//     name : 'Omer',
//     startingDestination:'Raanana',
//     finalDestination : 'Technion',
//     upvotes: 5,
//     timeOfDeparture: '17:25',
//     description: 'Leaving Tomorrow',
//     userId: '541768b9eb0fe2bf06d3d726'
//   }, {
//     name : 'Galit',
//     startingDestination: 'Technion',
//     finalDestination : 'Tel Aviv',
//     timeOfDeparture: '17:25',
//     upvotes: 6,
//     description: 'Leaving Today!',
//     userId: '541768b9eb0fe2bf06d3d726'
//   }, {
//     name : 'Tay',
//     startingDestination : 'Raanana',
//     finalDestination : 'Technion',
//     upvotes: 8,
//     timeOfDeparture: '17:25',
//     description: 'Decide quick! Leaving in ten min!',
//     userId: '541768b9eb0fe2bf06d3d726'
//   },  {
//     name : 'Vanessa',
//     startingDestination : 'Technion',
//     finalDestination : 'Jerusalem',
//     upvotes: 9,
//     timeOfDeparture: '17:25',
//     description: 'Flexible time',
//     userId: '541768b9eb0fe2bf06d3d726'
//   },  {
//     name : 'Paul',
//     startingDestination: 'Hod Hasharon',
//     finalDestination : 'Technion',
//     upvotes: 11,
//     timeOfDeparture: '17:25',
//     description: 'I prefer AM rides',
//     userId: '541768b9eb0fe2bf06d3d726'
//   },{
//     name : 'Harris',
//     startingDestination: 'Technion',
//     finalDestination : 'Tel Aviv',
//     upvotes: 14,
//     timeOfDeparture: '17:25',
//     description: 'Leaving after the exam!',
//     userId: '541768b9eb0fe2bf06d3d726'
//   });
// });

// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });