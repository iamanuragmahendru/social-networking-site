const route = require('express').Router();
const Admin = require('../db').Admin;
const Feedback = require('../db').Feedback;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

route.get('/', (req, res) => {
    if (req.user) {
        let id = req.user.uid;
        Admin.findOne({
            where: {
                adminId: id
            }
        }).then((admin) => {
            if (admin) {
                Feedback.findAll({
                    where : {
                        feedbackId: {[Op.gt]: 0}
                    }
                }).then((feedbacks) => {
                    res.render('admin', {
                        title: 'Admin',
                        feedback: feedbacks
                    })
                })

            } else {
                res.redirect('/notauthorised')
            }
        })
    } else {
        res.redirect('/notauthorised')
    }
});

module.exports = route;