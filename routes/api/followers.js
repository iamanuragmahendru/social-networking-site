const route = require('express').Router()
const Follow = require('../../db').Follow
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

route.get('/', (req, res) => {
    if(req.user) {
        let id = req.user.uid
        Follow.findAll({
            where: {
                userId: id,
                [Op.and]: {
                    followerId : {
                        [Op.ne]: id
                    }
                }
            }
        }).then((followers) => {
            res.send(followers)
        })
    }
})

module.exports = route