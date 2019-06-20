$(function () {

    let userPosts = $('#userPosts')

    function fetchPosts(done) {
        $.get('/api/posts', (posts) => {
            done(posts)
        })
    }

    fetchPosts(function (posts) {
        userPosts.empty()
        
        for (post of posts) {
            userPosts.append(`<b>${post.postText}</b>`)
        }
    })

})