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
                // Checks for tuples where followerId = id and userId != id
                followerId: id,
                [Op.and]: {
                    userId : {
                        [Op.ne]: id
                    }
                }
            }
        }).then((followList) => {
            let following = []
            for(follow of followList)
                following.push(follow.userId)
            User.findAll({
                where: {
                    uid: following
                }
            }).then((followDetails) => {
                res.send(followDetails)
            }) 
        })
    }
})

route.get('/:id', (req, res) => {
    if(req.user) {
        let uid = req.user.uid
        let id = req.params.id
        Follow.findOne({
            where: {
                followerId: uid,
                userId: id
            }
        }).then((follow) => {
            res.send(follow)
        })
    }
})

route.get('/follow/:id', (req, res) => {
    if(req.user) {
        let id = req.user.uid
        let followerId = id
        let userId = req.params.id
        Follow.create({
            followerId: followerId,
            userId: userId
        }).then((follow) => {
            res.send('Done')
        }).catch((err) => {
            res.send('Error')
        })
    }
    else {
        res.redirect('/notauthorised')
    }
})

route.get('/unfollow/:id', (req, res) => {
    if(req.user) {
        let id = req.user.uid
        let followerId = id
        let userId = req.params.id
        Follow.destroy({
            where: {
                followerId: followerId,
                userId: userId
            }
        }).then(() => {
            res.send('Done')
        }).catch((err) => {
            res.send('Error')
        })
    }
    else {
        res.redirect('/notauthorised')
    }
})

module.exports = route