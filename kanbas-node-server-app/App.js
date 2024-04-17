import express from "express";
import mongoose from "mongoose";
import Lab5 from "./Lab5.js";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import Hello from "./Hello.js"
import cors from "cors";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
app.use(cors());
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000);