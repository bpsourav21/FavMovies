import { Sequelize } from "sequelize";
const dbUrl = process.env.DATABASE_URL || "localhost";

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
