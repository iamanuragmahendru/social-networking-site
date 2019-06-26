const route = require('express').Router()
const User = require('../db').User
const ProfilePic = require('../db').ProfilePic
const Sequelize = require('sequelize');
const Op = Sequelize.Op

route.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/users/' + req.user.uid)
    } else {
        res.redirect('/notauthorised')
    }
})

route.get('/:id', (req, res) => {
    if (req.user && (req.user.uid == req.params.id)) {
        let user = req.user
        let id = user.uid
        let firstName = user.firstName
        let lastName = user.lastName
        let dp = ''
        // Definitely not the best way to handleGetReq just wanted to use async and await
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
                userFirstName: firstName,
                includejs: 'userposts'
            })
        }
        handleGetReq(id)
    } else {
        res.redirect('/notauthorised')
    }
})

route.get('/:id/searchuser', (req, res) => {
    if (req.user && (req.user.uid == req.params.id)) {
        let user = req.user
        let id = user.uid
        let firstName = user.firstName
        let dp = ''
        let query = req.query.search
        async function handleGetReq(id) {
            let searchResults = []
            let profilePic = await ProfilePic.findOne({
                where: {
                    userUid: id
                }
            })
            let searchedUsers = await User.findAll({
                where: {
                    [Op.or]: [{firstName: query}, {lastName: query}]
                }
            })
            if(!searchedUsers) {
                searchResults = []
            } else {
                for(searchedUser of searchedUsers)
                    searchResults.push(searchedUser)
            }
            if (!profilePic) {
                dp = ''
            } else {
                dp = profilePic.profilePicName
            }
            await res.render('searchuser', {
                title: firstName + ' Search - Social Network',
                id: id,
                dp: '/public/users/profilepics/' + dp,
                userFirstName: firstName,
                includejs: 'searchuser',
                searchResults: searchResults,
                query: query
            })
        }
        handleGetReq(id)
    } else {
        res.redirect('/notauthorised')
    }
})

route.get('/:id/:link', (req, res) => {
    if (req.user && (req.user.uid == req.params.id)) {
        let user = req.user
        let id = user.uid
        let firstName = user.firstName
        let dp = ''
        let link = req.params.link
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
            await res.render(link, {
                title: firstName + ' ' + link + ' - Social Network',
                id: id,
                dp: '/public/users/profilepics/' + dp,
                userFirstName: firstName,
                includejs: link
            })
        }
        handleGetReq(id)
    } else {
        res.redirect('/notauthorised')
    }
})

route.post('/:id/selectedprofileavatar', (req, res) => {
    if(req.user && (req.user.uid == req.params.id)) {
        let id = req.user.uid
        ProfilePic.findOrCreate({
            where: {
                userUid: id,
            },
            defaults: {
                profilePicName: req.body.profileavatar
            }
        }).then(([profilePic, created]) => {
            if (!created) {
                ProfilePic.update({
                    profilePicName: req.body.profileavatar,
                }, {
                    where: {
                        userUid: id
                    }
                });
            }
            res.redirect('/users')
        }).catch((err) => {
            console.log(err)
        })
    } else {
        res.redirect('/notauthorised')
    }
})

module.exports = route
