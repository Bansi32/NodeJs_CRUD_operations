const mongoose = require("mongoose");
//connect database
mongoose.connect("mongodb://localhost:27017/users-api").then(() => {
    console.log("Connection successful");
}).catch((e) => {
    console.log("Connection unsuccessful");
});