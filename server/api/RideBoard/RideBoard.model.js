'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



 var RideDataSchema = new Schema(
    {
      id: Number, 
      from: {
        id: Number, 
        name: String
      }, 
      to: {
        data: [
          {
            name: String, 
            id: Number
          }
        ]
      }, 
      message: String, 
      actions: [
        {
          name: String, //comments
          link: String
        }, 
        {
          name: String,   //like
          link: String
        }
      ], 
      privacy: {
        value: ""
      }, 
      type: String, 
      application: {
        name: String, 
        namespace: String, 
        id: Number
      }, 
      created_time: String, //time, string or time?
      updated_time: String
    
}); 

module.exports = mongoose.model('RideData', RideDataSchema);