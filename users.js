const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
  // Define attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // Add more attributes as needed
});

module.exports = User;
