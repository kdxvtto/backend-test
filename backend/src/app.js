import express from "express";
import cors from "cors";

import orderRoutes from "./routes/orderRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import addOnRoutes from "./routes/addOnRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", healthRoutes);
app.use("/health", healthRoutes);
app.use("/orders", orderRoutes);
app.use("/reports", reportRoutes);
app.use("/products", productRoutes);
app.use("/add-ons", addOnRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
