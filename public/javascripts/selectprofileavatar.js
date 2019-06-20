$(function() {

    let changeAvatarDiv = $('#selectProfileAvatarDiv')

    let profileAvatar = []
    for (i = 1; i <= 10; i++) {
        profileAvatar.push("profile_avatar_" + i + ".jpg")
    }

    (function() {
        changeAvatarDiv.empty()
        for (i = 1; i <= 10; i++) {
            changeAvatarDiv.append(`
            <div class="col-2 card p-1 m-1 form-group">
                <input type="radio" name="profileavatar" id="profileAvatar" value="profile_avatar_${i}.jpg">
                <img src="/public/users/profilepics/profile_avatar_${i}.jpg" alt="Profile Avatar" height="175" width="175">
            </div>
            `)
        }
    })()

    
})