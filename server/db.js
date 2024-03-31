import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "ImagenPerfecta",
  "postgres",
  "otravuelta",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
