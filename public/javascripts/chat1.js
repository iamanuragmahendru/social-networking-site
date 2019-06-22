let currentChatRoom = $('#currentChatRoom')
let chatBox = $('#showChat')
let chatFeatures = $('#showFeatures')
let msgBox = $('#chatInput')
let sendBtn = $('#chatInputbtn')
let changeUsername = $('#changeUsername')
let changeUsernameBtn = $('#changeUsernameBtn')

function broadcast() {

    currentChatRoom.empty()
    currentChatRoom.append(`BROADCAST`)

    let socket = io()

    socket.on('connected', () => {
        console.log("Broadcast Socket  connected  at : " + socket.id)
    })

}

function books() {

    currentChatRoom.empty()
    currentChatRoom.append(`BOOKS`)

    let bookSocket = io('/books')

    bookSocket.on('connected', () => {
        console.log('BookNamespace socket connected at : ' + bookSocket.id)
    })

}

function games() {

    currentChatRoom.empty()
    currentChatRoom.append(`GAMES`)

    let gameSocket = io('/games')

    gameSocket.on('connected', () => {
        console.log('GamesNamespace socket connected at : ' + gameSocket.id)
    })

}

function tv() {

    currentChatRoom.empty()
    currentChatRoom.append(`TV`)

    let tvSocket = io('/tv')

    tvSocket.on('connected', () => {
        console.log('TVNamespace socaket connected at : ' + tvSocket.id)
    })

}

function movies() {

    currentChatRoom.empty()
    currentChatRoom.append(`MOVIES`)

    let movieSocket = io('/movies')

    movieSocket.on('connected', () => {
        console.log('MoiveNamespace socket connected at : ' + movieSocket.id)
    })
}

$(function () {

    let chatRooms = ['Broadcast', 'Books', 'Games', 'TV', 'Movies']
    for (chatRoom of chatRooms) {
        $('#chatRoomDiv').append(`
        <div class="row m-1">
            <button id="${chatRoom}Button" class="btn btn-outline-primary" onclick=${chatRoom.toLowerCase()}()> ${chatRoom} </button>
        <div>
        `)
    }

    
})