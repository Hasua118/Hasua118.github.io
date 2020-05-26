let model ={
    currentUser: null,
    dataWhereToGo: null,
    dataUserPush: null,
    dataSearch: null,
    listConversations: null,
    currentConversations: null,
    dataConfirmed : null,
    checkSignUp: null,
    currentConversationsH: null,

    saveDataWhereToGo(data){
        model.dataWhereToGo = data
    },
    saveDataUserPush(data){
        model.dataUserPush = data
    },
    saveDataConfirmed(data){
        model.dataConfirmed = data
    },
    saveListConversations(conversations) {
        model.listConversations = conversations
    },
    saveCurrentConversations(conversation) {
        model.currentConversations = conversation
    },
    updateDataChange(newPlace){
        if(model.dataWhereToGo){
            let foundIndex = model.dataWhereToGo.findIndex(function(place){
                return place.id == newPlace.id
            })
            if(foundIndex>=0){
                model.dataWhereToGo[foundIndex] =  newPlace
            } else{
                model.dataWhereToGo.unshift(newPlace)
            }
        }
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
    updateConversationChange(newConversation){
        if(model.listConversations){
            let foundIndex = model.listConversations.findIndex(function(conversation){
                return conversation.id == newConversation.id
            })
            if(foundIndex>=0){
                model.listConversations[foundIndex] =  newConversation
            } else{
                model.listConversations.unshift(newConversation)
            }
            if(model.currentConversations && newConversation.id == model.currentConversations.id){
                model.saveCurrentConversations(newConversation)
            }
        }
    },
    updateDataUserPushChange(newPlace){
        if(model.dataUserPush){
            let foundIndex = model.dataUserPush.findIndex(function(place){
                return place.id == newPlace.id
            })
            if(foundIndex >= 0){
                model.dataUserPush[foundIndex] = newPlace
            }else{
                model.dataUserPush.unshift(newPlace)
            }
        }
    },
    removeDataUnConfirm(place){
        if(model.dataUserPush){
            let foundIndex = model.dataUserPush.findIndex(function(element){
            return element.id == place.id
            })
            if(foundIndex>= 0){
                model.dataUserPush.splice(foundIndex,1)
            }
        }
    },
    removeConversation(conversation) {
        if (model.listConversations) {
            // remove conversation from listConversation
            let conversationIndex = model.listConversations.findIndex(function (element) {
                return element.id == conversation.id
            })
            if (conversationIndex >= 0) {
                model.listConversations.splice(conversationIndex, 1)
            }
            // remove currentConversation
            if (model.currentConversations &&
                model.currentConversations.id == conversation.id) {
                model.currentConversations = null
                if (model.listConversations.length) {
                    model.currentConversations = model.listConversations[0]
                }
            }
        }
    },
    saveCurrentConversationsH(conversation) {
        model.currentConversationsH = conversation
    },
    updateConversationChangeH(newConversation) {
        if (model.listConversations) {
            let foundIndex = model.listConversations.findIndex(function (conversation) {
                return conversation.id == newConversation.id
            })
            if (foundIndex >= 0) {
                model.listConversations[foundIndex] = newConversation
            } else {
                model.listConversations.unshift(newConversation)
            }
            if (model.currentConversationsH && newConversation.id == model.currentConversationsH.id) {
                model.saveCurrentConversationsH(newConversation)
            }
        }
    },
    removeConversation(conversation) {
        if (model.listConversations) {
            // remove conversation from listConversation
            let conversationIndex = model.listConversations.findIndex(function (element) {
                return element.id == conversation.id
            })
            if (conversationIndex >= 0) {
                model.listConversations.splice(conversationIndex, 1)
            }
            // remove currentConversation
            if (model.currentConversationsH &&
                model.currentConversationsH.id == conversation.id) {
                model.currentConversationsH = null
                if (model.listConversations.length) {
                    model.currentConversationsH = model.listConversations[0]
                }
            }
        }
    },

}