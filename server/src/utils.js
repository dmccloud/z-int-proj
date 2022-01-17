const { Sequelize } = require("sequelize");

module.exports.createStore = () => {
  const Op = Sequelize.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: "./store.sqlite",
    operatorsAliases,
    logging: false,
  });

  const users = db.define("user", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    email: Sequelize.STRING,
    profileImage: Sequelize.STRING,
    token: Sequelize.STRING,
  });

  const events = db.define("event", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    eventId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
  });

  return { db, users, events };
};
