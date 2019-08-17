const route = require('express').Router();
const User = require('../../db').User;

route.get('/', (req, res) => {
    if (req.user) {
        let id = req.user.uid;
        User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                uid: id
            }
        }).then((user) => {
            res.send(user)
        })
    }
});

route.get('/:id', (req, res) => {
        let id = req.params.id;
        User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                uid: id
            }
        }).then((user) => {
            res.send(user)
        })
});

route.post('/', (req, res) => {
    if (req.user) {
        let id = req.user.uid;
        User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.genderOptions,
            dob: req.body.DOB,
            city: req.body.userCity,
            state: req.body.userState,
            pincode: req.body.userPin
        }, {
            where: {
                uid: id
            }
        });
        res.send(`
        User Details Updated
        <a href="/users">Go to profile</a>`)
    } else {
        res.redirect('/notauthorised')
    }
});

route.post('/changepassword', (req, res) => {
    if (req.user) {
        let id = req.user.uid;
        let oldPassword = req.body.currentPassword;
        let newPassword = req.body.newPassword;
        User.findOne({
            where: {
                uid: id
            }
        }).then((user) => {
            if (!user) {
                res.redirect('/notauthorised')
            } else if (!user.validPassword(oldPassword)) {
                res.send(`
                Wrong password <br>
                <a href="/users/"` + id + `/changepassword">Try Again</a>
                `)
            } else {

                // Used user to implement beforeUpdate hook otherwise use beforeBulkUpdate
                
                user.update({
                    password: newPassword
                }, {
                    where: {
                        uid: id
                    }
                });
                res.send(`
                Password successfully changed <br>
                <a href="/">Please Login Again</a>
                `)
            }
        })
    } else {
        res.redirect('/notauthorised')
    }
});

module.exports = route;