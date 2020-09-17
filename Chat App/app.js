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
    document.getElementById('side-2').classList.remove('d-none')
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

    document.getElementById('messages').scrollTo(0, document.getElementById('messages').clientHeight)
}

//signIn function
let signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log(result)
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(error)
        });
}

//signout function
let signOut = () => {
    firebase.auth().signOut()
        .then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
}

//firebase state changed
let onFirebaseStateChanged = () => {
    firebase.auth().onAuthStateChanged(onStateChanged)
}

let onStateChanged = (user) => {
    if(user){
        // alert(firebase.auth().currentUser.email + '\n' + firebase.auth().currentUser.displayName)
        document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL
        document.getElementById('imgProfile').title = firebase.auth().currentUser.displayName
    }
}

//call firebae state
onFirebaseStateChanged()