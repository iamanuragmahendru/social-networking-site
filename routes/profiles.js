const route = require('express').Router()
const ProfilePic = require('../db').ProfilePic

route.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/users')
    } else {
        res.send(`
        404 Error
        <a href="/">Go to Main Page</a>
        `)
    }
})

route.get('/:id', (req, res) => {
    if (req.user) {
        let user = req.user
        let id = user.uid
        let firstName = user.firstName
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
            await res.render('userprofile', {
                title: firstName + ' - Social Network',
                id: id,
                layout: 'layoutuserprofile.hbs', 
                dp: '/public/users/profilepics/' + dp,
                userFirstName: firstName,
            })
        }
        handleGetReq(id)
    } else {
        res.render('profile', {
            title: 'Social Network',
            layout: 'layoutprofile.hbs'
        })
    }
})

module.exports = route