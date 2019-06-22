let loginDiv = $('#loginDiv')
let chatsDiv = $('#chatsDiv')
let chatBox = $('#showChat')
let chatFeatures = $('#showFeatures')
let msgBox = $('#chatInput')
let sendBtn = $('#chatInputbtn')
let usernameBox = $('#enterUsernameBox')
let loginBtn = $('#loginBtn')

let socket = io('/');
socket.on('connected', () => {
    console.log("Connected " + socket.id)
})

$(function () {

    let user = ''

    loginBtn.click(() => {
        user = usernameBox.val()
        if(user == '') {
            user = 'Anonymous'
        }
        chatsDiv.show()
        loginDiv.hide()
        socket.emit('login', {
            user: user
        })
    })

    sendBtn.click(() => {
        socket.emit('send_msg', {
            user: user,
            message: msgBox.val()
        })
    })

    msgBox.bind("keypress", () => {
		socket.emit('typing', {
            user: user
        })
	})

	socket.on('typing', (data) => {
        chatFeatures.html(data.user + ' is typing...')
    })
    
    socket.on('recv_msg', (data) => {
        chatFeatures.empty()
        chatBox.append($('<li>' + data.user + ': ' + data.message + '</li>'))
    })
})