$(function () {

    let followingDiv = $('#following');
    let followersDiv = $('#followers');

    function fetchFollowersList(done) {
        $.get('/api/followers', (followers) => {
            done(followers)
        })
    }

    fetchFollowersList(function (followers) {
        followersDiv.empty();

        if($.isEmptyObject(followers)) {
            followersDiv.append(`<b>You have no Followers</b>`)
        } else {
            for (follower of followers) {
                followersDiv.append(`
                <div class="card m-1">
                ${follower.firstName} ${follower.lastName} <br>
                <a href="/profiles/${follower.uid}">Goto Profile</a>
                <div>`)
            }
        }
       
    });

    function fetchFollowingList(done) {
        $.get('/api/following', (followList) => {
            done(followList)
        })
    }

    fetchFollowingList(function (followList) {
        followingDiv.empty();

        if($.isEmptyObject(followList)) {
            followingDiv.append(`<b>You have no Following</b>`)
        } else {
            for (following of followList) {
                followingDiv.append(`
                <div class="card m-1">
                ${following.firstName} ${following.lastName} <br>
                <a href="/profiles/${following.uid}">Goto Profile</a>
                <div>`)
            }
        }
        
    })

});