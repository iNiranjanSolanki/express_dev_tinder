const express = require('express');
const app = express();
require("dotenv").config();
const cookieParser = require('cookie-parser');
const {connectDB} =require("./config/db");
app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const requestRouter = require("./routes/ConnectionRoute");
app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
connectDB()
        .then(() => {
                console.log("database connection establish");
                app.listen(process.env.PORT || 7000, () => (
                        console.log(`Server is running on http://localhost:${process.env.PORT || 7000}`)
                ))
        })
        .catch((err) => console.error(err));


