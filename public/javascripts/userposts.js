$(function () {

    let userPosts = $('#userPosts')

    function fetchPosts(done) {
        $.get('posts', (posts) => {
            done(posts)
        })
    }

    fetchPosts(function (posts) {
        userPosts.empty()
        
        for (post of posts) {
            userPosts.append(appendPost(post))
        }
    })

})