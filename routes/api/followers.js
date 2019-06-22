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