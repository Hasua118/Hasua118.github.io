 const controller = {
     signUp: async /*câu lệnh bất đồng bộ,kiểu tất cả các lệnh chạy cùng 1 lúc */ function (signUpInfo) {
         // console.log('sign up',signUpInfo)
         let email = signUpInfo.email
         let password = signUpInfo.password
         let firstname = signUpInfo.firstname
         let lastname = signUpInfo.lastname
         view.setText('#sign-up-success', '')
         view.setText('#sign-up-error', '')
         view.disable('#form-sign-up-btn')
         try {
             await firebase.auth().createUserWithEmailAndPassword(email, password) /*await là để câu lệnh chạy xong rồi với đến câu lệnh khác */
             await firebase.auth().currentUser.updateProfile({
                 displayName: firstname + " " + lastname
             })
             await firebase.auth().currentUser.sendEmailVerification()
             view.setText('#sign-up-success', 'An email verification has been sent to your email')
         } catch (error) {
             let message = error.message
             view.setText('#sign-up-error', message)
         }
         view.enable('#form-sign-up-btn')
     },
     signIn: async function (signInInfo) {
         view.setText('#sign-in-error', '')
         view.disable('#form-sign-in-btn')
         try {
             let email = signInInfo.email
             let password = signInInfo.password
             let result = await firebase.auth().signInWithEmailAndPassword(email, password)
             let user = result.user
             if (user.emailVerified) {
                 view.showScreen('chat')
             } else {
                 throw new Error('Must verify email!')
             }

         } catch (error) {
             // console.log('error', error)
             // console.log(error.message)
             let message = error.message
             view.setText('#sign-in-error', message)
             view.enable('#form-sign-in-btn')
         }
     },
     loadConversations: async function () {
         // console.log('model before load',model)
        let currentEmail = firebase.auth().currentUser.email
         // read if from DB

         let result = await firebase.firestore()
             .collection('conversations')
             .where('users', 'array-contains', currentEmail)
             .get()
         let conversations = utils.getDataFromDocs(result.docs)
         model.saveListConversations(conversations)
         console.log('xx',model.listConversations)
         if (conversations.length) {
            //  let currentConversation = conversations[conversations.length - 1]
             let currentConversation = conversations[0]
             model.saveCurrentConversations(currentConversation)
         }

         // console.log('model affter load ' , model)


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
             view.disable('#aaa')
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
             view.enable('#aaa')
             inputFormAddMessage.value = ''
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

                //   console.log('type ', type)
                //   console.log('conveartion truyen vao' , conversation)
                 //  console.log('conversation', conversation)

                 if (type == 'modified') {
                     model.updateConversationChange(conversation)
                     if (model.currentConversations && model.currentConversations.id == conversation.id) {
                         view.showCurrentConversations()
                     }
                 }
                 if(type == 'added'){
                     model.updateConversationChange(conversation)
                    //  controller.loadConversations()
                     view.showListConversation()
                 }
                 if(type == 'removed'){
                    model.removeConversation(conversation)
                    view.showListConversation()
                    view.showCurrentConversations()
                 }
             }
         })
     },
     addConversation: async function (title, friendEmail) {
         // validate title & friendEmail
        //  view.disable('')
         let currentEmail = firebase.auth().currentUser.email
         let now = new Date().toISOString()
         let titleRequired = view.Validate(title, '#title-error', 'Missing Title')
         let friendEmailRequired = view.Validate(friendEmail, '#friend-email-error', 'Missing Friend Email')

         if (!titleRequired || !friendEmailRequired) {
             return
         }
         let signInMethod = await firebase.auth().fetchSignInMethodsForEmail(friendEmail)
         let friendEmailExists = view.Validate(signInMethod.length, '#friend-email-error', 'Email not exists in system!')
         if (!friendEmailExists) {
             return
         }
         let notCurrenrtEmail = view.Validate(friendEmail != currentEmail, "#friend-email-error", "Mày tự kỉ à?")
         if (!notCurrenrtEmail) {
             return
         }

         let conversation = {
             title: title,
             users: [currentEmail, friendEmail],
             message: [],
             createdAt: now
         }
         await firebase.firestore()
             .collection('conversations')
             .add(conversation)
            let inputTitle = document.querySelector('.form-add-conversation input[name="title"]')
            let inputFriendEmail = document.querySelector('.form-add-conversation input[name="friendEmail"]')

            inputTitle.value = ''
            inputFriendEmail.value = ''

     },
     leaveCurrentConversation: async function(){
         if(model.currentConversations){
            let currentConversationId = model.currentConversations.id
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