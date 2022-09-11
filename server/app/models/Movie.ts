import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../db/index";
import { UserModel } from "./User";

export type MovieAttribute = InferAttributes<MovieModel>;
export type MovieDto = InferCreationAttributes<MovieModel, { omit: "id" }>;

interface MovieModel extends Model<MovieAttribute, MovieDto> {
  id: CreationOptional<number>;
  name: string;
  userId: number;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export const MovieModel = sequelize.define<MovieModel>(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
  }
);

MovieModel.belongsTo(UserModel, { foreignKey: "userId", as: "UserMovie" });
