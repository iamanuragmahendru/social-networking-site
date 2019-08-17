let loginDiv = $('#loginDiv');
let chatsDiv = $('#chatsDiv');
let chatBox = $('#showChat');
let chatFeatures = $('#showFeatures');
let msgBox = $('#chatInput');
let sendBtn = $('#chatInputbtn');
let usernameBox = $('#enterUsernameBox');
let loginBtn = $('#loginBtn');

let socket = io('/');
socket.on('connected', () => {
    console.log("Connected " + socket.id)
});

$(function () {

    let user = '';

    loginBtn.click(() => {
        user = usernameBox.val();
        if(user == '') {
            // To set username as Anonymous if left empty
            user = 'Anonymous'
        }
        chatsDiv.show();
        loginDiv.hide();
        socket.emit('login', {
            user: user
        })
    });

    sendBtn.click(() => {
        socket.emit('send_msg', {
            user: user,
            message: msgBox.val()
        })
    });

    // Binding the msgBox to implement User is typing functionality

    msgBox.bind("keypress", () => {
		socket.emit('typing', {
            user: user
        })
    });
    
    // Output User is typing in the chatBox 

	socket.on('typing', (data) => {
        chatFeatures.html(data.user + ' is typing...')
    });
    
    socket.on('recv_msg', (data) => {
        chatFeatures.empty();
        chatBox.append($('<li>' + data.user + ': ' + data.message + '</li>'))
    })
});