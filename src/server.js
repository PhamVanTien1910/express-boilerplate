require('dotenv').config();
import express from "express";
import initAuthRouter from "./router/auth.js";
import errorMiddleware from "./middlewares/errorHandle.js";
import initUserRouter from "./router/user.js";
import initPayRouter from "./payment/zalopay/routes/pay.js";
import connection from "./config/connectDB.js";
const app = express();
const port = process.env.PORT;
import swaggerSetup from "./docs/swagger.js";

app.use(express.urlencoded({extended: true}));
app.use(express.json());
connection();
initAuthRouter(app);
initUserRouter(app);
initPayRouter(app)
app.use(errorMiddleware);
swaggerSetup(app)
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});