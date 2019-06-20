const route = require('express').Router()
const followersRoute = require('./followers')
const followingRoute = require('./following')
const messagesRoute = require('./messages')
const postsRoute = require('./posts')
const userDetailsRoute = require('./userdetails')

route.use('/followers', followersRoute)
route.use('/following', followingRoute)
route.use('/messages', messagesRoute)
route.use('/posts', postsRoute)
route.use('/userdetails', userDetailsRoute)

module.exports = route