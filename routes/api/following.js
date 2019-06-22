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
        let uid = req.user.id
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

route.post('/follow', (req, res) => {
    if(req.user) {
        let id = req.user.uid
        let followerId = id
        let userId = req.body.userId
        Follow.create({
            followerId: followerId,
            userId: userId
        }).then((follow) => {
            res.send('Done')
        }).catch((err) => {
            console.log(err)
            res.send('Error')
        })
    }
    else {
        res.redirect('/notauthorised')
    }
})

route.post('/unfollow', (req, res) => {
    if(req.user) {
        let id = req.user.uid
        let followerId = id
        let userId = req.body.userId
        Follow.destroy({
            where: {
                followerId: followerId,
                userId: userId
            }
        }).then(() => {
            res.send('Done')
        }).catch((err) => {
            console.log(err)
            res.send('Error')
        })
    }
    else {
        res.redirect('/notauthorised')
    }
})

module.exports = route