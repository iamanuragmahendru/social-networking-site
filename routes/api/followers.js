const route = require('express').Router()
const Follow = require('../../db').Follow

route.get('/', (req, res) => {
    if(req.user) {
        let id = req.user.uid
        Follow.findAll({
            where: {
                userId: id
            }
        }).then((followers) => {
            res.send(followers)
        })
    }
})

module.exports = route