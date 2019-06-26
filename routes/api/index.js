const route = require('express').Router()
const followersRoute = require('./followers')
const followingRoute = require('./following')
const postsRoute = require('./posts')
const userDetailsRoute = require('./userdetails')
const profilePicRoute = require('./profilepic')

route.use('/followers', followersRoute)
route.use('/following', followingRoute)
route.use('/posts', postsRoute)
route.use('/userdetails', userDetailsRoute)
route.use('/profilepic', profilePicRoute)

module.exports = route