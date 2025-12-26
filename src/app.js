const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {connectDB} =require("./config/db");
const port = 7000;      
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
                app.listen(port, () => (
                        console.log(`Server is running on http://localhost:${port}`
                        )))
        })
        .catch((err) => console.error(err));


