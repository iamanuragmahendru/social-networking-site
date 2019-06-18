const ProfilePic = require('../db').ProfilePic

function findDP(id) {
    ProfilePic.findOne({
        where : {
            userUid: id
        }
    }).then((profilePic) => {
        return profilePic
    })
}

let dp = findDP(1)
console.log(dp)