const utils = {
    setText(query, text) {
        document.querySelector(query).innerText = text
    },
    Validate(condition, queryErrorTag, messageError) {
        if (condition) {
            utils.setText(queryErrorTag, '')
            return true
        } else {
            utils.setText(queryErrorTag, messageError)
            return false
        }
    },
    allPassed(validateResult) {
        for (let result of validateResult) {
            if (!result) {
                return false
            }

        }
        return true
    },
    setLoadingContent(query, html) {
        document.querySelector(query).innerHTML = html
    },
    getDataFromDoc(doc) {
        let data = doc.data()
        data.id = doc.id
        return data

    },
    getDataFromDocs(docs) {
        let result = []
        for (let doc of docs) {
            let data = utils.getDataFromDoc(doc)
            result.push(data)
        }
        return result
    },
    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    bottomFunction() {
        var objDiv = document.querySelector('.list-message-chat');
        objDiv.scrollTop = objDiv.scrollHeight;
    },
    showHomeWhenClickOnLogo() {
        view.showScreen('home')
    },
    chatOpen() {
        let chatStaus = document.querySelector('.chat-container')
        chatStaus.classList.add('show-list')   
    },
    chatClose() {
        let chatStaus = document.querySelector('.chat-container')
        chatStaus.classList.remove('show-list')
    },
    sweetAlert(icon, content) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: icon,
            title: content
        })
    },
    formatMessageChat: function(text) {
        // text = 'abc :)'
        // formattedText = 'abc <i class="fas fa-plus"></i>'
        return text
          .replace(/:\)/g, '<i class="fas fa-smile"></i>')
          .replace(/:D/g, '<i class="fas fa-grin"></i>')
      }


}