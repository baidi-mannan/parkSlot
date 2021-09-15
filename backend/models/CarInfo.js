const mongoose= require('mongoose')


const CarInfoS = new mongoose.Schema({
    company: String ,
    modelName: String,
    plateNumber: String,
   color: String,
   slot: Number,
   date: String
  });

  module.exports =mongoose.model('CarInfo',CarInfoS);