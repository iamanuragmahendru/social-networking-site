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

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Defining data model for posts

const Post = sequelize.define('post', {
postId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  postText: {
    type: Sequelize.TEXT,
    allowNull:false
  }
});

// Defining data model for comments

const Comment = sequelize.define('comment', {
  commentId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  commentText: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// Defining data model for profile pictures

const ProfilePic = sequelize.define('profilePic', {
  profilePicId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  profilePicName: Sequelize.STRING
});

// Defining data model for follow list

const Follow = sequelize.define('follow', {
  followid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

// Defining Feedback data model

const Feedback = sequelize.define('feedback', {
  feedbackId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  feedbackText: Sequelize.TEXT
});

// Data Model for admins

const Admin = sequelize.define('admin', {
  adminId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
});

// Association between different data models

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Post.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Post);

User.hasOne(ProfilePic);
ProfilePic.belongsTo(User);

User.hasMany(Follow);
Follow.belongsTo(User, { foreignKey: 'userId' });
Follow.belongsTo(User, { foreignKey: 'followerId' });

// Synchronize the database

sequelize.sync()
  .then(() => console.log("Database created"))
  .catch((err) => console.error(err));


module.exports = {
  sequelize,
  User,
  Post,
  Comment,
  ProfilePic,
  Follow,
  Feedback,
  Admin
};

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
