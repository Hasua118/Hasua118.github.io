const model = {
    listConversations: null, //danh sách cuộc hội thoại người tham gia 
    currentConversations: null, // Cuộc hội thoại người dùng đang trỏ vào
    // { user : [], messages : [], title , createAt}
    saveListConversations(conversations) {
        model.listConversations = conversations
    },
    saveCurrentConversations(conversation) {
        model.currentConversations = conversation
    },
    updateConversationChange(newConversation){
        //newConversation = { id:1 }
        if(model.listConversations){
            //listConversation = [{id:1},{id:2},{id:3}]
            let foundIndex = model.listConversations.findIndex(function(conversation){
                return conversation.id == newConversation.id
            })
            // console.log('NewConversation' ,newConversation)
            // console.log('FindIndex', foundIndex)
            if(foundIndex>=0){
                model.listConversations[foundIndex] =  newConversation
            } else{
                model.listConversations.unshift(newConversation)
            }

            //currentConversation = {id:1}
            if(model.currentConversations && newConversation.id == model.currentConversations.id){
                model.saveCurrentConversations(newConversation)
            }
        }
    },
    removeConversation(conversation){
        if(model.listConversations){
            let conversationIndex = model.listConversations.findIndex(function(elem){
                return elem.id == conversation.id
            })
             if(conversationIndex >=0 ){
                 model.listConversations.splice(conversationIndex,1)
             }
             if(model.currentConversations && model.currentConversations.id == conversation.id){
                 model.currentConversations = null
                 if(model.listConversations.length){
                     model.currentConversations = model.listConversations[0]
                 }
             }
        }
    }
}