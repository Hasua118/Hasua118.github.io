const controller = {

    signUp: async function (signUpInfo) {
        let fullName = signUpInfo.fullName
        let email = signUpInfo.email
        let password = signUpInfo.password
        model.checkSignUp = 1

        utils.setText('#sign-up-success', '')
        utils.setText('#confirmPassWord-error', '')
        utils.setLoadingContent('#btn-sign-up', `<div class="lds-facebook"><div></div><div></div><div></div></div>`)


        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            await firebase.auth().currentUser.updateProfile({
                displayName: fullName
            })
            firebase.auth().currentUser.sendEmailVerification()
            utils.setText('#sign-up-success', 'An email verification has been sent to your email')
        } catch (error) {
            let message = error.message
            utils.sweetAlert('error', message)
        }
        utils.setLoadingContent('#btn-sign-up', `Đăng Kí`)
    },
    signIn: async function (signInInfo) {
        let email = signInInfo.email
        let password = signInInfo.password

        utils.setText('#passWord-error', '')
        utils.setLoadingContent('#btn-sign-in', `<div class="lds-facebook"><div></div><div></div><div></div></div>`)

        try {
            let result = await firebase.auth().signInWithEmailAndPassword(email, password)
            let user = result.user
            if (user.emailVerified) {
                // window.open("./home.html","_self")
                view.showScreen('home')
            } else {
                throw new Error('Must verify email')
            }
        } catch (error) {
            let message = error.message
            utils.setText('#passWord-error', message)
            utils.sweetAlert('error', message)
        }
        utils.setLoadingContent('#btn-sign-in', `Đăng Nhập`)
    },
    googleSignUp: function () {
        let provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log('success')
        }).catch(function (error) {
            console.log(error.message)
        });

    },
    upLoadImage: async function (file) {
        let upLoadedFile = await storage.ref('/Images/' + file.name).put(file)
        let path = upLoadedFile.metadata.fullPath;
        let url = await storage.ref(path).getDownloadURL();
        // console.log(url);
        return url;
    },
    addData: async function (title, address, type, content, images) {
        let currentUser = firebase.auth().currentUser.displayName
        let currentEmail = firebase.auth().currentUser.email
        let signNote = "check"
        let like = []
        let now = new Date().toLocaleString()
        let dataUserPut = {
            title: title,
            user: currentUser,
            address: address,
            type: type,
            content: content,
            email: currentEmail,
            images: images,
            signNote: signNote,
            time: now,
            like: like
        }
        await firebase.firestore()
            .collection('dataUserUp')
            .add(dataUserPut)
        document.querySelector('#form-input-user-wrapper').reset()
        utils.setLoadingContent('#zxcvb', `Đăng`)
        utils.sweetAlert('success', 'Hãy chờ admin duyệt bài nhé!')
    },
    loadDataFromDataWhereToGo: async function () {
        let result = await firebase.firestore()
            .collection('dataWhereToGo')
            .get()
        let data = utils.getDataFromDocs(result.docs)
        model.saveDataWhereToGo(data)
    },
    loadDataFromDataUserPush: async function () {
        let result = await firebase.firestore()
            .collection('dataUserUp')
            .get()
        let data = utils.getDataFromDocs(result.docs)
        model.saveDataUserPush(data)
    },
    loadDataFromDataConfirmed: async function () {
        let signNote = 'check'
        let result = await firebase.firestore()
            .collection('dataConfirmed')
            .where('signNote', '==', signNote)
            .get()
        let data = utils.getDataFromDocs(result.docs)
        model.saveDataConfirmed(data)
    },
    addDataToConfirmed: async function (title, content, time, user, images, address, type, signNote, email) {
        let like = []
        let dataConfirmed = {
            title: title,
            address: address,
            user: user,
            type: type,
            content: content,
            time: time,
            images: images,
            signNote: signNote,
            email: email,
            like: like
        };
        console.log("datconfirm", dataConfirmed)
        await firebase.firestore()
            .collection('dataConfirmed')
            .add(dataConfirmed)
    },
    searchPlace: async function (pattern) {

        var places = [];
        let result = model.dataWhereToGo;
        result.forEach(function (doc) {
            places.push(doc);
        });
        let foundPlaces = places.filter(function (place) {
            let general = `
            {{Title}}
            ${place.title}
            {{Address}}
            ${place.address}
            `;
            let regex = new RegExp(pattern, "gmi");
            let matches = general.match(regex);
            if (matches) {
                if (matches.length >= pattern.trim().split('|').length) {
                    return true;
                }
            }
            return false;
        });
        model.dataSearch = foundPlaces
        utils.topFunction()
        await view.showListData(foundPlaces)
        let lengthCard = controller.getCartFromLocal().length
        document.querySelector('#countCard').innerText = lengthCard
    },
    getDataWhenClick: function (list, data) {
        for (let i = 0; i < list.length; i++) {
            list.item(i).onclick = function () {
                controller.addLocationToCartThenSaveToLocal(data[i])
                let lengthCard = controller.getCartFromLocal().length
                document.querySelector('#countCard').innerText = lengthCard
                // let dataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));           
            }
        }
    },
    addLocationToCartThenSaveToLocal(location) {
        let cart = controller.getCartFromLocal()
        if (controller.locationExistsInCart(cart, location)) {
            utils.sweetAlert('warning', `Bạn đã thêm địa điểm này`)
        } else {
            cart.push(location)
            let cartString = JSON.stringify(cart)
            localStorage.setItem('cart', cartString)
            utils.sweetAlert('success', `Đã thêm thành công ${cart.length} địa điểm`)
        }
        return cart
    },
    locationExistsInCart(cart, location) {
        return cart.find(l => l.id == location.id)
    },
    getCartFromLocal() {
        try {
            let cartString = localStorage.getItem('cart')
            let cart = JSON.parse(cartString || '')
            return cart || []
        } catch (err) {
            return []
        }
    },
    resetCart() {
        let cart = []
        let cartString = JSON.stringify(cart)
        localStorage.setItem('cart', cartString)
        let lengthCard = controller.getCartFromLocal().length
        document.querySelector('#countCard').innerText = lengthCard
        return cart
    },
    addLike: async function (user, id, filed) {
        if (model)
            await firebase.firestore()
            .collection(filed)
            .doc(id)
            .update({
                like: firebase.firestore.FieldValue.arrayUnion(user)
            })
    },
    setUpDataChange: async function (filed) {
        let skipRun = true
        firebase.firestore()
            .collection(filed)
            .onSnapshot(function (snapshot) {
                if (skipRun) {
                    skipRun = false
                    return
                }

                let docChanges = snapshot.docChanges()
                let alo123 = []
                for (let docChange of docChanges) {
                    let type = docChange.type
                    let placeDoc = docChange.doc
                    let place = utils.getDataFromDoc(placeDoc)
                    if (type == 'modified') {
                        model.updateDataChange(place)
                        alo123.push(place)
                        document.querySelector(`.left-incard-${place.id}`).innerHTML = ''
                        view.showLike(alo123)
                    }
                    if (type == 'added') {
                        model.updateDataUserPushChange(place)
                        view.showDataConfirmed()
                    }
                    if (type == 'removed') {
                        model.removeDataUnConfirm(place)
                    }
                }
            })
    },
    getDataToConfirmWhenClick: async function (list, data) {
        for (let i = 0; i < list.length; i++) {
            list.item(i).onclick = async function () {
                let title = data[i].title
                let content = data[i].content
                let time = data[i].time
                let user = data[i].user
                let images = data[i].images
                let address = data[i].address
                let type = data[i].type
                let signNote = data[i].signNote
                let id = data[i].id
                let email = data[i].email
                await firebase.firestore()
                    .collection('dataUserUp')
                    .doc(id)
                    .delete()
                controller.addDataToConfirmed(title, content, time, user, images, address, type, signNote, email)
            }
        }
    },
    deleteDataUnConfirm: async function (list, data) {
        for (let i = 0; i < list.length; i++) {
            list.item(i).onclick = async function () {
                let id = data[i].id
                await firebase.firestore()
                    .collection('dataUserUp')
                    .doc(id)
                    .delete()
            }
        }
    },
    setupDataUnConfirmChange: async function () {
        let isFirstRun = true
        firebase.firestore()
            .collection('dataUserUp')
            .onSnapshot(async function (snapshot) {
                if (isFirstRun) {
                    isFirstRun = false
                    return
                }
                let docChanges = snapshot.docChanges()
                for (let docChange of docChanges) {
                    let type = docChange.type
                    console.log("type", type)
                    let dataUnConfirmDoc = docChange.doc
                    let dataUnConfirm = utils.getDataFromDoc(dataUnConfirmDoc)
                    if (type == 'removed') {
                        console.log('just deleted');
                        // xóa trong model
                        model.removeDataUnConfirm(dataUnConfirm)
                        view.showListDataAdmin(model.dataUserPush)

                    }
                }
            })

    },
    setupDataConfirmChange: async function () {
        let isFirstRun = true
        firebase.firestore()
            .collection('dataConfirmed')
            .onSnapshot(async function (snapshot) {
                if (isFirstRun) {
                    isFirstRun = false
                    return
                }
                let docChanges = snapshot.docChanges()
                for (let docChange of docChanges) {
                    let type = docChange.type
                    console.log("type", type)
                    let dataUnConfirmDoc = docChange.doc
                    let dataUnConfirm = utils.getDataFromDoc(dataUnConfirmDoc)
                    if (type == 'added') {
                        model.removeDataUnConfirm(dataUnConfirm)
                        view.showListDataAdmin(model.dataUserPush)

                    }
                }
            })

    },
    loadConversations: async function () {
        let currentEmail = firebase.auth().currentUser.email
        let result = await firebase.firestore()
            .collection('conversations')
            .where('users', 'array-contains', currentEmail)
            .get()
        let conversations = utils.getDataFromDocs(result.docs)
        model.saveListConversations(conversations)

        if (conversations.length) {
            let currentConversation = conversations[0]
            model.saveCurrentConversations(currentConversation)
        }

    },
    setUpConversationchange: async function () {
        let skipRun = true
        let currentEmail = firebase.auth().currentUser.email
        firebase.firestore()
            .collection('conversations')
            .where('users', 'array-contains', currentEmail)
            .onSnapshot(function (snapshot) {
                if (skipRun) {
                    skipRun = false
                    return
                }
                let docChanges = snapshot.docChanges()
                for (let docChange of docChanges) {
                    let type = docChange.type
                    let conversationDoc = docChange.doc
                    let conversation = utils.getDataFromDoc(conversationDoc)
                    if (type == 'modified') {
                        model.updateConversationChange(conversation)
                        if (model.currentConversations && model.currentConversations.id == conversation.id) {
                            utils.chatOpen()
                            view.showCurrentConversations()
                            utils.bottomFunction()
                        }
                    }
                    if (type == 'added') {
                        model.updateConversationChange(conversation)
                        model.saveCurrentConversations(model.listConversations[0])
                        utils.chatOpen()
                        view.showCurrentConversations()
                        let formAddMessage = document.querySelector('.form-add-message-chat')
                        formAddMessage.onsubmit = function (event) {
                            event.preventDefault()

                            let messageContent = formAddMessage.message.value.trim()
                            if (messageContent) {
                                controller.updateNewMessage(messageContent)
                            }
                        }
                    }
                }
            })
    },
    updateNewMessage: async function (messageContent) {
        // console.log(messageContent)

        if (model.currentConversations) {
            let conversationId = model.currentConversations.id
            let currentEmail = firebase.auth().currentUser.email
            let message = {
                content: messageContent,
                owner: currentEmail,
                sendAt: new Date().toISOString()
            }
            utils.setLoadingContent('#aaa', `<div class="lds-facebook"><div></div><div></div><div></div></div>`)
            //  let btnSubmitFormAddMessage = document.querySelector('#aaa')
            let inputFormAddMessage = document.querySelector('.form-add-message-chat input[name="message"]')
            //query theo đặc điểm-> nút input nằm trong div .form-add.. với name = messs

            await firebase.firestore()
                .collection('conversations')
                .doc(conversationId)
                .update({
                    messages: firebase.firestore.FieldValue.arrayUnion(message)
                })
            //  console.log('done')
            utils.setLoadingContent('#aaa', `<i class="fas fa-paper-plane" style="color: rgb(4, 88, 167);"></i>`)
            inputFormAddMessage.value = ''
        }
    },
    addConversation: async function (title, friendEmail) {
        let currentEmail = firebase.auth().currentUser.email
        let now = new Date().toISOString()
        let conversation = {
            title: title,
            users: [currentEmail, friendEmail],
            message: [],
            createdAt: now
        }
        await firebase.firestore()
            .collection('conversations')
            .add(conversation)
        utils.chatOpen()
        await view.showCurrentConversations()
        let formAddMessage = document.querySelector('.form-add-message-chat')
        formAddMessage.onsubmit = function (event) {
            event.preventDefault()

            let messageContent = formAddMessage.message.value.trim()
            if (messageContent) {
                controller.updateNewMessage(messageContent)
            }
        }

    },
    loadConversationsH: async function () {
        let currentEmail = firebase.auth().currentUser.email
        let result = await firebase.firestore()
            .collection('conversations')
            .where('users', 'array-contains', currentEmail)
            .get()
        let conversations = utils.getDataFromDocs(result.docs)
        model.saveListConversations(conversations)
        if (conversations.length) {
            let currentConversation = conversations[0]
            model.saveCurrentConversationsH(currentConversation)
        }

    },
    setupConversationChangeH: async function () {
        let isFirstRun = true
        let currentEmail = firebase.auth().currentUser.email

        firebase.firestore()
            .collection('conversations')
            .where('users', 'array-contains', currentEmail)
            .onSnapshot(function (snapshot) {
                if (isFirstRun) { // là sao ?
                    isFirstRun = false
                    return
                }

                let docChanges = snapshot.docChanges()
                for (let docChange of docChanges) {
                    let type = docChange.type
                    let conversationDoc = docChange.doc
                    let conversation = utils.getDataFromDoc(conversationDoc)

                    // type == 'modified'
                    if (type == 'modified') {
                        model.updateConversationChangeH(conversation)
                        if (model.currentConversationsH &&
                            model.currentConversationsH.id == conversation.id) {
                            view.showCurrentConversationH()
                        }
                    }
                    // type == 'added'
                    if (type == 'added') {
                        model.updateConversationChangeH(conversation)
                        view.showListConversationsH()
                    }
                    // type == 'removed'
                    if (type == 'removed') {
                        model.removeConversation(conversation)
                        view.showListConversationsH()
                        view.showCurrentConversationH()
                    }
                }
            })
    },
    updateNewMessageH: async function (messageContent) {
        if (model.currentConversationsH) {
            let conversationId = model.currentConversationsH.id
            let currentEmail = firebase.auth().currentUser.email
            let queryBtnSubmit = '.form-add-message-chat-h button[type="submit"]'
            let inputFormAddMessage = document.querySelector('.form-add-message-chat-h input[name="message"]')

            let message = {
                content: messageContent,
                owner: currentEmail,
                sendAt: new Date().toISOString()
            }

            await firebase.firestore()
                .collection('conversationsH')
                .doc(conversationId)
                .update({
                    messages: firebase.firestore.FieldValue.arrayUnion(message)
                })
            inputFormAddMessage.value = ''
        }
    },
    addConversationH: async function (title, friendEmail) {
        let currentEmail = firebase.auth().currentUser.email
        let now = new Date().toISOString()
        // validate title & friendEmail
        let titleRequired = utils.Validate(
            title,
            '#title-error',
            'Missing title!'
        )
        let friendEmailRequired = utils.Validate(
            friendEmail,
            '#friend-email-error',
            'Missing friend email!'
        )
        if (!titleRequired || !friendEmailRequired) {
            return
        }
        let signInMethods = await firebase.auth().fetchSignInMethodsForEmail(friendEmail)
        let friendEmailExists = utils.Validate(
            signInMethods.length,
            '#friend-email-error',
            'Email not exists in system!'
        )
        if (!friendEmailExists) {
            return
        }
        let notCurrentEmail = utils.Validate(
            friendEmail != currentEmail,
            '#friend-email-error',
            'Please enter your friend email!'
        )
        if (!notCurrentEmail) {
            return
        }
        // create new conversation in table 'conversations'
        let conversation = {
            title: title,
            users: [currentEmail, friendEmail],
            messages: [],
            createdAt: now
        }
        await firebase.firestore()
            .collection('conversations')
            .add(conversation)

        let inputTitle = document.querySelector('.form-add-conversation-h input[name="title"]')
        let inputFriendEmail = document.querySelector('.form-add-conversation-h input[name="friendEmail"]')
        inputTitle.value = ''
        inputFriendEmail.value = ''
    },
    leaveCurrentConversationH: async function () {
        if (model.currentConversationsH) {
            let currentConversationId = model.currentConversationsH.id
            let currentEmail = firebase.auth().currentUser.email

            await firebase.firestore()
                .collection('conversations')
                .doc(currentConversationId)
                .update({
                    users: firebase.firestore.FieldValue.arrayRemove(currentEmail)
                })
        }
    }

}