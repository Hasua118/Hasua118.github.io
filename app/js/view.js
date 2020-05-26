const view = {
    async showScreen(screenName) {
        let app = document.querySelector('#app')
        switch (screenName) {
            case 'loading': {
                app.innerHTML = components.loading
                break

            }
            case 'signIn': {
                app.innerHTML = components.signIn
                utils.setLoadingContent('#btn-sign-in', `Đăng Nhập`)
                let linka = document.querySelector('#aSignIn')
                linka.onclick = function () {
                    view.showScreen('signUp')
                }

                let form = document.querySelector('.form-sign-in')
                form.onsubmit = function (event) {
                    event.preventDefault()

                    let signInInfo = {
                        email: form.email.value.trim().toLowerCase(),
                        password: form.password.value
                    }

                    let checkPassword = null
                    if (!signInInfo.password) {
                        checkPassword = 'Vui lòng điền mật khẩu'
                    } else if (signInInfo.password.length < 6) {
                        checkPassword = 'Mật khẩu quá ngắn'
                    }

                    let validateResult = [
                        utils.Validate(signInInfo.email, '#email-error', 'Vui lòng nhập email'),
                        utils.Validate(signInInfo.password && signInInfo.password.length >= 6, '#passWord-error', checkPassword)
                    ]

                    if (utils.allPassed(validateResult)) {
                        controller.signIn(signInInfo)
                    }
                }

                break
            }
            case 'signUp': {
                app.innerHTML = components.signUp
                utils.setLoadingContent('#btn-sign-up', `Đăng Kí`)
                let linka = document.querySelector('#aSignUp')
                linka.onclick = function () {
                    view.showScreen('signIn')
                }

                let form = document.querySelector('.form-sign-up')
                form.onsubmit = function (event) {
                    event.preventDefault()

                    let signUpInfo = {
                        fullName: form.fullName.value.trim(),
                        email: form.email.value.trim().toLowerCase(),
                        password: form.password.value,
                        confirmPassword: form.confirmPassword.value
                    }

                    let checkPassword = null
                    if (!signUpInfo.password) {
                        checkPassword = 'Vui lòng điền mật khẩu'
                    } else if (signUpInfo.password.length < 6) {
                        checkPassword = 'Mật khẩu quá ngắn'
                    }

                    let validateResult = [
                        utils.Validate(signUpInfo.fullName, '#fullName-error', 'Vui lòng điền tên'),
                        utils.Validate(signUpInfo.email, '#email-error', 'Vui lòng điền email'),
                        utils.Validate(signUpInfo.password && signUpInfo.password.length >= 6, '#passWord-error', checkPassword),
                        utils.Validate(signUpInfo.password == signUpInfo.confirmPassword, '#confirmPassWord-error', 'Mật khẩu không chính xác')
                    ]

                    if (utils.allPassed(validateResult)) {
                        controller.signUp(signUpInfo)
                    }

                }

                let googleSignUp = document.querySelector('#googlenek')
                googleSignUp.onclick = function () {
                    controller.googleSignUp()
                }
                break
            }
            case 'home': {
                app.innerHTML = components.home
                if (model.currentUser) {
                    let user = firebase.auth().currentUser.displayName
                    utils.setText('#dangNhapChange', user)
                    utils.setLoadingContent('#dangKyChange', `<i class="fas fa-sign-out-alt"></i>`)
                }
                let out = document.querySelector('#dangKyChange')
                let innek = document.querySelector('#dangNhapChange')
                out.onclick = function () {
                    if (model.currentUser) {
                        firebase.auth().signOut()
                        model.currentUser = null
                    } else
                        view.showScreen('signUp')
                }
                innek.onclick = function () {
                    if (model.currentUser) {
                        if (model.currentUser.email == "ha11882000@gmail.com" || model.currentUser.email == "nguyencuong21520@gmail.com") {
                            view.showScreen('adminPage')
                        }
                    } else
                        view.showScreen('signIn')
                }
                await controller.loadDataFromDataConfirmed()
                let goToChat = document.querySelector(".go-to-chat")
                goToChat.onclick = function () {
                    if (model.currentUser) {
                        view.showScreen('chat')
                    } else
                        view.showScreen('signUp')
                }


                // push hash tag
                let pushHashTags = document.querySelectorAll('.input-tag')
                for (let hashTag of pushHashTags) {
                    hashTag.onclick = function (event) {
                        let currentHashTag = event.target;
                        let inputHashTag = document.querySelector('.hashTag')
                        inputHashTag.value += currentHashTag.innerText + ' '
                    }
                }
                // push data to firebase
                let formPostPlace = document.querySelector('#form-input-user-wrapper')
                formPostPlace.onsubmit = async function (event) {
                    event.preventDefault()
                    if (model.currentUser == null) {
                        utils.sweetAlert('error', 'Hãy đăng nhập để đăng bài nhé')
                        view.showScreen('signIn')

                    } else {
                        utils.setLoadingContent('#zxcvb', `<div class="lds-facebook"><div></div><div></div><div></div></div>`)
                        let title = formPostPlace.title.value.trim()
                        let address = formPostPlace.address.value.trim()
                        let type = formPostPlace.type.value.trim()
                        let content = formPostPlace.content.value.trim()
                        let images = [];
                        let inputUpLoad = document.querySelector('.upLoad-file')
                        var fileList = inputUpLoad.files;
                        for (file of fileList) {
                            let url = await controller.upLoadImage(file)
                            images.push(url);
                        }
                        controller.addData(title, address, type, content, images)
                    }
                }
                // show data from dataWhereToGo
                let buttonSelectLeft = document.querySelector('#kham-pha-ben-trai')
                buttonSelectLeft.onclick = async function () {
                    utils.topFunction()

                    let data = model.dataWhereToGo
                    let data1 = []
                    for (let i = 0; i < 21; i++) {
                        data1[i] = data[i]
                    }
                    await view.showListData(data1, 1)
                    let lengthCard = controller.getCartFromLocal().length
                    document.querySelector('#countCard').innerText = lengthCard
                    window.onscroll = function () {
                        css.change(data1)
                    }
                }
                // show tour
                let buttonSelectRight = document.querySelector('#kham-pha-ben-phai')
                buttonSelectRight.onclick = async function () {
                    let listContainer = document.querySelector('#body-home-nek')
                    listContainer.innerHTML = components.tour
                    utils.topFunction()
                }
                // search data from dataWhereToGo
                let formsearch = document.querySelector('.searchPlace')
                formsearch.onsubmit = async function (event) {
                    event.preventDefault()
                    let dataSearch = formsearch.search.value + " ";
                    if (dataSearch.length > 1) {
                        let pattern = dataSearch.replace(/hà nội/g, ' ').replace(/\s{1,}/g, ' ').replace(/(.*?)\s/g, "($1)|");
                        pattern = pattern.substr(0, pattern.length - 1);
                        await controller.searchPlace(pattern)

                    }
                }
                controller.loadDataFromDataWhereToGo()
                view.showDataConfirmed()
                controller.setUpDataChange('dataWhereToGo')
                controller.setUpDataChange('dataConfirmed')
                controller.loadDataFromDataUserPush()
                if(model.currentUser){
                await controller.loadConversations()
                controller.setUpConversationchange()
                }
               
                // show chat home
                for (let Index of model.dataConfirmed) {
                    let id = Index.id
                    let contact = document.getElementById(`contact-${id}`)
                    contact.onclick = async function () {
                        if(model.currentUser){
                        let email = Index.email
                        let title = Index.title
                        await controller.addConversation(title, email)
                        }
                        else
                        {
                            utils.sweetAlert('warning', 'Hãy đăng nhập để chat bạn nhé')
                        }
                    }
                }

                break
            }
            case 'adminPage': {
                app.innerHTML = components.adminPage
                if (model.currentUser) {
                    let user = firebase.auth().currentUser.displayName
                    utils.setText('#dangNhapChange', user)
                    utils.setLoadingContent('#dangKyChange', `<i class="fas fa-sign-out-alt"></i>`)
                }
                let out = document.querySelector('#dangKyChange')
                let innek = document.querySelector('#dangNhapChange')
                let currentUser = model.currentUser
                out.onclick = function () {
                    if (currentUser) {
                        firebase.auth().signOut()
                        model.currentUser = null
                    } else
                        view.showScreen('signUp')
                }
                innek.onclick = function () {
                    if (currentUser) {} else
                        view.showScreen('signIn')
                }
                await controller.loadDataFromDataUserPush()
                controller.setupDataUnConfirmChange()
                utils.topFunction()
                let result = model.dataUserPush;
                let data = [];
                result.forEach(function (doc) {
                    data.push(doc)
                });
                view.showListDataAdmin(data)
                break
            }
            case 'chat': {
                app.innerHTML = components.nav + components.chat
                if (model.currentUser) {
                    let user = firebase.auth().currentUser.displayName
                    utils.setText('#dangNhapChange', user)
                    utils.setLoadingContent('#dangKyChange', `<i class="fas fa-sign-out-alt"></i>`)
                }
                let out = document.querySelector('#dangKyChange')
                let innek = document.querySelector('#dangNhapChange')
                let currentUser = model.currentUser
                out.onclick = function () {
                    if (currentUser) {
                        firebase.auth().signOut()
                        model.currentUser = null
                    } else
                        view.showScreen('signUp')
                }
                innek.onclick = function () {
                    if (currentUser) {} else
                        view.showScreen('signIn')
                }
                await controller.loadConversationsH()
                controller.setupConversationChangeH()

                view.showListConversationsH()
                view.showCurrentConversationH()

                // su kien form-add-message
                let formAddMessage = document.querySelector('.form-add-message-chat-h')
                formAddMessage.onsubmit = function (event) {
                    event.preventDefault()

                    let messageContent = formAddMessage.message.value.trim()
                    if (messageContent) {
                        controller.updateNewMessageH(messageContent)
                    }
                }

                //su kien form-add-conversation
                let formAddConversation = document.querySelector('.form-add-conversation-h')
                formAddConversation.onsubmit = function (event) {
                    event.preventDefault()

                    let title = formAddConversation.title.value
                        .trim()
                    let friendEmail = formAddConversation.friendEmail.value
                        .trim().toLowerCase()

                    controller.addConversationH(title, friendEmail)
                }

          // su kien btn-leave-conversation
          let btnLeaveConversation = document.querySelector('#btn-leave-conversation-h')
          btnLeaveConversation.onclick = function() {
            controller.leaveCurrentConversationH()
          }



            }
        

        }
    },
    showDataConfirmed: function () {
        let data = model.dataConfirmed
        let post = document.querySelector('#showDataConfirmed')
        let li = document.querySelector('#tyu')
        let index = 0
        post.innerHTML = ''
        li.innerHTML = ''
        for (let x of data) {
            let active = ''
            if (index == 0) {
                active = "active"
            }
            let id = x.id
            let html1 = `<li data-target="#demo1" data-slide-to="${index}" class="${active}"></li>`
            li.innerHTML += html1
            let html = `        <div class="carousel-item ${active}">
        <div class="row">
          <div class=" col-sm-12 col-md-5 col-xl-5 ">
            <img style="
                    height: 400px;
                    object-fit: cover;
                " src="${x.images}">
          </div>
          <div class="col-sm-12 col-md-7  col-xl-7 " style="
    padding-bottom: 111px;
">
            <span class="content-span"><i class="fas fa-user-tie">  </i>       ${x.user}</span>
            <div class="show-time-user">${x.time}</div>
            <div class="title">${x.title}</div>
            <div style="padding-top:0px ;" class="input-tag">
              <a>${x.type}</a>
            </div>
            <div class="text">${x.content}</div>
            <div  class="footer-show-place-user-push">
              
            <div class="left-incrad-wrapper left-incard-${id}">

            </div>

              <div class="right-incard-wapper-home">
                <span style="margin-top: 9px;color:#8e44ad;">${x.address}</span>
                <button id="contact-${x.id}" style="color: white;" class="btn">Liên Hệ</button>
            </div>

            </div>
          </div>
        </div>
      </div>`
            post.innerHTML += html
            index += 1
        }
        view.showLike(data)
        view.getDataForAddLike(data, 'dataConfirmed')
    },
    showListData: async function (data, index) {
        if (data) {
            let listContainer = document.querySelector('#body-home-nek')
            listContainer.innerHTML = components.menu
            let card = document.querySelector('#cacdeck')
            for (let data1 of data) {
                let id = data1.id
                let html = `<div class="col-md-4 col-sm-6"style="margin-bottom: 30px;">
                <div class="card">
                    <span class="content-span" style="padding: 5px 0px 0px 10px; color: black;"><i class="fas fa-user-tie"></i> Nguyễn Văn Cường</span>
                    <div class="show-time-user" style="margin-left:36px !important; ">18:00 21/05/2000</div>
                    <img class="card-img-top img-fluid img-cuong" src="${data1.image}" alt="Mất ảnh rồi các bạn ạ!">
                    <div class="card-body text-center">
                    <p class="type-name-incard">${data1.time}</p>
                    <h4>${data1.title}</h4>
                    <p class="content-incrad">${data1.content}</p>
                    <div class="container-fluid">
                        <div class="left-incrad-wrapper left-incard-${id}">

                        </div>
                        <div class="right-incrad-wrapper">
                            <button class="btn btn-outline-light text-dark" data-toggle="modal" data-target="#modalYT${id}">Chi tiết</button>
              <!-- alooooo -->
                    <div class="modal fade" id="modalYT${id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">

                  <!--Content-->
                  <button type="button" style="width:auto" class="close" data-dismiss="modal">&times;</button>
                  <div class="modal-content">

                    <!--Body-->
                    <div class="modal-body mb-0 p-0">

                      <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
                        <img class="embed-responsive-item"
                          src="${data1.image}" alt="lại mất ảnh r hjc">
                      </div>
                      <div class="content-cac-ban-oi">
                        <h1>${data1.title}</h1>
                        <div class="modal-tag">
                          <a>${data1.type}</a>
                          
                        </div>
                        <div class="boc-noi-dung">
                          <p>${data1.content}</p>
                        </div>
                      </div>


                    </div>

                    <!--Footer-->
                    <div class="modal-footer flex-column flex-md-row">
                      <p>${data1.like.length} <i class="fas fa-heart-circle"></i></p>
                      <span class="">${data1.address}</span>
                      <div class="boc-cai-button">
                        <button type="button" class="btn btn-outline-light text-dark clickForAddData" data-dismiss="modal">Thêm vào list</button>
                      </div>

                    </div>

                  </div>
                  <!--/.Content-->

                </div>
              </div>
              <!-- aloooo -->
            </div>
          </div>
        </div>
      </div>
      </div>`
                card.innerHTML += html
            }
            view.showNextPrePage(index)
            for (let i = 1; i < 6; i++) {
                let select = document.querySelector(`#id-page-${i}`)
                select.onclick = function () {
                    let data = model.dataWhereToGo
                    let data1 = []
                    for (let x = 0; x < 21; x++) {
                        if (i == 5) {
                            data1[x] = data[79 + x]
                        } else
                            data1[x] = data[(i - 1) * 20 + x]
                    }
                    view.showListData(data1, i)
                }
            }
            view.showLike(data)
            view.getDataForAddLike(data, 'dataWhereToGo')
            const listProduct = document.getElementsByClassName("clickForAddData")
            controller.getDataWhenClick(listProduct, data)
        }
    },
    showLike: function (data) {
        for (let x of data) {
            let id = x.id
            listUserLike = document.querySelector(`.left-incard-${id}`)
            let html = `<div class="left-incard-content-wrapper dropdown">
        <p data-toggle="dropdown">${x.like.length} <i class="fas fa-heart-circle like-${id}"></i></p>
        <ul class="dropdown-menu" style="height: 140px;overflow: auto;">
              <li class="dropdown-header"><strong>Người thích</strong></li>
              <div id="listUserLike-${id}">
              </div>                       
        </ul>
        </div>`
            listUserLike.innerHTML += html
            let html0 = document.querySelector(`#listUserLike-${id}`)
            for (let y of x.like) {
                let l = `<li>${y}</li>`
                html0.innerHTML += l
            }
        }

    },
    getDataForAddLike: function (data,filed) {
        if (model.currentUser) {
            let currentUser = firebase.auth().currentUser.displayName
            for (let cardIndex of data) {
                let id = cardIndex.id
                let like = document.querySelector(`.like-${id}`)
                like.onclick = function () {
                    controller.addLike(currentUser, id, filed)
                }
            }
        } else {
            utils.sweetAlert('error', 'Bạn chưa đăng nhập')
        }
    },
    showNextPrePage: async function (index) {

        let id_1 = ''
        let id_2 = ''
        let id_3 = ''
        let id_4 = ''
        let id_5 = ''

        if (index == 1) {
            id_1 = 'active'
        }
        if (index == 2) {
            id_2 = 'active'
        }
        if (index == 3) {
            id_3 = 'active'
        }
        if (index == 4) {
            id_4 = 'active'
        }
        if (index == 5) {
            id_5 = 'active'
        }

        let nextPre = document.querySelector('#next-pre-page')

        nextPre.innerHTML = `  <ul class="pagination">

        <li id="id-page-1" class="page-item  ${id_1}"><a class="page-link" href="#">1</a></li>
        <li id="id-page-2" class="page-item  ${id_2}"><a class="page-link" href="#">2</a></li>
        <li id="id-page-3" class="page-item  ${id_3}"><a class="page-link" href="#">3</a></li>
        <li id="id-page-4" class="page-item  ${id_4}"><a class="page-link" href="#">4</a></li>
        <li id="id-page-5" class="page-item  ${id_5}"><a class="page-link" href="#">5</a></li>

          </ul>`

    },
    showCurrentConversations() {
        let listContainer = document.querySelector('.list-message-chat')
        let detailContainer = document.querySelector('.details-current-conversation')

        listContainer.innerHTML = ''
        detailContainer.innerHTML = ''
        if (model.currentConversations) {
            let messages = model.currentConversations.messages
            let currentEmail = firebase.auth().currentUser.email
            let users1 = model.currentConversations.users
            let user
            if (users1[0] == currentEmail) {
                user = users1[1]
            } else {
                user = users1[0]
            }
            if (messages) {
                for (let message of messages) {
                    let owner = message.owner
                    let className = (owner == currentEmail) ? `message-chat your` : `message-chat`
                    let messageHtml = `
           <div class="${className}">
           <span>${message.content}</span>
           </div>`
                    listContainer.innerHTML += messageHtml
                }
            }
            detailContainer.innerHTML = user
        }
    },
    showListDataAdmin(data1) {
        if (data1) {
            let card = document.querySelector('#body-admin')
            let index = 0
            let result = []
            card.innerHTML = '';
            for (let i = 0; i < data1.length; i++) {
                index += 1
                result[i] = data1[i]
                let html = `
                <div class="col-md-4 col-sm-6" style="margin-bottom: 30px;">
                <div class="card">
                    <span class="content-span" style="padding: 5px 0px 0px 10px"><i class="fas fa-user-tie"></i>${data1[i].user}</span>
                    <div class="show-time-user" style="margin-left:36px !important; ">Đã đăng</div>
                    <img class="card-img-top img-fluid img-cuong" src="${data1[i].images}" alt="Đức ơi là đức">
                    <div class="card-body text-center">
                        <p class="type-name-incard">${data1[i].time}</p>
                        <h4>${data1[i].title}</h4>
                        <p class="content-incrad">${data1[i].content}</p>
                        <div class="container-fluid">
                            <div class="left-incrad-wrapper">
                                <div class="left-incard-content-wrapper">
                                </div>
                            </div>
                            <div class="right-incrad-wrapper">
                                <button class="btn btn-outline-light text-dark" data-toggle="modal"
                                    data-target="#modalYT${index}">Chi tiết</button>
                                    
                                    <button type="button" class="button-confirm-data" >Duyệt</button>
                                    
                                <!-- alooooo -->
                                <div class="modal fade" id="modalYT${index}" tabindex="-1" role="dialog"
                                    aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg" role="document">
        
                                        <!--Content-->
                                        <button type="button" style="width:auto" class="close"
                                            data-dismiss="modal">&times;</button>
                                        <div class="modal-content">
        
                                            <!--Body-->
                                            <div class="modal-body mb-0 p-0">
        
                                                <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
                                                    <img class="embed-responsive-item" src="${data1[i].images}"
                                                        alt="lại mất ảnh r hjc">
                                                </div>
                                                <div class="content-cac-ban-oi">
                                                    <h1>${data1[i].title}</h1>
                                                    <div class="modal-tag">
                                                        <a>${data1.type}</a>
        
                                                    </div>
                                                    <div class="boc-noi-dung">
                                                        <p>${data1[i].content}</p>
                                                    </div>
                                                </div>
        
        
                                            </div>
        
                                            <!--Footer-->
                                            <form class="modal-footer flex-column flex-md-row" >
                                                <span class="">${data1[i].address}</span>
                                                <div class="boc-cai-button">
                                                    <button type="button" class="btn btn-outline-light text-dark admin-delete"
                                                        data-dismiss="modal">Xóa</button>
                                                </div>
        
                                            </form>
        
                                        </div>
                                        <!--/.Content-->
        
                                    </div>
                                </div>
                                <!-- aloooo -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
                `
                card.innerHTML += html

            }
            const addDataToConfirmed = document.getElementsByClassName("button-confirm-data")
            controller.getDataToConfirmWhenClick(addDataToConfirmed, result)
            const dataUnConfirmed = document.getElementsByClassName("admin-delete")
            controller.deleteDataUnConfirm(dataUnConfirmed, result)
        }
    },
    chatbc: async function() {
        utils.chatOpen()
        let formAddMessage = document.querySelector('.form-add-message-chat')
        formAddMessage.onsubmit = function (event) {
            event.preventDefault()

            let messageContent = formAddMessage.message.value.trim()
            if (messageContent) {
                controller.updateNewMessage(messageContent)
            }
        }

    },
    showCurrentConversationH() {
        let listContainer = document.querySelector('.list-message-chat-h')
        listContainer.innerHTML = ''
        let detailsContainer = document.querySelector('.details-current-conversation-h')
        detailsContainer.innerHTML = ''

        if (model.currentConversationsH) {
            let messages = model.currentConversationsH.messages
            let currentEmail = firebase.auth().currentUser.email
            let users = model.currentConversationsH.users
            let createdAt = model.currentConversationsH.createdAt
            let createdAtLocale = new Date(createdAt).toLocaleString()

            // display all message of current conversation
            for (let message of messages) {
                let content = message.content
                let formattedContent = utils.formatMessageChat(content)
                let owner = message.owner
                let className = owner == currentEmail ?
                    'message-chat your-h' :
                    'message-chat-h'

                let messageHtml = `
              <div class="${className}">
                <span>${formattedContent}</span>
              </div>
            `
                listContainer.innerHTML += messageHtml // <span>a</span>
            }

            // display details info of current conversation
            for (let email of users) {
                let emailHtml = `
              <div class="conversation-email-h">${email}</div>
            `
                detailsContainer.innerHTML += emailHtml
            }
            let createdAtHtml = `
            <div class="conversation-created-at-h">${createdAtLocale}</div>
          `
            detailsContainer.innerHTML += createdAtHtml
        }
    },
    //done
    showListConversationsH() {
        if (model.listConversations) {
            let listConversations = model.listConversations // [{ id: 1, title: '', users: ['email1', 'email2'] }]
            let listContainer = document.querySelector('.list-conversation-h')

            listContainer.innerHTML = ''

            // show all html to screen
            for (let conversation of listConversations) {
                let conversationId = conversation.id
                let title = conversation.title
                let memberCount = conversation.users.length
                let members = memberCount > 1 ?
                    `${memberCount} members` :
                    `${memberCount} member`
                let className = (model.currentConversationsH && model.currentConversationsH.id == conversationId) ?
                    'conversation-h current' :
                    'conversation-h'

                let html = `
              <div id="conversation-${conversationId}" class="${className}">
                <div class="conversation-h-title">${title}</div>
                <div class="conversation-h-members">${members}</div>
              </div>
            `
                listContainer.innerHTML += html
            }

            // bind event to conversation tags
            for (let conversation of listConversations) {
                let conversationId = conversation.id
                let conversationDiv = document.querySelector(`#conversation-${conversationId}`)

                conversationDiv.onclick = function () {
                    model.saveCurrentConversationsH(conversation)
                    view.showCurrentConversationH()
                    view.showListConversationsH()
                }
            }
        }
    },

}

// function triggerUploadFile() {
// document.querySelector('.upLoad-file').click()
// }