const route = require('express').Router()
const ProfilePic = require('../../db').ProfilePic

route.get('/:id', (req, res) => {
    let id = req.params.id
    ProfilePic.findOne({
        where: {
            userUid: id
        }
    }).then((profilePic) => {
        res.send(profilePic)
    })
})

module.exports = route