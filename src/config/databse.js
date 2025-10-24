const mongoose = require("mongoose")

const connectDB=async()=>{
  await mongoose.connect("mongodb+srv://yugmalhotr91_db_user:p5MpDUElfoyUF4bi@cluster0.oejvndi.mongodb.net/mytinder")
}

module.exports={
    connectDB,
}