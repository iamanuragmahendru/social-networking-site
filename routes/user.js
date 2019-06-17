const route = require('express').Router()

route.get('/:id', (req, res) => {
    // let id = req.params.id
    if (req.user.id) {
        return res.send("Visible to only logged in users")
    } else {
        res.redirect('/login')
    }
})

module.exports = route