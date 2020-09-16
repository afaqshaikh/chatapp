let startChat = (id) => {
    document.getElementById('chatpanel').removeAttribute('style')
    document.getElementById('divstart').setAttribute('style', 'display:none;')
    hideChatBox()
}

//showChatBox function
let showChatBox = () => {
    document.getElementById('side-1').classList.remove('d-none', 'd-md-block')
    document.getElementById('sude-2').classList.add('d-none')
}

//hideChatBox function
let hideChatBox = () => {
    document.getElementById('side-1').classList.add('d-none', 'd-md-block')
    document.getElementById('sude-2').classList.remove('d-none')
}

//Send Message
let onPressEnter = () => {
    document.addEventListener('keydown', (key) => {
        if (key.which == 13) {
            sendMessage()
        }
    })
}

//message sne function
let sendMessage = () => {
    var message = `
<div class="row justify-content-end">
    <div class="col-6 col-sm-7 col-md-7 ">
        <p class="sent float-right">${document.getElementById('textMessage').value} 
            <span class="time float-right">3:45 PM</span>
        </p>
    </div>
    <div class="col-2 col-sm-1 col-md-1">
        <img src="Images/user.png" alt="user" class="chat-image">
    </div>
</div>`
document.getElementById('messages').innerHTML += message
document.getElementById('textMessage').value = ''
document.getElementById('textMessage').focus()

document.getElementById('messages').scrollTo(0,document.getElementById('messages').clientHeight)
}