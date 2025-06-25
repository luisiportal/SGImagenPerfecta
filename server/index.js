import express from "express";
import { FRONTEND_URL, PUERTO } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import ofertaRoutes from "./routes/oferta.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import loginRouter from "./routes/login.routes.js";
import { sequelize } from "./db.js";
import routerReservas from "./routes/reserva.routes.js";
import routerTrabajadores from "./routes/trabajadores.routes.js";
import serviciosRoutes from "./routes/servicios.routes.js";
import { associations } from "./models/associations.js";
import notificacionesRoutes from "./routes/notificaciones.routes.js";
import { Notificacion } from "./models/Notificacion.model.js";
import { Op } from "sequelize";
import routerUsuario from "./routes/usuario.routes.js";

export const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(indexRoutes);
app.use(ofertaRoutes);
app.use(routerReservas);
app.use(serviciosRoutes);
app.use(routerTrabajadores);
app.use(routerUsuario);
app.use(notificacionesRoutes);
app.use("/api", loginRouter);

const initializeDatabase = async () => {
  try {
    associations();
    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada");

    app.listen(PUERTO, () => {
      console.log(`El server esta en el puerto: ${PUERTO}....`);
    });

    await limpiarNotificacionesExpiradas();
    setInterval(limpiarNotificacionesExpiradas, 3600000);
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
};

const limpiarNotificacionesExpiradas = async () => {
  try {
    const resultado = await Notificacion.destroy({
      where: {
        fecha_eliminacion: {
          [Op.lte]: sequelize.fn("NOW"), // Usando Op importado
        },
      },
    });
    console.log(`Eliminadas ${resultado} notificaciones expiradas`);
  } catch (error) {
    console.error("Error limpiando notificaciones:", error);
  }
};
initializeDatabase();
