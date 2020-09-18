var currentuserKey = ''
///
let startChat = (friendKey , friendName , friendPhoto) => {
    
    var friendList = {
        friendId : friendKey,
        userId: currentuserKey
    }

    var database = firebase.database().ref('friend_list')
    var flag = false
    database.on('value',(friends) => {
        friends.forEach( (data) => {
            var user  = data.val()
            if((user.friendId === friendList.friendId && user.userId === friendList.userId) || (user.friendId === friendList.userId && user.userId === friendList.friendId)){
                flag = true
            }
        })
    })
    firebase.database().ref('friend_list').push(friendList , (error) => {
        if(error){
            alert(error)
        }else{
            document.getElementById('chatpanel').removeAttribute('style')
            document.getElementById('divstart').setAttribute('style', 'display:none;')
            hideChatBox()
        
        }
    })
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

//populateFriendList
let populateFriendList = () => {
    document.getElementById('lstFriend').innerHTML = `
    <div class="text-center">
        <span class="spinner-border text-primary mt-5" style="width:5rem;height:5rem;"></span>
    </div>
    `
    var database = firebase.database().ref('users')
     var list = ''
    database.on('value', (users) => {
       if(users.hasChildren()){
           list = `
           <li class="list-group-item" style="background-color: #f8f8f8;">
           <input type="text" class="form-control form-rounded" placeholder="Search..."
               aria-label="Username" aria-describedby="basic-addon1">
       </li>
           `
       }
       users.forEach( (data) =>{
        var user = data.val()
        if(user.email !== firebase.auth().currentUser.email){
            list += `
            <li class="list-group-item list-group-item-action" data-dismiss="modal" onclick="startChat('${data.key}','${user.name}','${user.photoURL}')">
            <div class="row">
                <div class="col-md-2">
                    <img src="${user.photoURL}" class="rounded-circle friend-image" alt="user">
                </div>
                <div class="col-md-10" style="cursor: pointer;">
                    <div class="name">${user.name}</div>
                    <div class="message">Hey there i am using whatsapp...</div>
                </div>
            </div>
        </li>
            `
    
        }
       
       })
    document.getElementById('lstFriend').innerHTML = list

    })


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
    if (user) {
        // alert(firebase.auth().currentUser.email + '\n' + firebase.auth().currentUser.displayName)

        var userProfile = { email: '', name: '', photoURL: '', }
        userProfile.email = firebase.auth().currentUser.email
        userProfile.name = firebase.auth().currentUser.displayName
        userProfile.photoURL = firebase.auth().currentUser.photoURL
        var database = firebase.database().ref('users')
        var flag = false
        database.on('value', (users) => {
            users.forEach((data) => {
                var user = data.val()
                if (user.email === userProfile.email){
                   currentuserKey = data.key
                    flag = true

                }
            })
            if (flag === false) {
                firebase.database().ref('users').push(userProfile, callback)

            } else {
                document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL
                document.getElementById('imgProfile').title = firebase.auth().currentUser.displayName

                document.getElementById('lnkSignIn').style = 'display:none;'
                document.getElementById('lnkSignOut').style = ''
            }
        document.getElementById('lnkNewChat').classList.remove('disabled')

        })

    } else {
        document.getElementById('imgProfile').src = 'Images/user.png'
        document.getElementById('imgProfile').title = ''

        document.getElementById('lnkSignIn').style = ''
        document.getElementById('lnkSignOut').style = 'display:none;'

        document.getElementById('lnkNewChat').classList.add('disabled')
    }
}

let callback = (error) => {
    if (error) {
        alert(error)
    }
    else {
        document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL
        document.getElementById('imgProfile').title = firebase.auth().currentUser.displayName

        document.getElementById('lnkSignIn').style = 'display:none;'
        document.getElementById('lnkSignOut').style = ''
    }
}

//call firebae state
onFirebaseStateChanged()
