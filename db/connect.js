const mongoose = require('mongoose')

const connectionString =
  'mongodb+srv://sonia:12345@nodeexpressprojects.5olzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// mongoose.connect(connectionString)
// .then(()=>console.log('connecté'))
// .catch((err)=> console.log(err))

const connectDB = (url) =>{
  return mongoose
    .connect(url)
    .then(() => console.log('connecté'))
    .catch((err) => console.log(err));
}

module.exports = connectDB