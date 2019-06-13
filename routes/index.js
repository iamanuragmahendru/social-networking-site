const route = require('express').Router()

/* GET home page. */
route.get('/', function(req, res, next) {
  res.render('index', { title: 'Social Network', layout: 'layoutLoginPage.hbs' });
});

module.exports = route;