import express from "express";
import userRoutes from "./routs/users.js";
import unitRoutes from "./routs/units.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/units", unitRoutes);

app.listen(3100, () => {
  console.log("Server running on port 3100");
});
