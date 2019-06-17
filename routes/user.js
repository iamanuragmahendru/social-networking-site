const route = require('express').Router()

route.get('/:id', (req, res) => {
    if (req.user && (req.user.uid == req.params.id)) {
        let name = req.user.firstName + ' ' + req.user.lastName
        res.render('user', {
            title: name + ' - Social Network'
        })
    } else {
        res.send(`
        Not authorized
        <a href="/">Go to main page</a>
        `)
    }
})

module.exports = route