let profileDetails = $('#profileDetails');
let dp = $('#dp');
let userPane = $('#userPane');
let userPosts = $('#userPosts');
let followBtn = $('#followBtn');
let id = window.location.href.split('/').pop();

function followFun(value) {
    if(value == "Follow") {
        console.log("follow");
        $.get('/api/following/follow/' + id, (response) => {
            if (response == 'Done') {
                followBtn.attr("value", "Unfollow")
            } else {
                alert("Please Try again")
            }
        })
    } else {
        $.get('/api/following/unfollow/' + id, (response) => {
            if (response == 'Done') {
                followBtn.attr("value", "Follow")
            } else {
                alert("Please Try again")
            }
        })
    }
}

function fetchProfileAvatar(done) {
    $.get('/api/profilepic/' + id, (profilePic) => {
        done(profilePic)
    })
}

function fetchUserDetails(done) {
    $.get('/api/userdetails/' + id, (user) => {
        done(user)
    })
}

function fetchPosts(done) {
    $.get('/api/posts/' + id, (posts) => {
        done(posts)
    })
}

function fetchFollow(done) {
    $.get('/api/following/' + id, (follow) => {
        done(follow)
    })
}

$(function () {  
    fetchProfileAvatar((profileAvatar) => {
        let profilePic = profileAvatar.profilePicName;
        dp.attr("src", "/public/users/profilepics/" + profilePic)
    });

    fetchUserDetails((user) => {
        userPane.append(`
        <br>
        ${user.firstName + ' ' + user.lastName}
        `)
    });

    fetchPosts((posts) => {
        userPosts.empty();
        
        for (post of posts) {
            userPosts.append(`
            <div class="col p-1 m-1 card">
                ${post.postText} <hr>
            </div>
        `)
        }
    });

    fetchFollow((follow) => {
        if($.isEmptyObject(follow)) {
            followBtn.attr("value", "Follow")
        } else {
            followBtn.attr("value", "Unfollow")
        }
    })

});