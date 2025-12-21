const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {connectDB} =require("./config/db");
const User = require('./models/user');
const port = 7000;      
app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
        const userObj = {
                username: "onlyVishesh",
                firstName: "Vishesh",
                email: "okVishesh360@gmail.com",
                password: "vishesh1234",
                avatar: "https://avatars.githubusercontent.com/u/121187728?v=4",
                role: "admin",
        };

        // creating a new instance of User Model
        const user = new User(userObj);
        try {
                await user.save();
                res.send("User Added successfully");
        } catch (err) {
                res.status(400).send("error saving the user" + err.message);
        }
});
connectDB()
        .then(() => {
                console.log("database connection establish");
                app.listen(port, () => (
                        console.log(`Server is running on http://localhost:${port}`
                        )))
        })
        .catch((err) => console.error(err));


