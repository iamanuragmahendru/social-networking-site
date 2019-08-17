$(function () {

    let userPosts = $('#userPosts');

    function fetchPosts(done) {
        $.get('/api/posts/', (posts) => {
            done(posts)
        })
    }

    fetchPosts(function (posts) {
        userPosts.empty();
        
        for (post of posts) {
            userPosts.append(`
            <div class="col p-1 m-1 card">
                ${post.postText} <hr>
            </div>
        `)
        }
    })

});