import express from 'express';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
  res.send('Kanban backend is running!');
});


export default app;
