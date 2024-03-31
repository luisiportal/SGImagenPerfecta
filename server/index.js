import express from "express";
import { PUERTO } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import loginRouter from "./routes/login.routes.js";
import { sequelize } from "./db.js";
import routerReservas from "./routes/reserva.routes.js";
import routerTrabajadores from "./routes/trabajadores.routes.js";
import routerVentas from "./routes/ventas.routes.js";
import { associations } from "./models/associations.js";
import routerRegistroVentas from "./routes/registro_ventas.routes.js";

export const app = express();
app.use(
  cors({
    origin: "http://192.168.1.1:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(indexRoutes);
app.use(productoRoutes);
app.use(routerReservas);
app.use(routerVentas);
app.use(routerRegistroVentas);
app.use(routerTrabajadores);
app.use("/api", loginRouter);

associations();
await sequelize.sync({ alter: true });

app.listen(PUERTO, () => {
  console.log(`El server esta en el puerto : ${PUERTO}....`);
});
