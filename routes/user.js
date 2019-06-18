const route = require('express').Router()
const ProfilePic = require('../db').ProfilePic

route.get('/:id', (req, res) => {
    if (req.user && (req.user.uid == req.params.id)) {
        let id = req.user.uid
        let firstName = req.user.firstName
        let lastName = req.user.lastName
        let dp = findDP(id)
        console.log(dp)
        res.render('user', {
            title: firstName + ' ' + lastName + ' - Social Network',
            id: id,
            dp: '/public/users/profilepics/' + dp,
            userFirstName: firstName
        })
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

route.get('/settings', (req, res) => {
    if(req.user) {
        res.render('user', {
            title: firstName + ' ' + lastName + ' - Social Network',
            dp: '/private/users/profilepics/' + dp,
            userFirstName: firstName
        })
    }
    else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

function findDP(id) {
    let name = ProfilePic.findOne({
        where : {
            userUid: id
        }
    }).then((profilePic) => {
        if(!profilePic) {
            return done(null, false)
        }
        else {
            return done(null, profilePic)
        }
    })
    return name
}

module.exports = route