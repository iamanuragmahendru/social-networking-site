const route = require('express').Router();
const Post = require('../../db').Post;

route.get('/', (req, res) => {
    if (req.user) {
        let id = req.user.uid;
        Post.findAll({
            where: {
                userUid: id
            }
        }).then((posts) => {
            res.send(posts)
        })
    }
});

route.get('/:id', (req, res) => {
    let id = req.params.id;
    Post.findAll({
        where: {
            userUid: id
        }
    }).then((posts) => {
        res.send(posts)
    })
});

route.post('/', (req, res) => {
    if(req.user) {
        let id = req.user.uid;
        post = req.body.newpost;
        Post.create({
            postText: post,
            userUid: id
        }).then((post) => {
            res.redirect('/users')
        }).catch((err) => {
            res.send('Could not add post')
        })
    }
    else {
        res.redirect('/notauthorised')
    }
});

module.exports = route;