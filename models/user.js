'use strict';
const md5 = require('md5')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Name cannot be null'},
        notEmpty: {msg: 'Name cannot be empty'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email must be unique'
      },
      validate: {
        notNull: {msg: 'Email cannot be null'},
        notEmpty: {msg: 'Email cannot be empty'},
        isEmail: {msg: 'Invalid email address'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Password cannot be null'},
        notEmpty: {msg: 'Password cannot be empty'}
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Picture URL cannot be null'},
        notEmpty: {msg: 'Picture URL cannot be empty'},
        isUrl: {msg: 'Invalid Picture URL'}
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Location cannot be null'},
        notEmpty: {msg: 'Location cannot be empty'}
      }
    }
  }, {
    hooks: {
      beforeCreate: function (User) {
        User.password = md5(User.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};