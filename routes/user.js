const route = require('express').Router()
const ProfilePic = require('../db').ProfilePic

route.get('/', (req, res) => {
    let user = req.session.user
    if (req.user && (user.uid == req.params.id)) {
        res.redirect('/users/' + user.uid)
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

route.get('/:id', (req, res) => {
    let user = req.session.user
    if (req.user && (user.uid == req.params.id)) {
        let id = user.uid
        let firstName = user.firstName
        let lastName = user.lastName
        let dp = ''
        async function handleGetReq(id) {
            let profilePic = await ProfilePic.findOne({
                where: {
                    userUid: id
                }
            })
            if (!profilePic) {
                dp = ''
            } else {
                dp = profilePic.profilePicName
            }
            await res.render('user', {
                title: firstName + ' ' + lastName + ' - Social Network',
                id: id,
                dp: '/public/users/profilepics/' + dp,
                userFirstName: firstName
            })
        }
        handleGetReq(id)
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

route.get('/:id/follow', (req, res) => {
    if (req.user) {
        res.render('user', {
            title: firstName + ' ' + lastName + ' - Social Network',
            dp: '/private/users/profilepics/' + dp,
            userFirstName: firstName
        })
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

route.get('/:id/messages', (req, res) => {
    if (req.user) {
        res.render('user', {
            title: firstName + ' ' + lastName + ' - Social Network',
            dp: '/private/users/profilepics/' + dp,
            userFirstName: firstName
        })
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

route.get('/:id/settings', (req, res) => {
    let user = req.session.user
    if (req.user && (user.uid == req.params.id)) {
        let id = user.uid
        let firstName = user.firstName
        let lastName = user.lastName
        let dp = ''
        async function handleGetReq(id) {
            let profilePic = await ProfilePic.findOne({
                where: {
                    userUid: id
                }
            })
            if (!profilePic) {
                dp = ''
            } else {
                dp = profilePic.profilePicName
            }
            await res.render('settings', {
                title: firstName + '- Settings - Social Network',
                id: id,
                dp: '/public/users/profilepics/' + dp,
                userFirstName: firstName
            })
        }
        handleGetReq(id)
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

route.get('/:id/selectprofileavatar', (req, res) => {
    let user = req.session.user
    if (req.user && (user.uid == req.params.id)) {
        let id = user.uid
        let firstName = user.firstName
        let lastName = user.lastName
        let dp = ''
        let profileAvatar = []
        for (i = 1; i <= 10; i++) {
            profileAvatar.push("profile_avatar_" + i + ".jpg")
        }
        async function handleGetReq(id) {
            let profilePic = await ProfilePic.findOne({
                where: {
                    userUid: id
                }
            })
            if (!profilePic) {
                dp = ''
            } else {
                dp = profilePic.profilePicName
            }
            await res.render('selectProfileAvatar', {
                title: firstName + '- Select Profile Avatar - Social Network',
                id: id,
                profileAvatar: profileAvatar,
                dp: '/public/users/profilepics/' + dp,
                userFirstName: firstName

            })
        }
        handleGetReq(id)
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

route.post('/:id/selectedprofileavatar', (req, res) => {
    let user = req.session.user
    if (req.user && (user.uid == req.params.id)) {
        ProfilePic.update({
            profilePicName: req.body.profileavatar
        }, {
            where: {
                userUid: user.id
            }
        })    
        }
     else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

route.get('/:id/notifications', (req, res) => {
    if (req.user) {
        res.render('user', {
            title: firstName + ' ' + lastName + ' - Social Network',
            dp: '/private/users/profilepics/' + dp,
            userFirstName: firstName
        })
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

route.get('/:id/searchuser', (req, res) => {
    if (req.user) {
        res.render('user', {
            title: firstName + ' ' + lastName + ' - Social Network',
            dp: '/private/users/profilepics/' + dp,
            userFirstName: firstName
        })
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

route.get('/:id/logout', (req, res) => {
    if (req.user) {
        res.render('user', {
            title: firstName + ' ' + lastName + ' - Social Network',
            dp: '/private/users/profilepics/' + dp,
            userFirstName: firstName
        })
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

module.exports = route