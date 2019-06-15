const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create a new connection
const sequelize = new Sequelize('socialdb', 'socialadmin', 'facebook', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
  }
});

//Defining User model

const User = sequelize.define('user', {
  uid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING(25)
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING(6)
  },
  dob: {
    type: Sequelize.DATEONLY
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  pincode: {
    type: Sequelize.INTEGER
  }
},
 {
  hooks: 
  {
    beforeCreate: (user, options) => {
      user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, saltRounds) : "";
    },
    beforeUpdate: (user, options) => {
      user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, saltRounds) : "";
    }
  }
});

// Creating an Instance Method in sequelize version > 4

User.prototype.validPassword =function(password) {
  return bcrypt.compareSync(password, this.password);
}

// Synchronize the database

sequelize.sync()
  .then(() => console.log("Database created"))
  .catch((err) => console.error(err))


module.exports = {
  sequelize,
  User
}

/* To test the connection

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});  */

/* To close the connection
sequelize.close(); */
