import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/dbConfig";
import bcrypt from 'bcrypt';

export type UserAttribute = InferAttributes<UserModel>;
export type UserDto = InferCreationAttributes<UserModel, { omit: "id" }>;

interface UserModel extends Model<UserAttribute, UserDto> {
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export const UserModel = sequelize.define<UserModel>(
  "User",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "email",
        msg: "This email Id already exist. Please add new email id"
      },
      validate: {
        isEmail: {
          msg: "Is not a valid email"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val: string) {
        const hash = bcrypt.hashSync(val, bcrypt.genSaltSync(8));
        this.setDataValue('password', hash);
      },
    },
  },
  {
    // Other model option go here
  }
);