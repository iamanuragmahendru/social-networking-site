let currentChatRoom = $('#currentChatRoom')
let chatBox = $('#showChat')
let chatFeatures = $('#showFeatures')
let msgBox = $('#chatInput')
let sendBtn = $('#chatInputbtn')
let changeUsername = $('#changeUsername')
let changeUsernameBtn = $('#changeUsernameBtn')
let chatroomBtn = $('#chatroomBtn')
let chatRoomDiv = $('#chatRoomDiv')
let nsp = ''

function chatroomBtnClick(val) {

    currentChatRoom.empty()
    currentChatRoom.append(`${val}`)
    switch(val) {
        case 'Broadcast' : 
            nsp = '/'
            break;
        default : 
            nsp = ('/' + val.toLowerCase())
    }

    let user = ''

    changeUsernameBtn.click(() => {
        user = changeUsername.val()
        socket.emit('change_user', {
            user: user
        })
    })

    let socket = io(nsp)
    socket.on('connected', () => {
        console.log('socket connected ' + val)
    })

    sendBtn.click(() => {
        socket.emit('send_msg', {
            user: user,
            message: msgBox.val()
        })
    })
    
    socket.on('recv_msg', (data) => {
        chatBox.append($('<li>' + data.user + ': ' + data.message + '</li>'))
    })
}


$(function () {

    let chatRooms = ['Broadcast', 'Books', 'Games', 'TV', 'Movies']
    chatRoomDiv.empty()
    for (chatRoom of chatRooms) {
        console.log(chatRoom)
        chatRoomDiv.append(`
        <div class="row m-1">
            <button id="chatroomBtn" class="btn btn-outline-primary" value="${chatRoom}" onclick=chatroomBtnClick(value)> ${chatRoom} </button>
        <div>
        `)
    }


    
})