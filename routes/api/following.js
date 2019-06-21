const route = require('express').Router()
const Follow = require('../../db').Follow

route.get('/', (req, res) => {
    if(req.user) {
        let id = req.user.uid
        Follow.findAll({
            where: {
                followerId: id
            }
        }).then((followList) => {
            res.send(followList)
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