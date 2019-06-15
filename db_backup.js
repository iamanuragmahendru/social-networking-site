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

const User = sequelize.define('user', {
  uid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNunl: false
  }
});

//validPassword function to be used by passportjs

// function validPassword(password) {
//   return bcrypt.compareSync(myPlaintextPassword, hash)
// }

User.sync({force: true})
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

//Encrypt the password before entering it to database

// , {
//   hooks: {
//     beforeCreate: (user, options) => {
//       user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, saltRounds) : "";
//     },
//     beforeUpdate: (user, options) => {
//       user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, saltRounds) : "";
//     }
//   }
// }