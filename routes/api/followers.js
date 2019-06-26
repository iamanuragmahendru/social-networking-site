const route = require('express').Router()
const Follow = require('../../db').Follow
const User = require('../../db').User
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

route.get('/', (req, res) => {
    if(req.user) {
        let id = req.user.uid
        Follow.findAll({
            where: {
                // Checks for tuples where userId = id and followerId != id
                userId: id,
                [Op.and]: {
                    followerId : {
                        [Op.ne]: id
                    }
                }
            }
        }).then((followers) => {
            let follow = []
            for(follower of followers)
                follow.push(follower.followerId)
            // To find details of user
            User.findAll({
                where: {
                    uid: follow
                }
            }).then((followerDetails) => {
                res.send(followerDetails)
            }) 
        })
    }
})

module.exports = route