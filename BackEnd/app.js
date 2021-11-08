const express = require("express");
//require database 
require("./db/connection");
const User = require('./models/users');

//express app
const app = express();

//simple route
app.get('/', (req, res) => {
    res.send("Welcome to User Application (CRUD)");
});

//express middleware parses json format and returns object
app.use(express.json());

//add new users
app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const createUser = await newUser.save();
        res.status(201).send(createUser);
    }
    catch(e) {
        res.status(404).send(e);
    }
})

//read the data of all users
app.get("/users", async (req, res) => {
    try {
        const userData = await User.find();
        res.send(userData);
    }
    catch (e) {
        res.send(e);
    }
});

//get the data of a individual user
app.get("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getUserData = await User.findById({ _id });
        //console.log(getUserData);
        if (!getUserData)
        {
            return res.status(404).send();
        }
        else
        {
            res.send(getUserData);    
        }
        
    } catch(e) {
        res.send(e);
    }
});

//update username and name
app.patch("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateUser = await User.findByIdAndUpdate({ _id },  { "name": req.body.name  ,  "username": req.body.username });
        res.send(updateUser);
    }
    catch (e)
    {
        res.status(404).send(e);
    }
});

//delete user 
app.delete("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const delUser = await User.findByIdAndDelete(req.params.id);
        if (!delUser)
        {
            return res.status(404).send();
        }
        else
        {
            res.send(delUser);    
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

//Port connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server connected at ${PORT}`);
});