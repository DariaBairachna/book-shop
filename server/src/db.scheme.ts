import { Sequelize, DataTypes } from "sequelize";
import { UserModel, BookModel, AuthorModel, BookInAuthorModel } from "./repositories";

export const sequelize = new Sequelize("books", "root", "MySQL123dasha", {
  dialect: "mysql",
  storage: "127.0.0.1"
});

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  sequelize,
  modelName: "user"
});

AuthorModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: DataTypes.STRING,
}, {
  sequelize,
  modelName: "authors"
});

BookModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  cover: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  category: DataTypes.STRING,
  price: DataTypes.STRING,
  currency: DataTypes.STRING,
}, {
  sequelize,
  modelName: "book"
});

BookInAuthorModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
}, {
  sequelize,
  modelName: "book-in-author"
});

BookModel.belongsToMany(AuthorModel, {through: BookInAuthorModel});
AuthorModel.belongsToMany(BookModel, {through: BookInAuthorModel});
  


sequelize.sync().then(result => {
  // console.log(result);
}).catch(err => console.log(err));

exports.models = {
  BookModel,
  AuthorModel,
  BookInAuthorModel
}