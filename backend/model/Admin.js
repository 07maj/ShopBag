const mongoose = require("mongoose")


const {model, Schema} = mongoose

const adminSchema = new Schema({
    adminUser:{type: String, required: true},
    adminEmail:{ type: String, required: true },
    adminPassword:{ type: String, required: true },
    adminContact:{ type: String, required: true },

})

module.exports = model ("admin",adminSchema)