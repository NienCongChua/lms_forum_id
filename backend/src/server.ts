import express from "express";
import cors from "cors";
import { PORT } from "./config/dotenv";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});