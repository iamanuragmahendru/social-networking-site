$(function () {

    let followingDiv = $('#following')
    let followersDiv = $('#followers')

    function fetchFollowersList(done) {
        $.get('/api/followers', (followers) => {
            done(followers)
        })
    }

    fetchFollowersList(function (followers) {
        followersDiv.empty()
        console.log(followers)

        if($.isEmptyObject(followers)) {
            followersDiv.append(`<b>You have no Followers</b>`)
        } else {
            for (follower of followers) {
                followersDiv.append(`<b>${follower.followerId}</b> <br>`)
            }
        }
       
    })

    function fetchFollowingList(done) {
        $.get('/api/following', (followList) => {
            done(followList)
        })
    }

    fetchFollowingList(function (followList) {
        followingDiv.empty()
        console.log(followList)

        if($.isEmptyObject(followList)) {
            followingDiv.append(`<b>You have no Following</b>`)
        } else {
            for (following of followList) {
                followingDiv.append(`<b>${following.userId}</b> <br>`)
            }
        }
        
    })

})