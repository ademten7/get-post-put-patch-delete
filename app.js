const express = require("express");
const app = express();
require("dotenv").config();

const userRoute = require("./routes/usersRouter");
const PORT = process.env.PORT || 4001;
//express middleware to parsing json data
app.use(express.json());

app.use("/users", userRoute);

app.listen(PORT, console.log(`server is running : ${PORT}`));
