require("dotenv").config();
const mongoose=require("mongoose")
// Use the environment variable for the URI




// mongoose.connect(process.env.URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log("Connected to MongoDB");
// }).catch((error) => {
//   console.error("Error connecting to MongoDB:", error);
// });

async function dbConnect() {
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/blog") 
    console.log('connected to db')
} catch(err) {
    console.log(err) 
}
}
module.exports = dbConnect;
