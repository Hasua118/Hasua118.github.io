const view = {
    async showScreen(screenName) {
      let app = document.querySelector('#app')
  
      switch(screenName) {
        case 'signUp': {
          // display page content
          app.innerHTML = components.signUp
  
          // bind events
          let link = document.querySelector('#form-sign-up-link')
          link.onclick = function() {
            view.showScreen('signIn')
          }
  
          let form = document.querySelector('.form-sign-up')
          form.onsubmit = function(event) {
            event.preventDefault()
            // 1. get data
            let signUpInfo = {
              firstname: form.firstname.value.trim(), // required
              lastname: form.lastname.value.trim(), // required
              email: form.email.value.trim().toLowerCase(), // required
              password: form.password.value, // required && length >= 6
              confirmPassword: form.confirmPassword.value // required && length >= 6 && == password
            }
  
            // 2. validate data
            let validateResult = [
              view.validate(signUpInfo.firstname, '#firstname-error', 'Missing firstname!'),
              view.validate(signUpInfo.lastname, '#lastname-error', 'Missing lastname!'),
              view.validate(signUpInfo.email, '#email-error', 'Missing email!'),
              view.validate(
                signUpInfo.password && signUpInfo.password.length >= 6,
                '#password-error',
                'Invalid password!'
              ),
              view.validate(
                signUpInfo.confirmPassword && signUpInfo.confirmPassword.length >= 6
                  && signUpInfo.password == signUpInfo.confirmPassword,
                '#confirm-password-error',
                'Invalid confirm password!'
              )
            ]
  
            // 3. submit data
            
            if(view.allPassed(validateResult)) {
              controller.signUp(signUpInfo)
            }
  
          }
  
          break
        }
        case 'signIn': {
          app.innerHTML = components.signIn
  
          let link = document.querySelector('#form-sign-in-link')
          link.onclick = function() {
            view.showScreen('signUp')
          }
  
          let form = document.querySelector('.form-sign-in')
          form.onsubmit = function(e) {
            e.preventDefault()
  
            let signInInfo = {
              email: form.email.value.trim().toLowerCase(),
              password: form.password.value
            }
            
            let validateResult = [
              view.validate(signInInfo.email, '#email-error', 'Missing email!'),
              view.validate(
                signInInfo.password && signInInfo.password.length >= 6,
                '#password-error',
                'Invalid password!'
              )
            ]
  
            if(view.allPassed(validateResult)) {
              controller.signIn(signInInfo)
            }
          }
  
          break
        }
        case 'chat': {
          app.innerHTML = components.nav + components.chat
          
          // load conversations from database >> save conversations to model
          await controller.loadConversations()
          controller.setupConversationChange()
  
          view.showListConversations()
          view.showCurrentConversation()
  
          // su kien form-add-message
          let formAddMessage = document.querySelector('.form-add-message-chat')
          formAddMessage.onsubmit = function(event) {
            event.preventDefault()
  
            let messageContent = formAddMessage.message.value.trim()
            if(messageContent) {
              controller.updateNewMessage(messageContent)
            }
          }
  
          //su kien form-add-conversation
          let formAddConversation = document.querySelector('.form-add-conversation')
          formAddConversation.onsubmit = function(event) {
            event.preventDefault()
  
            let title = formAddConversation.title.value
              .trim()
            let friendEmail = formAddConversation.friendEmail.value
              .trim().toLowerCase()
  
            controller.addConversation(title, friendEmail)
          }

          // su kien btn-leave-conversation
          let btnLeaveConversation = document.querySelector('#btn-leave-conversation')
          btnLeaveConversation.onclick = function() {
            controller.leaveCurrentConversation()
          }

          //su kien sign out
          let signOut = document.querySelector('#sign-out')
          signOut.onclick = function(){
            firebase.auth().signOut()
          }
        }
      }
    },
    showListConversations() {
      if(model.listConversations) {
        let listConversations = model.listConversations // [{ id: 1, title: '', users: ['email1', 'email2'] }]
        let listContainer = document.querySelector('.list-conversation')
  
        listContainer.innerHTML = ''
  
        // show all html to screen
        for(let conversation of listConversations) {
          let conversationId = conversation.id
          let title = conversation.title
          let memberCount = conversation.users.length
          let members = memberCount > 1
            ? `${memberCount} members`
            : `${memberCount} member`
          let className = (model.currentConversation && model.currentConversation.id == conversationId)
            ? 'conversation current'
            : 'conversation'
  
          let html = `
            <div id="conversation-${conversationId}" class="${className}">
              <div class="conversation-title">${title}</div>
              <div class="conversation-members">${members}</div>
            </div>
          `
          listContainer.innerHTML += html
        }
  
        // bind event to conversation tags
        for(let conversation of listConversations) {
          let conversationId = conversation.id
          let conversationDiv = document.querySelector(`#conversation-${conversationId}`)
  
          conversationDiv.onclick = function() {
            model.saveCurrentConversation(conversation)
            view.showCurrentConversation()
            view.showListConversations()
          }
        }
      }
    },
    showCurrentConversation() {
      let listContainer = document.querySelector('.list-message-chat')
      listContainer.innerHTML = ''
      let detailsContainer = document.querySelector('.details-current-conversation')
      detailsContainer.innerHTML = ''
  
      if(model.currentConversation) {
        let messages = model.currentConversation.messages
        let currentEmail = firebase.auth().currentUser.email
        let users = model.currentConversation.users
        let createdAt = model.currentConversation.createdAt
        let createdAtLocale = new Date(createdAt).toLocaleString()
        
        // display all message of current conversation
        for(let message of messages) {
          let content = message.content
          let formattedContent = utils.formatMessageChat(content)
          let owner = message.owner
          let className = owner == currentEmail
            ? 'message-chat your'
            : 'message-chat'
  
          let messageHtml = `
            <div class="${className}">
              <span>${formattedContent}</span>
            </div>
          `
          listContainer.innerHTML += messageHtml // <span>a</span>
        }
  
        // display details info of current conversation
        for(let email of users) {
          let emailHtml = `
            <div class="conversation-email">${email}</div>
          `
          detailsContainer.innerHTML += emailHtml
        }
        let createdAtHtml = `
          <div class="conversation-created-at">${createdAtLocale}</div>
        `
        detailsContainer.innerHTML += createdAtHtml
      }
    },
    setText(query, text) {
      document.querySelector(query).innerText = text
    },
    validate(condition, queryErrorTag, messageError) {
      if(condition) {
        view.setText(queryErrorTag, '')
        return true
      } else {
        view.setText(queryErrorTag, messageError)
        return false
      }
    },
    allPassed(validateResult) {
      for(let result of validateResult) {
        if(!result) {
          return false
        }
      }
      return true
    },
    disable(query) {
      document.querySelector(query).setAttribute('disabled', true)
    },
    enable(query) {
      document.querySelector(query).removeAttribute('disabled')
    }
  }

  let visit = [
    {
        'name': "Hoàng Thành Thăng Long", 
        'img': "https://cdn02.static-adayroi.com/0/2019/09/10/1568099002089_4146890.png",
        'hashtag':"#hoangthanhthanglong, #checkin, #history",
        'content': "Là khu di tích lịch sử của kinh thành Thăng Long xưa, bắt đầu từ thời kì tiền Thăng Long (thế kỷ VII) qua thời Đinh – Tiền Lê, được phát triển mạnh dưới thời Lý, Trần, Lê và thành Hà Nội dưới triều Nguyễn.",
        'like': "0",
        'address': "19C Hoàng Diệu, Điện Bàn, Ba Đình, Hà Nội",
        'time': "8h-17h",
    },
    {
        'name': "Văn Miếu - Quốc Tử Giám", 
        'img': "https://farm8.staticflickr.com/7816/44613628460_6d7cab1057_b.jpg",
        'hashtag':"#vanmieu, #history",  
        'content': "Là quần thể di tích về trường đại học đầu tiên của nước ta, Văn Miếu không chỉ là di tích lịch sử văn hóa mà còn là nơi được rất nhiều sĩ tử, học trò tới đây để cầu may mắn trong thi cử, học hành.",
        'like': "0",
        'address': "58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội ",
        'time': "8h-18h",
    },
    {
        'name': "Nhà hát lớn Hà Nội",
        'img': "https://images.vov.vn/w600/uploaded/02okemd3hs/2016_07_23/1437495526_nha_hat_lon_ha_noi_anh_14_IUGO.jpg", 
        'hashtag':"#nhahatlon, #fun, #history, #checkin",   
        'content': "Một công trình kiến trúc tại thành phố Hà Nội, Việt Nam, phục vụ biểu diễn nghệ thuật",
        'like': "0",
        'address': "Số 01 Tràng Tiền, Phan Chu Trinh, Hoàn Kiếm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Royal City",
        'img': "https://cafefcdn.com/thumb_w/650/2016/royal-city-mega-1460530059324.jpg", 
        'hashtag':"#royalcity, #fun, #checkin",
        'content': "Được mệnh danh là một “thành phố châu Âu thu nhỏ”, nơi đáp ứng mọi nhu cầu của một cuộc sống hiện đại, tiện nghi. Khi bước chân đến đây, bạn sẽ được trải nghiệm những tiện ích 5 sao đẳng cấp theo tiêu chuẩn quốc tế",
        'like': "0",
        'address': "72 Nguyễn Trãi, phường Thượng Đình, quận Thanh Xuân, Hà Nội",
        'time': "9h-22h",
    },
    {
        'name': "Công viên nước Hồ Tây",
        'img': "https://dulichvietnam.com.vn/kinh-nghiem/wp-content/uploads/2019/05/kinh-nghiem-du-lich-cong-vien-nuoc-ho-tay-2.jpg",
        'hashtag':"#cvnhotay, #fun, #swim",
        'content': "Công viên nước Hồ Tây là một địa điểm vui chơi giải trí hấp dẫn tại Hà Nội và là một điểm đến lý tưởng trong những ngày hè nóng nực",
        'like': "0",
        'address': "614 Đ. Lạc Long Quân, Nhật Tân, Tây Hồ, Hà Nội",
        'time': "8h-19h",
    },
    {
        'name': "Keangnam", 
        'img': "https://upload.wikimedia.org/wikipedia/commons/4/43/LANDMARK72.jpg",
        'hashtag':"#keangnam, #fun, #checkin",
        'content': "Keangnam là tổ hợp công trình khép kín có diện tích lớn thứ 5 thế giới, toà nhà cao nhất Việt Nam từ năm 2010 cho đến tháng 2 năm 2018 và là công trình có diện tích sàn lớn nhất Việt Nam cho tới thời điểm hiện tại.",
        'like': "0",
        'address': "Khu E6, đường Phạm Hùng, phường Mễ Trì, quận Nam Từ Liêm, Hà Nội",
        'time': "8h-22h",
    },
    {
        'name': "Phố cổ Hà Nội", 
        'img': "https://baodansinh.mediacdn.vn/2019/9/1/pho-luong-van-can-4-15672771834702122926622.jpg",
        'hashtag':"#phocohanoi, #fun, #history, #checkin",
        'content': "Phố cổ Hà Nội là một khu đô thị ngoài thành Thăng Long ( tên Hà Nội xưa), đây là khu phố nổi tiếng với sự sầm uất, buôn bán giao thương trong nước với nhiều ngành nghề mà mỗi khu phố ở đây đặc trưng cho một ngành nghề riêng",
        'like': "0",
        'address': "Thuộc Quận Hoàn Kiếm gồm có 76 tuyến phố và 10 phường: Hàng Đào, Hàng Bạc, Hàng Buồm, Hàng Bồ, Hàng Bông, Hàng Gai, Hàng Mã, Đồng Xuân, Cửa Đông, Lý Thái Tổ",
        'time': "Cả ngày",
    },
    {
        'name': "Hồ Gươm", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-1.png",
        'hashtag':"#hoguom, #history, #checkin, #fun",
        'content': " Hồ Gươm là trái tim của Hà Nội. Đây không chỉ là nơi để mọi người thả hồn đi dạo, hóng mát mà còn gắn liền với người dân thủ đô về nhiều phương diện lịch sử văn hóa cũng như đi vào trong thơ ca",
        'like': "0",
        'address': "Nằm ở trung tâm thủ đô, được bao quanh bởi 3 con phố Hàng Khay – Lê Thái Tổ – Đinh Tiên Hoàng",
        'time': "Cả ngày",
    },
    {
        'name': "Phố Bia Tạ Hiện", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/pho-ta-hien-1.jpg",
        'hashtag':"#phobiatahien, #checkin",
        'content': "Nếu đã và đang sinh sống tại Hà Nội, bạn sẽ không còn xa lạ gì với thiên đường giải trí về đêm nổi tiếng bậc nhất – phố Tạ Hiện. Được xem là khu phố Tây duy nhất thủ đô, Tạ Hiện mang trong mình vẻ đẹp quyến rũ không chỉ người dân thủ đô mà với cả du khách nước ngoài",
        'like': "0",
        'address': "Tạ Hiện, Hàng Buồm, Hoàn Kiếm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Trill Pool – Bể bơi của Trill Group", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/05/trill-pool-e1529572718404.jpg",
        'hashtag':"trillgroup, #fun, #swim",
        'content': "Bể bơi của Trill là bể bơi ngoài trời, chỉ hoạt động vào mùa hè (từ tháng 5 đến tháng 10). Bể bơi được thiết kế phù hợp cho cả người lớn và trẻ nhỏ với bể dành riêng cho trẻ em. Hệ thống lọc nước hiện đại, đảm bảo an toàn vệ sinh. Huấn luyện viên, cứu hộ túc trực trong giờ mở cửa",
        'like': "0",
        'address': "Tòa nhà Hei Tower, 1 Ngụy Như Kon Tum, Nhân Chính, Thanh Xuân, Hà Nội",
        'time': "8h-23h",
    },
    {
        'name': "Hẻm bia Lost in Hongkong", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/02/dia-diem-di-choi-8-3-o-ha-noi-1.jpg",
        'hashtag':"#lostinhongkong, #fun, #checkin",
        'content': "Điều đặc biệt và gây chú ý nhất tại Hẻm bia Lost in Hongkong Hà Nội chính là cách trang trí, toàn bộ đồ dùng, đèn điện cho tới cách bày trí đều hiện lên hình ảnh của một Hongkong náo nhiệt. Nếu bạn tới đây là buổi tối khi phố đã lên đèn thì sẽ cảm nhận được điều đó một cách rõ ràng nhất",
        'like': "0",
        'address': "Số 2 Đào Duy Từ, Phường Hàng Buồm, Quận Hoàn Kiếm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Công viên Hòa Bình", 
        'img': "https://icdn.dantri.com.vn/k:39a4446f16/2015/11/27/8-3-1448585070996/bieu-tuong-hoa-binh-cua-ha-noi-dep-ngo-ngang-nhin-tu-tren-cao.PNG",
        'hashtag':"#congvienhoabinh, #fun",
        'content': "được xem là biểu tượng khát vọng vì hòa bình của Hà Nội",
        'like': "0",
        'address': "Đường Phạm Văn Đồng, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội",
        'time': "0h-17h",
    },
    {
        'name': "Hồ Tây", 
        'img': "https://hanoi1000.vn/wp-content/uploads/2019/09/ho-tay-ha-noi-thumbnail.jpg",
        'hashtag':"#hotay, #fun, #checkin",
        'content': "Hồ Tây là hồ nước tự nhiên lớn nhất trong nội thành Hà Nội, được ví như lá phổi xanh của thành phố, hồ Tây không chỉ đẹp bởi mặt nước mênh mông mà còn thơ mộng, biến ảo trong những sắc màu của hoa cỏ",
        'like': "0",
        'address': "Quận Tây Hồ, Hà Nội",    
        'time': "Cả ngày",
    },
    {
        'name': "Cầu Long Biên", 
        'img': "https://hanoi1000.vn/wp-content/uploads/2019/09/cau-long-bien.jpg",
        'hashtag':"#caulongbien, #checkin",
        'content': "Cầu Long Biên là cây cầu được gọi với danh xưng “chứng nhân lịch sử” của nước ta. Trải qua bao thăng trầm của thời gian cùng biến cố lịch sử, cây cầu vẫn hiên ngang và trở thành một trong những biểu tượng của Hà Nội",
        'like': "0",
        'address': "Cầu Long Biên, Ngọc Thụy, Long Biên, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Phố sách 19/12", 
        'img': "https://kenh14cdn.com/thumb_w/640/2017/photo1514457248453-1514457248456.jpg",
        'hashtag':"#phosach19/12, #fun, #checkin",
        'content': "Phố sách 19/12 là phố sách đầu tiên ở Hà Nội, địa điểm tập trung rất nhiều gian hàng của các nhà xuất bản cũng như những công ty sách có tên tuổi trong cả nước. Không chỉ hấp dẫn với bạt ngàn đầu sách hot, phố sách 19/12 cũng là địa điểm check-in độc đáo mới lạ được các bạn trẻ Hà Nội thích thú",
        'like': "0",
        'address': "Phố 19 Tháng 12, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
        'time': "8h-22h",
    },
    {
        'name': "Lotter Center – Tòa nhà cao thứ 2 Hà Nội", 
        'img': "https://www.usgboral.com/content/dam/USGBoral/Vietnam/Website/Images/inspiration/6.1.2%20-%C2%AC%20Archdaily.jpg",
        'hashtag':"#lottecenter, #fun",
        'content': "Lotte Center là tòa nhà chọc trời cao thứ 3 tại Việt Nam, cao thứ 2 Hà Nội và có phong cách kiến ​​trúc hiện đại lấy cảm hứng từ tà áo dài truyền thống của người Việt Nam",
        'like': "0",
        'address': "Số 54 Liễu Giai, Cống Vị, Ba Đình, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "IndoChina Plaza Hà Nội", 
        'img': "https://alphahousing.vn/wp-content/uploads/2019/07/indochina-plaza-2.jpg",
        'hashtag':"#iph, #fun",
        'content': "IPH là một trong những khu trung tâm thương mại nổi tiếng tại Hà thành, đây không chỉ là một địa điểm ăn chơi mua sắm dành cho các bạn trẻ, mà còn là nơi trải nghiệm không gian sống thoải mái cho các hộ gia đình",
        'like': "0",
        'address': "Số 241 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Aeon Mall Long Biên",
        'img': "https://aeonmall-long-bien-en.com/wp-content/uploads/2019/08/AEON-MALL-Binh-Tan-resize.jpg",
        'hashtag':"#aeonlongbien, #fun, #checkin",
        'content': "AEON Mall Long Biên là một trong những tổ hợp mua sắm, ẩm thực, giải trí có quy mô lớn nhất ở Hà Nội với phong cách phục vụ chuyên nghiệp của tập đoàn 250 năm tuổi AEON đến từ Nhật Bản",
        'like': "0",
        'address': "Số 27 đường Cổ Linh, Phường Long Biên, Quận Long Biên, Thành Phố Hà Nội",
        'time': "8h-22h",
    },
    {
        'name': "Chùa Quán Sứ", 
        'img': "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Pagode_Qu%C3%A1n_S%E1%BB%A9_%281%29.jpg/1200px-Pagode_Qu%C3%A1n_S%E1%BB%A9_%281%29.jpg",
        'hashtag':"#chuaquansu, #history",
        'content': "Chùa Quán Sứ là nơi diễn ra những sự kiện Phật giáo lớn của Việt Nam, đồng thời đây cũng là nơi lui tới của nhiều du khách nước ngoài khi có chuyến thăm tới Hà Nội. Điều đặc biệt hấp dẫn tại ngôi chùa này đó là có pho tượng của hòa thượng Thích Thanh Tứ được làm bằng sáp với hình dáng và kích cỡ giống y như người thật, chắc chắn sẽ khiến bạn vô cùng thích thú",
        'like': "0",
        'address': "Số 73 Quán Sứ, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
        'time': "6h-19h",
    },
    {
        'name': "Làng gốm Bát Tràng", 
        'img': "https://dulichvietnam.com.vn/data/image/bat-trang-2.jpg",
        'hashtag':"#langgombattrang, #fun",
        'content': "Bát Tràng là điểm đến không hề xa lạ đối với các bạn trẻ ưa thích nét văn hóa truyền thống của làng nghề gốm sứ Việt Nam, đến đây các bạn có thể trực tiếp ngắm nhìn các nghệ nhân làm ra những sản phẩm gốm đầy tinh tế hay được tự tay nặn những sản phẩm theo ý thích",
        'like': "0",
        'address': "Thuộc hai thôn gồm Bát Tràng và Giang Cao nằm ở tả ngạn sông Hồng, nay thuộc xã Bát Tràng, Huyện Gia Lâm, Hà Nội",
        'time': "8h-17h30",
    },
    {
        'name': "Chùa Hương", 
        'img': "https://upload.wikimedia.org/wikipedia/commons/5/57/Ch%C3%B9a_H%C6%B0%C6%A1ng.jpg",
        'hashtag':"#chuahuong, #fun",
        'content': "Chùa Hương là cách nói trong dân gian, trên thực tế chùa Hương hay Hương Sơn là cả một quần thể văn hóa - tôn giáo Việt Nam, gồm hàng chục ngôi chùa thờ Phật, vài ngôi đền thờ thần, các ngôi đình, thờ tín ngưỡng nông nghiệp",
        'like': "0",
        'address': "Hương Sơn, Mỹ Đức, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Công viên Thủ Lệ", 
        'img': "https://giadinh.mediacdn.vn/thumb_w/640/2019/5/14/vuon-thu-18-15578108991341390255689.jpg",
        'hashtag':"#cvthule, #fun",
        'content': "Công viên Thủ Lệ không chỉ là điểm đến thư giãn yêu thích của nhiều người dịp cuối tuần mà còn là một sở thú lớn với nhiều loài động vật đa dạng để trẻ nhỏ tha hồ khám phá",
        'like': "0",
        'address': "Đường Bưởi, Thủ Lệ, Ba Đình, Hà Nội",
        'time': "7h-18h",
    },
    {
        'name': "Đền Ngọc Sơn", 
        'img': "https://hanoimoi.com.vn/Uploads/vdco/2017/8/28/denNgocson.jpg",
        'hashtag':"#denngocson, #fun",
        'content': "Nằm trên đảo Ngọc trong lòng hồ Hoàn Kiếm, quần thể di tích đền Ngọc Sơn không chỉ sở hữu kiến trúc độc đáo mà còn là biểu tượng văn hóa tâm linh nổi tiếng của Hà Nội",
        'like': "0",
        'address': "Đinh Tiên Hoàng, Hàng Trống, Hoàn Kiếm, Hà Nội ",
        'time': "8h-18h",
    },
    {
        'name': "TTTM The Garden Shoping Center", 
        'img': "https://naby.com.vn/wp-content/uploads/2019/08/TheGarden-ShoppingMall7.jpg",
        'hashtag':"#thegarden, #fun, #checkin",
        'content': "Nằm trên đường Mễ Trì, trung tâm thương mại The Garden là một khu dịch vụ khá hoàn thiện, đáp ứng nhu cầu mua sắm cho cư dân chung cư The Sun HH1 Mễ Trì cũng như Hà Nội",
        'like': "0",
        'address': "TTTM The Garden, khu đô thị The Manor, đường Mễ Trì, phường Mỹ Đình 1 quận, Nam Từ Liêm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Hanoi Creative City", 
        'img': "https://kenh14cdn.com/thumb_w/640/534992cb49/2015/09/02/ava4-c1e55.jpg",
        'hashtag':"#hanoicreativecity, #fun",
        'content': "Hiện nay, Hanoi Creative City đang là địa điểm vui chơi “hot” nhất ở Hà Nội. Với 20 tầng nhà lớn cùng các hoạt động thú vị, sáng tạo khác nhau ở mỗi tầng, tạo điểm độc đáo cho Creative City, nên đã thu hút được rất nhiều các bạn trẻ",
        'like': "0",
        'address': "Tòa nhà Hanoi Creative City, 1 Lương Yên, Bạch Đằng, Hai Bà Trưng, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Sân vận động Mỹ Đình", 
        'img': "https://www.coninco.com.vn/sites/default/files/28.%20SV%C4%90%20M%E1%BB%B9%20%C4%91%C3%ACnh1.jpg",
        'hashtag':"#svdmydinh, #fun",
        'content': "Sân vận động Quốc gia Mỹ Đình là sân vận động quốc gia Việt Nam lớn thứ hai Việt Nam (sau sân vận động Cần Thơ). Nơi đây diễn ra những trận đấu lớn, thu hút hàng nghìn cổ động viên nước nhà",
        'like': "0",
        'address': "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Phố ẩm thực Hàng Buồm", 
        'img': "https://dulichvietnam.com.vn/data/image/0hang/Anh-4-Jessica%20Wildering.PNG",
        'hashtag':"#phohangbuom, #eat",
        'content': "Phố Hàng Buồm là một trong 36 phố cổ nổi tiếng của Hà Nội. Nơi đây không chỉ đông vui, nhộn nhịp mỗi dịp cuối tuần, mà còn là một con phố ẩm thực làm nao nức khách du lịch mỗi khi đến thăm mảnh đất Hà Thành này",
        'like': "0",
        'address': "Hàng Buồm, Hoàn Kiếm, Hà Nội",
        'time': "19h-23h30",
    },
    {
        'name': "Rạp chiếu phim Quốc Gia", 
        'img': "https://chieuphimquocgia.com.vn/Content/Images/uploaded/Gioi%20thieu/16641193303_c1419d4dd3_k.jpg",
        'hashtag':"#rapchieuphimquocgia, #fun",
        'content': "Nằm tại vị trí trung tâm trên 2 mặt phố chính là Phố Láng Hạ và Thái Hà, tòa nhà Trung tâm Chiếu phim Quốc gia được thiết kế hiện đại, khu để xe rộng rãi, giao thông thuận tiện. Đây là một địa chỉ quen thuộc và yêu mến đối với những người yêu điện ảnh Thủ đô và cả nước",
        'like': "0",
        'address': "87 Láng Hạ – Ba Đình – Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Công viên Thống Nhất", 
        'img': "https://khuvuichoi.com/wp-content/uploads/2019/05/cong-vien-thong-nhat-e1507286231140.jpg",
        'hashtag':"#cvthongnhat, #fun",
        'content': "Công viên Thống Nhất là một trong những công viên lớn ở Hà Nội, có Hồ Bảy Mẫu nằm ở trung tâm, là lựa chọn lý tưởng cho du khách muốn thư giãn, vui chơi hay tham gia các hoạt động ngoài trời",
        'like': "0",
        'address': "354A Đường Lê Duẩn, Phương Liên, Đống Đa, Hà Nội",
        'time': "6h-22h",
    },
    {
        'name': "Ice Coffee",
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/07/ice-coffee-1.jpg",
        'hashtag':"#icecoffee, #fun, #checkin",
        'content': "Quán cà phê băng Ice Coffeee Hà Nội chính là quán cafe băng lạnh đầu tiên tại Hà Nội được mở trên mặt đường Đại Cồ Việt. Theo hai bạn chủ quán cho biết thì mô hình này đã có ở trong Sài Gòn được 3 năm nay và rất thành công, được đông đảo giới trẻ yêu thích. Chính vì thế, hai bạn quyết định đưa mô hình này ra Hà Nội với mong muốn tạo nên một không gian mát lạnh ngay giữa lòng thủ đô đang thời kỳ nắng nóng đỉnh điểm",
        'like': "0",
        'address': "Số 59 Đại Cồ Việt, Quận Hai Bà Trưng, Hà Nội",
        'time': "9h-23h",
    },
    {
        'name': "Sen Tây Hồ",
        'img': "https://images.foody.vn/res/g1/155/prof/s576x330/foody-upload-api-foody-mobile-fgfgfg-gif-180907160129.jpg",
        'hashtag':"#sentayho, #eat",
        'content': "Nhắc đến Buffet chắc chắn chuỗi hệ thống nhà hàng sen Tây Hồ là cái tên được nhiều người nhắc đến nhất vì đây là chuỗi nhà hàng ẩm thực Buffet đầu tiên tại Việt Nam. Sen Tây Hồ đã không ngừng phát triển để đáp ứng được nhu cầu ngày càng cao của khách hàng",
        'like': "0",
        'address': "Số 614 Đ. Lạc Long Quân, Nhật Tân, Tây Hồ, Hà Nội",
        'time': "11h-14h15, 18h-21h15",
    },
    {
        'name': "Bảo tàng Hồ Chí Minh", 
        'img': "https://www.hancorp.com.vn/wp-content/uploads/2019/04/baotanghochiminh.jpg",
        'hashtag':"#baotanghcm, #fun",
        'content': "Bảo tàng Hồ Chí Minh thuộc loại lớn nhất Việt Nam, có tổng diện tích lên đến 18.000 m2, trưng bày khoảng 12 vạn hiện vật liên quan đến cuộc đời và sự nghiệp của Người",
        'like': "0",
        'address': "19 Ngọc Hà, Đội Cấn, Ba Đình, Hà Nội",
        'time': "8h-12h, 14h-16h30",
    },
    {
        'name': "Tranquil Cafe",
        'img': "https://i.imgur.com/c58D5Tf.jpg",
        'hashtag':"#traquilcafe, #checkin",
        'content': "Tranquil là một trong số những địa điểm dành được sự chú ý nhiều nhất, không chỉ bởi không gian độc đáo, mà còn mang lại một “văn hóa khác biệt” không nơi nào có được",
        'like': "0",
        'address': "15B Trần Hưng Đạo, Hoàn Kiếm, Hoàn Kiếm, Hà Nội",
        'time': "8h-22h",
    },
    {
        'name': "Nola Cafe", 
        'img': "https://images.foody.vn/res/g1/8932/prof/s576x330/foody-mobile-nola-jpg-464-636177625637104310.jpg",
        'hashtag':"#nolacafe, #checkin",
        'content': "Nola cafe nằm trên gác 2 của của con phố cổ Hà Nội và mang trong mình những thú vị nho nhỏ rất Hà Nội, mang lại điều bất ngờ cho những ai lần đầu ghé qua đây",
        'like': "0",
        'address': "89 Phố Mã Mây, Hàng Buồm, Hoàn Kiếm, Hà Nội",
        'time': "10h-23h",
    },
    {
        'name': "Rand Moroc & Coffee", 
        'img': "https://amoarchitect.com/wp-content/uploads/2016/02/Rand-Moca-003.jpg",
        'hashtag':"#randmoroc, #checkin",
        'content': "Rand Moroc & Coffee là quán cà phê mang vẻ đẹp của một phong cách retro đơn giản. Với tông màu chủ đạo là trắng sữa, nó mang lại sự thoải mái cho bất cứ ai tới thưởng thức không gian và đồ uống ở đây",
        'like': "0",
        'address': "2B Trần Thánh Tông, Phạm Đình Hổ, Hai Bà Trưng, Hà Nội",
        'time': "9h-22h",
    },
    {
        'name': "Adapter Workspace & Coffee", 
        'img': "https://images.foody.vn/res/g32/315927/s/foody-adapter-workspace-coffee-315927-799-636186021906720807.jpg",
        'hashtag':"#adapterworkspace, ##checkin",
        'content': "Adapter Workspace & Coffee là quán cà phê container đầu tiên ở Hà Nội. Ngoài cấu tạo đặc biệt thì Adapter Workspace & Coffee còn có không gian rộng rãi, thoáng mát, chắc chắn là địa điểm lý tưởng cho những ai muốn trốn nóng ngày hè",
        'like': "0",
        'address': "Số 41 Yên Lãng, Trung Liệt, Đống Đa, Hà Nội",
        'time': "7h30-22h30",
    },
    {
        'name': "Vincom Nguyễn Chí Thanh", 
        'img': "https://fs.vieportal.net/Files/25EB1FC1EB614CDE8742E90669E76EC8/image=jpeg/20eac2d700114dc397416472fef35cf6/_AY22535%20mota.jpg",
        'hashtag':"#vincom, #fun, #checkin",
        'content': "Tọa lạc trên phố Nguyễn Chí Thanh, con đường 'đẹp nhất Việt Nam' với những thiết kế mới vô cùng độc đáo và lạ mắt, Vincom Center Nguyễn Chí Thanh là một trong những địa điểm vui chơi, giải trí hàng đầu Hà Nội",
        'like': "0",
        'address': "54A Nguyễn Chí Thanh, Láng Thượng, Đống Đa, Hà Nội",
        'time': "9h30-22h",
    },
    {
        'name': "Chùa Trấn Quốc", 
        'img': "https://baodansinh.mediacdn.vn/zoom/480_300/Images/2019/03/29/chua-tran-quoc-lot-top-10-chua-dep-nhat-the-gioi1553833144.jpg",
        'hashtag':"#chuatranquoc, #history",
        'content': "Nằm ở phía đông Hồ Tây, chùa Trấn Quốc với tuổi đời hơn 1500 năm là ngôi chùa cổ và linh thiêng bậc nhất Hà Nội. Từng là trung tâm Phật giáo của Thăng Long dưới thời Lý – Trần, chùa Trấn Quốc giờ đây trở thành điểm đến tâm linh hấp dẫn của thủ đô, thu hút rất đông du khách tới thăm quan và lễ bái mỗi năm",
        'like': "0",
        'address': "Đ.Thanh Niên, Yên Phụ, Tây Hồ, Hà Nội",
        'time': "8h-16h",
    },
    {
        'name': "Bể bơi 4 mùa Trần Hưng Đạo",
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/05/be-boi-tran-hung-dao-e1529572459223.jpg",
        'hashtag':"#beboi4mua, #fun, #swim",
        'content': "Là một trong những bể bơi ở hà Nội trong nhà đầu tiên được xây dựng hiện đại theo tiêu chuẩn Châu Âu, công nghệ lọc hiện đại, liên tục giúp nước trong bể luôn được giữ gìn trong sạch và đảm bảo sức khỏe cho người bơi. Hơn nữa, tại đây cũng có các khu vực bơi dành cho trẻ em được thiết kế riêng biệt và đảm bảo an toàn cho các bé",
        'like': "0",
        'address': "số 4, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
        'time': "7h-21h",
    },
    {
        'name': "Nhà tù Hỏa Lò",
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/nha-tu-hoa-lo.jpg",
        'hashtag':"#hoalo, #history",
        'content': "Nhà tù Hỏa Lò, hay còn gọi là ngục Hỏa Lò, xưa có tên tiếng Pháp là Maison Centrale, có nghĩa là đề lao trung ương, còn tên tiếng việt là Ngục thất Hà Nội, là một nhà tù cũ nằm trên phố Hỏa Lò, quận Hoàn Kiếm, Hà Nội",
        'like': "0",
        'address': "1 Hoả Lò, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
        'time': "8h-17h",
    },
    {
        'name': "Chùa Một Cột",
        'img': "https://upload.wikimedia.org/wikipedia/commons/d/d7/ChuaMotCot2.JPG",
        'hashtag':"#chuamotcot, #history",
        'content': "Chùa Một Cột không chỉ là ngôi chùa có kiến trúc nghệ thuật độc nhất ở Việt Nam cũng như châu Á, mà chùa còn là điểm đến tâm linh, biểu tượng văn hóa ngàn năm của Hà Nội",
        'like': "0",
        'address': "Đội Cấn, Ba Đình, Hà Nội",
        'time': "7h-18h",
    },
    {
        'name': "Tháp nước Hàng Đậu", 
        'img': "https://upload.wikimedia.org/wikipedia/commons/4/4d/Th%C3%A1p_n%C6%B0%E1%BB%9Bc_ph%E1%BB%91_H%C3%A0ng_%C4%90%E1%BA%ADu%2C_H%C3%A0_N%E1%BB%99i.jpg",
        'hashtag':"#thapnuoc, #history",
        'content': "Tháp nước Hàng Đậu là một trong những hiện vật lâu đời còn sót lại ở Thủ đô. Đây được coi là một tháp nước cổ xưa nhất và để lại nhiều dấu ấn trong lòng người Hà Nội.",
        'like': "0",
        'address': "Bốt Hàng Đậu, Quán Thánh, Hoàn Kiếm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Hàm Cá Mập", 
        'img': "https://kenh14cdn.com/2019/12/30/c2b-1577724885607623330763.jpg",
        'hashtag':"#hamcamap, #fun, #checkin",
        'content': "Nằm ở vị trí gần như đắc địa nhất Thủ đô, tòa nhà 6 tầng “Hàm cá mập” có góc nhìn bao quát cả Hồ Gươm tại địa chỉ số 1-7 đường Đinh Tiên Hoàng (quận  Hoàn Kiếm, Hà Nội), biến nơi đây trở thành địa điểm kinh doanh đắt đỏ nhất chốn Hà thành",
        'like': "0",
        'address': "Số 7 Đinh Tiên Hoàng, Hàng Trống, Hoàn Kiếm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Phở Gánh", 
        'img': "https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/01_2020/pho-hang-chieu.jpg",
        'hashtag':"#phoganh, #eat, #nightlife",
        'content': "Ăn phở lúc nửa đêm, vừa trải nghiệm một nét văn hoá ẩm thực lạ lẫm, vừa ngắm cảnh Hà Nội về đêm, thử ngay đi còn gì?",
        'like': "0",
        'address': "Số 4 Hàng Mã, Hàng Đào, Hoàn Kiếm, Hà Nội",
        'time': "3h30-7h30",
    },
    {
        'name': "Con đường gốm sứ", 
        'img': "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2020/wpxlcdjwi/2019_08_15/09_dxhy.jpg",
        'hashtag':"#conduonggomsu, #checkin",
        'content': "Con đường gốm sứ ven sông Hồng xuất phát từ ý tưởng của họa sĩ, nhà báo Nguyễn Thu Thủy là một công trình nghệ thuật trong chương trình chào đón đại lễ 1000 năm Thăng Long [4] của nhân dân thủ đô Hà Nội. Công trình này đã nhận được giải thưởng Bùi Xuân Phái vì tình yêu Hà Nội năm 2008 và Tổ chức Guinness thế giới đã công nhận đây là bức tranh gốm dài nhất thế giới (dài xấp xỉ 3,85 km) - đạt kỷ lục Guinness",
        'like': "0",
        'address': "Số 11 Hàng Vôi, Lý Thái Tổ, Hoàn Kiếm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Phố đường tàu Hà Nội", 
        'img': "https://readtoolead.com/wp-content/uploads/2019/10/Hanoi-train-street-cafe.jpg",
        'hashtag':"#hnstreettrain, #checkin",
        'content': "Đường ray tàu hỏa tuổi đời hơn trăm năm chạy xuyên qua lòng phố cổ Hà Nội thời gian gần đây trở thành điểm du lịch hấp dẫn đối với du khách, nhất là người nước ngoài. Việc ngồi hàng quán sát đường tàu, ngắm nhìn cuộc sống người dân địa phương, dù tiềm ẩn nguy hiểm nhưng vẫn khiến nhiều du khách tò mò muốn trải nghiệm",
        'like': "0",
        'address': "Số 5 Trần Phú, Hàng Bông, Hoàn Kiếm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Công viên Lê Nin", 
        'img': "https://didauchoigi.com/wp-content/uploads/2018/11/congvienleninhan.jpg",
        'hashtag':"#cvlenin, #fun",
        'content': "Trong lòng thủ đô Hà Nội thân thương, Công viên Lênin như một điểm đến trang trọng, gần gũi cho tất cả mọi người. Nơi đây hấp dẫn nhiều người không chỉ bởi một vị trí đắc địa, không gian xanh tuyệt vời mà còn bởi nơi đây đã ghi dấu ấn về một thời kỳ lịch sử hùng tráng của dân tộc Việt Nam",
        'like': "0",
        'address': "Số 28A Điện Biên Phủ, Điện Bàn, Ba Đình, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Baara land",
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/07/baara-land-ha-noi5.jpg",
        'hashtag':"#baara, #fun, #swim",
        'content': "Được ví như Tuần Châu trên cạn, Baara Land Hà Nội là một tổ hợp vui chơi giải trí và nghỉ dưỡng hàng đầu của miền Bắc. Bởi thế nơi đây sẽ  là điểm đến hoàn hảo cho bạn và người thân vào những ngày cuối tuần đặc biệt là những ngày nghỉ lễ",
        'like': "0",
        'address': "Thôn Đa Phúc, Quốc Oai, Hà Nội",
        'time': "8h30-19h",
    },
    {
        'name': "Làng văn hóa các dân tộc Việt Nam", 
        'img': "https://file.alotrip.com/photo/z4test/du-lich-lang-van-hoa-cac-dan-toc-viet-nam-474.jpeg",
        'hashtag':"#dantocvn, #history",
        'content': "Việt Nam, đất nước con người với 54 dân tộc anh em, mỗi dân tộc lại mang một nét văn hóa, truyền thống riêng. Nhằm mục đích bảo tồn các bản sắc cũng như tạo điều kiện cho du khách đến tìm hiểu, làng văn hóa các dân tộc Việt Nam là mái nhà chung để lưu giữ sự độc đáo trong đời sống, phong tục, tập quán của các dân tộc",
        'like': "0",
        'address': "Đồng Mô, Sơn Tây, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Chợ đêm Đồng Xuân", 
        'img': "https://vtv1.mediacdn.vn/zoom/700_438/2014/dong-xuan-market-1418291301582.jpg",
        'hashtag':"#dongxuan, #fun, #eat",
        'content': "Chợ đêm Đồng Xuân chính thức đi vào hoạt động từ năm 2003 với mục tiêu trở thành điểm văn hóa du lịch kết hợp mua sắm sản phẩm thủ công truyền thống và ẩm thực. Chợ là nơi mua bán sầm uất với sự tham gia của gần 4.000 gian hàng",
        'like': "0",
        'address': "Chợ Đồng Xuân, Đồng Xuân, Hoàn Kiếm, Hà Nội",
        'time': "8h-20h",
    },
    {
        'name': "Bảo tàng Mỹ thuật Việt Nam", 
        'img': "https://vnfam.vn/static/media/anh-truoc-mat-bao-tang.c767f73c.jpg",
        'hashtag':"#baotangmythuat, #history",
        'content': "Bảo tàng Mỹ thuật Việt Nam được đánh giá là một trong những bảo tàng có vị trí quan trọng nhất trong việc lưu giữ và phát huy kho tàng di sản văn hoá nghệ thuật của cộng đồng các dân tộc Việt Nam. Thành lập ngày 24 tháng 6 năm 1966, sứ mệnh của Bảo tàng là nghiên cứu, sưu tầm, kiểm kê, bảo quản, tu sửa, phục chế, trưng bày, giáo dục, truyền thông và phát huy giá trị các tài liệu, hiện vật, các tác phẩm mỹ thuật tiêu biểu của nước nhà tới công chúng trong và ngoài nước",
        'like': "0",
        'address': "66 Phố Nguyễn Thái Học, Điện Bàn, Ba Đình, Hà Nội",
        'time': "8h30-17h",
    },
    {
        'name': "Phố sách Đinh Lễ", 
        'img': "https://www.vietnamtours247.com/wp-content/uploads/2020/02/5E9EC641-BD1B-42DC-A07A-1F4BB131EC2B.jpeg",
        'hashtag':"#phosachdinhle, #fun, #checkin",
        'content': "Phố sách Đinh Lễ được mệnh danh là kho sách của Hà thành, nơi các bạn có thể tìm được những cuốn đã không còn được tái bản. Nếu ai có niềm đam mê với sách, chắc chắn bạn không nên bỏ lỡ nơi đây",
        'like': "0",
        'address': "Phố Đinh Lễ, Hoàn Kiếm, Hà Nội",
        'time': "8h-22h",
    },
    {
        'name': "Lăng Bác Hồ", 
        'img': "https://nguoikesu.com/images/wiki/lang-bac-ho/423076365c6d95884716b47216721888.jpg",
        'hashtag':"#langbac, #history",
        'content': "Lăng Chủ tịch Hồ Chí Minh (hay lăng Bác) là một trong những công trình nổi tiếng không những có giá trị văn hoá lịch sử mà còn thu hút rất đông du khách tới thăm quan và tỏ lòng ngưỡng mộ tới vị cha già của dân tộc Việt Nam",
        'like': "0",
        'address': "Số 2 Hùng Vương, Điện Bàn, Ba Đình, Hà Nội",
        'time': "7h30-11h",
    },
    {
        'name': "Vincom Center Phạm Ngọc Thạch",
        'img': "https://fs.vieportal.net/Files/25EB1FC1EB614CDE8742E90669E76EC8/image=jpeg/cd85412bc85940e38b1f5ea3b4de27fe/_AY22608.jpg",
        'hashtag':"#vincom, #fun, checkin",
        'content': "Vincom Center Phạm Ngọc Thạch là trung tâm thương mại thứ 6 của Vincom tại Hà Nội, tọa lạc ngay ngã tư trung tâm quận Đống Đa. Tòa nhà được thiết kế độc đáo với những mảng màu sắc rực rỡ lôi cuốn. Chiếc thang cuốn được bố trí bên ngoài tòa nhà trông khá lạ mắt và ấn tượng",
        'like': "0",
        'address': "Số 2 Phạm Ngọc Thạch, Trung Tự, Đống Đa, Hà Nội",
        'time': "10h-21h",
    },
    {
        'name': "Vườn hoa bãi đá sông Hồng",
        'img': "https://icdn.dantri.com.vn/thumb_w/640/2016/anh-1-1479515318630.jpg",
        'hashtag':"#baidasonghong, #checkin",
        'content': "Đến Vườn hoa bãi đá sông hồng ngay trong lòng Thủ đô, bạn sẽ được tận hưởng không gian thanh bình với đủ loại sắc màu của hoa những hàng lau trắng muốt trải dài ven sông. Nơi đây sẽ là địa điểm không thể bỏ qua khi bạn và gia đình muốn tham quan và chụp ảnh",
        'like': "0",
        'address': "Ngõ 264 Âu Cơ, Nhật Tân, Tây Hồ, Hà Nội",
        'time': "7h-21h",
    },
    {
        'name': "Công viên Bách Thảo", 
        'img': "https://media.giadinhmoi.vn/files/danggiang/2018/03/12/lich-mo-cua-gia-ve-cong-vien-bach-thao-ha-noi-moi-nhat-1105.jpg",
        'hashtag':"#cvbachthao, #fun",
        'content': "Vườn bách thảo Hà Nội hay Công viên Bách Thảo là một công viên cây xanh nằm ở phía tây bắc thủ đô Hà Nội, được thành lập từ những năm đầu người Pháp đặt chân đến Việt Nam trong cuộc xâm lăng đô hộ và thuộc địa. Hiện nay vườn được ví như lá phổi xanh của Hà Nội, nơi những người yêu thiên nhiên được đắm mình trong màu xanh cây lá và những âm thanh của rừng, với những cây cổ thụ lớn bằng vòng tay mấy người ôm là chứng nhân của nhiều biến cố trong lịch sử thủ đô",
        'like': "0",
        'address': "3 Hoàng Hoa Thám, Ngọc Hồ, Ba Đình, Hà Nội",
        'time': "6h-21h",
    },
    {
        'name': "Công viên Cầu Giấy", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/09/Cong-vien-Cau-Giay-1-e1505889806491.jpg",
        'hashtag':"#cvcaugiay, #fun",
        'content': "Sở hữu 3 điều đặc biệt so với những công viên khác ở Hà Nội: đẹp nhất, an toàn và miễn phí vé vào cửa, công viên Cầu Giấy giờ đây đã trở thành một trong những địa chỉ vui chơi quen thuộc của trẻ em cũng như nhiều người dân thủ đô",
        'like': "0",
        'address': "Phố Duy Tân, KDT Mới, Cầu Giấy, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Bảo tàng Phòng không – Không quân", 
        'img': "http://btlsqsvn.org.vn/Portals/0/News/Gioi%20thieu/2016-BTPKKQ.JPG",
        'hashtag':"#baotangpkkq, #history",
        'content': "Bảo tàng được xây dựng mới vào năm 2004, khánh thành ngày 28/8/2007, là nơi lưu giữ những hình ảnh, tư liệu, hiện vật minh chứng cho quá trình ra đời, xây dựng, chiến đấu, trưởng thành và chiến thắng của Bộ đội PK-KQ Việt Nam",
        'like': "0",
        'address': "173C Trường Chinh, Khương Mai, Thanh Xuân, Hà Nội",
        'time': "8h-11h, 13h-16h",
    },
    {
        'name': "Bảo tàng Hà Nội", 
        'img': "http://motorbikeshanoi.com/wp-content/uploads/2019/09/B%E1%BA%A3o-t%C3%A0ng-H%C3%A0-N%E1%BB%99i.jpg",
        'hashtag':"#baotanghanoi, #history",
        'content': "Được thành lập từ năm 1982, nên số lượng hiện vật của bảo tàng lên tới hàng chục ngàn, trong đó riêng kho cổ vật quý hiếm đã chiếm tới hơn 7 ngàn. Bộ sưu tập của bảo tàng bao gồm đồ đá, đồ đồng, gốm sứ các thời nhà Lý, Trần, Lê, Nguyễn, gốm sứ của Trung Quốc, Nhật Bản",
        'like': "0",
        'address': "Phạm Hùng, Mễ Trì, Nam Từ Liêm, Hà Nội",
        'time': "8h-11h30, 13h30-17h",
    },
    {
        'name': "Chùa Thầy", 
        'img': "http://imgs.vietnamnet.vn/Images/2012/05/23/11/20120523110902_chuathay1.jpg",
        'hashtag':"#chuathay, #history",
        'content': "Chùa Thầy còn gọi là chùa Cả hay Thiên Phúc Tự, tọa lạc dưới chân núi Sài (núi Thầy) thuộc địa phận xã Sài Sơn, huyện Quốc Oai, thành phố Hà Nội. Chùa từ lâu đã là một điểm du lịch tâm linh hấp dẫn du khách thập phương bởi phong cảnh hữu tình, hòa hợp với thiên nhiên",
        'like': "0",
        'address': "Sài Sơn, Quốc Oai, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Công viên hoa hồng", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/04/cong-vien-hoa-hong-rose-park-2.jpeg",
        'hashtag':"#cvhoahong, #fun",
        'content': "Công viên hoa hồng Rose Park là một công viên hoa hồng đầu tiên ở Việt Nam với điểm nhấn là vườn hoa hồng trải dài trên diện tích 5ha cùng với mê cung hồng lộc nổi bật, độc đáo. Đây là một địa điểm du lịch gần Hà Nội hiện đang hấp dẫn lượng lớn du khách đặc biệt là các bạn trẻ yêu thích tư duy khám phá vượt mê cung và những tín đồ “sống ảo” đến đắm mình với không gian mơ mộng, xanh ngát",
        'like': "0",
        'address': "Khu sinh, Long Biên, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Bảo tàng Lịch Sử Quốc Gia",  
        'img': "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/B%E1%BA%A3o_t%C3%A0ng_L%E1%BB%8Bch_s%E1%BB%AD_Vi%E1%BB%87t_Nam.jpg/1200px-B%E1%BA%A3o_t%C3%A0ng_L%E1%BB%8Bch_s%E1%BB%AD_Vi%E1%BB%87t_Nam.jpg",
        'hashtag':"#baotanglichsuhn, #history",
        'content': "Bảo tàng Lịch Sử Việt Nam là nơi lưu giữ những hiện vật, phản ánh các nền văn hóa, lịch sử dựng nước và giữ nước của người Việt Nam từ thuở ban đầu khai sáng đến ngày ra đời nước Việt Nam Dân chủ Cộng hòa. Viện bảo tàng có phong cách kiến trúc Đông Dương, mở cửa đón khách cả tuần, trừ thứ hai",
        'like': "0",
        'address': "216 Đường Trần Quang Khải, Tràng Tiền, Hoàn Kiếm, Hà Nội",
        'time': "8h-12h, 13h30-17h",
    },
    {
        'name': "Làng cổ Đường Lâm", 
        'img': "https://dulichvietnam.com.vn/kinh-nghiem/wp-content/uploads/2019/07/kinh-nghiem-du-lich-lang-co-duong-lam-2.jpg",
        'hashtag':"#langcoduonglam, #fun, #history",
        'content': "Làng cổ Đường Lâm chính là lựa chọn hoàn hảo nếu bạn đang tìm kiếm một vùng quê thanh tịnh để nghỉ ngơi sau những bộn bề của cuộc sống. Nơi đây còn lưu giữ rất nhiều ngôi nhà đậm chất kiến trúc xưa với những con đường gạch, những bức tường đá ong cùng những nét văn hóa của làng quê vùng Bắc Bộ",
        'like': "0",
        'address': "Đường Lâm, Sơn Tây, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Hồ Trúc Bạch", 
        'img': "https://lh3.googleusercontent.com/proxy/Zj1nwhNCNPe14akBgVxYQbSpa8zvl2MPf3Zj5Kcz5M4BWXQHeIQoeAOQCevd7F2buL8yIbcyXZMsitnFsiHVmfqKfjcj-T24Wp-v-vKe3P79R-vWt7szzH2j",
        'hashtag':"#hotrucbach, #fun, #checkin",
        'content': "Hồ Trúc Bạch tuy không nổi tiếng bằng hồ Gươm và hồ Tây nhưng so với các hồ ở Hà Nội, Trúc Bạch là một hồ lớn và có một lịch sử lâu đời và nếu xếp theo thứ hạng thì Trúc Bạch là 1 trong 3 hồ nổi tiếng nhất của Hà Nội",
        'like': "0",
        'address': "Thuộc quận Ba Đình, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Xí Nghiệp Cafe", 
        'img': "https://maybanhang.net/wp-content/uploads/2014/09/1187209_486870021408171_1331346170_n.jpg",
        'hashtag':"#xinghiepcafe, #checkin",
        'content': "Nằm trong một con ngõ nhỏ tĩnh lặng thuộc khu đô thị Văn Quán, Hà Đông, Hà Nội, vẻ thâm trầm, một chút hoài cổ của quán cà phê Xí nghiệp khiến nhiều thực khách ấn tượng",
        'like': "0",
        'address': "60A-TT11, Văn Quán, P. Văn Quán, Hà Đông, Hà Nội",
        'time': "8h-22h",
    },
    {
        'name': "Beta Cineplex", 
        'img': "https://cafebiz.cafebizcdn.vn/thumb_w/600/2017/beta-cine-7-1500697699341-crop-1500697706825.jpg",
        'hashtag':"#beta, #fun",
        'content': "Thành lập vào tháng 12 năm 2014, Beta Cineplex là rạp phim tư nhân duy nhất và đầu tiên sở hữu hệ thống phòng chiếu phim đạt chuẩn Hollywood",
        'like': "0",
        'address': "Tầng hầm B1, tòa nhà Golden West, Số 2 Lê Văn Thiêm, Nhân Chính, Thanh Xuân, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Đài quan sát Sky Walk tòa nhà Lotte Center", 
        'img': "https://i-dulich.vnecdn.net/2019/05/29/dai-quan-sat-lotte-center-ha-n-6272-8554-1559105164.png",
        'hashtag':"#skywalk, #checkin",
        'content': "Đài quan sát Sky Walk - Lotte Center Hà Nội mang lại một cái nhìn tổng thể về Hà Nội khi quan sát toàn cảnh 360 độ. Từ độ cao 272m, Sky Walk sẽ mở ra hình ảnh toàn thành phố nằm ngay dưới chân bạn đem tới cảm giác trải nghiệm mới mẻ và thích thú. Sky Walk được thiết kế cả ở hai phía của tòa nhà, chính vì thế bạn có thể nhìn thấy Hà Nội theo đúng 04 phương 08 hướng",
        'like': "0",
        'address': "Tầng 65, tầng cao nhất của tòa Lotte Center",
        'time': "9h-23h",
    },
    {
        'name': "Cầu Nhật Tân", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/09/he-thong-chieu-sang.jpg",
        'hashtag':"#caunhattan, #checkin",
        'content': "Cầu Nhật Tân ghi danh là một trong 7 cây cầu huyết mạch của Thủ đô Hà Nội. Đây là cây cầu thép dây văng lớn nhất Việt Nam, được coi như một biểu tượng mới của Hà Nội",
        'like': "0",
        'address': "Cầu Nhật Tân, Phú Thượng, Đông Anh, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Đền Bạch Mã", 
        'img': "https://tadiha.com/pictures/picfullsizes/2019/05/02/qwu1556782902.jpg",
        'hashtag':"#denbachma, #history",
        'content': "Hà Nội không chỉ thu hút du khách với những trung tâm vui chơi thương mại hay những quán cafe sống ảo siêu xinh mà còn hấp dẫn bởi những nơi cho tâm hồn an nhiên, thanh tịnh như đền Bạch Mã mà bạn có thể ghé đến thăm quan",
        'like': "0",
        'address': "76 Hàng Buồm, Hoàn Kiếm, Hà Nội",
        'time': "9h-17h30",
    },
    {
        'name': "O’learys Bà Triệu", 
        'img': "https://channel.vcmedia.vn/k:prupload/166/2015/01/img20150122163454465/sport-bar-olearys-viet-nam-dia-diem-moi-cho-tin-do-am-thuc.jpg",
        'hashtag':"#Olearys, $eat",
        'content': "Nhà hàng là điểm đến quen thuộc của người hâm mộ thể thao, đặc biệt là bóng đá. Để phục vụ nhu cầu của khách hàng, nơi đây có đến 42 tivi LCD khắp mọi góc",
        'like': "0",
        'address': "38 Bà Triệu, Tràng Tiền, Hoàn Kiếm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Cột cờ Hà Nội", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/08/cot-co-ha-noi-vntrip.jpg",
        'hashtag':"#cotcohanoi, #history, #checkin",
        'content': "Trong số những danh lam thắng cảnh của thủ đô Hà Nội, Cột cờ Hà Nội không chỉ là một trong những di tích lịch sử lâu đời mà còn là điểm du lịch không thể bỏ qua trong chuyến hành trình khám phá lịch sử đất Hà Thành",
        'like': "0",
        'address': "28A Điện Biên Phủ, Điện Bàn, Ba Đình, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Camelia Lounge", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/08/quan-bar-ha-noi4-1.jpg",
        'hashtag':"#camelialounge, #club, #nightlife",
        'content': "Camelia Lounge đích thực là một quán bar sang chảnh bậc nhất Hà Thành bởi phong cách kiến trúc mang đậm hơi thở Phương Tây. Bạn chắc chắn sẽ bị choáng ngợp bởi sự xoa hoa của những đồ nội thất, sự kết hợp tinh tế của những chiếc đèn chùm lộng lẫy và những mảng tường trầm ấm của gỗ",
        'like': "0",
        'address': "44 Lý Thường Kiệt, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
        'time': "9h-23h",
    },
    {
        'name': "Thảo Nguyên Hoa", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/thao-nguyen-hoa-long-bien-1.jpg",
        'hashtag':"#thaonguyenhoa, #checkin",
        'content': "Chỉ mất 20 phút di chuyển từ trung tâm Hà Nội theo hướng đi Long Biên bạn sẽ đến một thảo nguyên với hàng chục các loài hoa được giới trẻ yêu thích như hoa thạch thảo, cúc họa mi, hoa súng tím, hồng tố nữ, hoa ngũ sắc. Đó chính là thảo nguyên hoa Long Biên với không gian phim trường mới mẻ, cảnh sắc độc đáo đang thu hút rất nhiều các bạn trẻ Hà Thành tới đây chụp hình, ngắm cảnh dịp cuối tuần",
        'like': "0",
        'address': "Thạch Cầu, Long Biên, Hà Nội",
        'time': "7h-18h",
    },
    {
        'name': "Nhà Sàn Bác Hồ", 
        'img': "http://baodulich.net.vn/data/data/Hoangha/Nha%20san%201.jpg",
        'hashtag':"#nhasanbacho, #history",
        'content': "Không chỉ là một công trình lịch sử, văn hóa giàu ý nghĩa, giờ đây nhà sàn Bác Hồ đã trở thành một địa điểm du lịch Hà Nội thu hút rất đông du khách đến tham quan. Cùng ghé thăm ngôi nhà sàn giản dị trong Phủ Chủ tịch, nơi Bác Hồ đã sống và làm việc lâu nhất trong cuộc đời hoạt động cách mạng của mình nhé",
        'like': "0",
        'address': "Số 1 Hoàng Hoa Thám, Ngọc Hồ, Ba Đình, Hà Nội",
        'time': "07h30–11h, 13h30–16h",
    },
    {
        'name': "1900 Le Theater", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/04/bar-1900-le-theatre-2-768x445.jpg",
        'hashtag':"#1900, #club, #nightlife",
        'content': "Nhắc đến những quán bar đình đám ở Hà Nội thì không thể bỏ qua 1900 – quán bar mà bất kỳ bạn trẻ Hà Thành nào cũng biết đến. Nằm ngay trung tâm của con phố Tạ Hiện sầm uất, 1900 nổi tiếng là quán bar sôi động với những bản nhạc remix cực đỉnh với giá cả khá rẻ so với các quán bar khác",
        'like': "0",
        'address': "8B Tạ Hiện, Hàng Buồm, Hoàn Kiếm, Hà Nội",
        'time': "20h30-3h",
    },
    {
        'name': "Taboo Lounge & Bar", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/08/quan-bar-ha-noi12-1.jpg",
        'hashtag':"#taboolounge, #club, #nightlife",
        'content': "Sở hữu một vị trí tuyệt đẹp khi nằm cạnh ngay hồ Tây rộng lớn. Quán bar Hà Nội này có thiết kế rất riêng biệt và hiện đại, mang dáng dấp giống như một chiếc du thuyền sang trọng đậu bên sóng nước hồ Tây lộng gió",
        'like': "0",
        'address': "2 Thụy Khuê, Thuỵ Khuê, Tây Hồ, Hà Nội",
        'time': "10h-23h30",
    },
    {
        'name': "Tượng đài Lý Thái Tổ", 
        'img': "https://upload.wikimedia.org/wikipedia/commons/c/c5/Hanoi%2C_Vietnam_%2812041420115%29.jpg",
        'hashtag':"#lythaito, #history",
        'content': "Tượng đài Vua Lý Thái Tổ được đặt tại vườn hoa Lý Thái Tổ, đường Đinh Tiên Hoàng, quận Hoàn Kiếm, trung tâm thủ đô Hà Nội. Tượng đài là một công trình kiến trúc văn hoá đẹp, nhằm tôn vinh Vua Lý Thái Tổ (974 - 1028), người có công khai sáng kinh thành Thăng Long",
        'like': "0",
        'address': "12 Phố Lê Lai, Lý Thái Tổ, Hoàn Kiếm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Vinpearl Land Times City", 
        'img': "https://www.vietfuntravel.com.vn/image/data/Ha-Noi/thuy-cung-times-city/Kinh-nghiem-di-choi-thuy-cung-time-city-01.JPG",
        'hashtag':"#timescity, #fun, #checkin",
        'content': "Khu vui chơi giải trí Vinpearl Land Times City là sự kết hợp hoàn hảo giữa Thủy cung Vinpearl Aquarium hiện đại lớn nhất Việt Nam cùng Thiên đường vui chơi dành cho cả gia đình sẽ đem đến cho khách hàng những trải nghiệm thú vị và trọn vẹn nhất",
        'like': "0",
        'address': "458 Phố Minh Khai, Vĩnh Phú, Hai Bà Trưng, Hà Nội",
        'time': "8h-21h",
    },
    {
        'name': "Thư viện Bfree", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/thu-vien-ha-noi-bfree.jpg",
        'hashtag':"#bfree, #fun, #checkin",
        'content': "Bfree – Book For Free được thành lập với mục đích truyền bá và nâng cao văn hóa đọc cho giới trẻ. Mặc dù quy mô ở đây chưa lớn nhưng thư viện có đầy đủ các thể loại sách như: văn học, lịch sử, nhân văn, kinh tế, chính trị, pháp luật,… với khoảng trên 1000 đầu sách cho các bạn chọn lựa.",
        'like': "0",
        'address': "Số 4N5, ngõ 40, đường Xuân La, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Bể bơi vô cực Season Avenue đầu tiên tại Việt Nam",
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/05/season-h%C3%A0-%C4%91%C3%B4ng-1-e1527149677813.jpg",
        'hashtag':"#seasonavenue, #swim, #fun",
        'content': "Được xây dựng tại tầng 5 Season Avenue Hà Đông, bể bơi vô cực này không chỉ mang lại cho bạn những trải nghiệm bơi lội độc đáo mà còn là nơi ngắm cảnh vô cùng tuyệt vời. Từ đây, bạn có thể thưởng thức trọn vẹn vẻ đẹp toàn cảnh thành phố từ trên cao",
        'like': "0",
        'address': "CT09, Cổ Ngựa, khu đô thị Mỗ Lao, quận Hà Đông, TP Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Level Fitness – Bể bơi trên cao lớn nhất Hà Nội", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/05/b%E1%BB%83-level--e1527149807989.jpg",
        'hashtag':"#levelfitness, #swim, #fun",
        'content': "Bể bơi 5 sao ở Level được đầu tư công nghệ Heat Pump – Công nghệ làm nóng của Ý tiêu chuẩn hàng đầu Châu Âu. Bạn không bao giờ phải lo lắng vì mùa đông luôn được tắm nước nóng cùng với các tiện nghi đẳng cấp khác",
        'like': "0",
        'address': "Tràng An Comples, số 1 Phùng Chí Kiên, Cầu Giấy, Hà Nội",
        'time': "5h30-21h",
    },
    {
        'name': "Bể bơi Hapulico", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/05/be-boi-hapulico-e1527231948342.jpg",
        'hashtag':"#hapulico, #swim, #fun",
        'content': "Không thể không nhắc đến Hapulico trong danh sách các bể bơi ở Hà Nội. Hapulico là bể bơi nước mặn đầu tiên có mặt tại Hà Nội. Sở hữu quy mô lớn gồm 3 bể bơi dành cho trẻ em và người lớn trên tổng diện tích 1000m2. Hapulico có hệ thống lọc nước tuần hoàn, không sử dụng bất kỳ chất tẩy rửa độc hại làm ảnh hưởng đến sức khoẻ, làn da người bơi",
        'like': "0",
        'address': "Số 83 Vũ Trọng Phụng, Thanh Xuân, Hà Nội",
        'time': "5h30-21h",
    },
    {
        'name': "Bể bơi Keangnam (Garden Pool)", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/05/garden-pool-e1529572521818.jpg",
        'hashtag':"#keangnam, #fun, #swim",
        'content': "Tọa lạc ngay giữa khu vườn ngoài trời, bao quanh bởi 3 tòa tháp của Keangnam Landmark 72, bể bơi này là một trong những bể bơi ở Hà Nội được đầu tư xây dựng đẹp nhất, có diện tích 600m2 tích hợp bể bơi người lớn, bể vầy cho trẻ em và bể sục. Bạn sẽ có cảm giác như đang ở châu Âu với khung cảnh nhà chọc trời hiện đại trong tầm mắt cùng với không gian xanh mát của vườn cây ngoài trời",
        'like': "0",
        'address': "Toà nhà Keangnam Lanmark 72, đường Phạm Hùng, Hà Nội",
        'time': "8h-17h",
    },
    {
        'name': "Bánh Mỳ Dân Tổ", 
        'img': "https://cdn.tgdd.vn/Files/2019/09/10/1196802/banh-mi-dan-to-co-gi-hot-ma-phai-xep-hang-tu-3h-sang-de-mua-201909101616483640.jpg",
        'hashtag':"#banhmydanto, #nightlife, #eat",
        'content': "Được gọi là bánh mì dân tổ vì ban đầu hàng bánh mì này chủ yếu phục vụ cho các thanh niên chơi khuya về hoặc những người làm nghề buôn bán thường phải thức khuya dậy sớm, bởi vậy mà có cái tên dân tổ và cũng thường bán vào thời điểm rất muộn",
        'like': "0",
        'address': "32 Trần Nhật Duật, Đồng Xuân, Hoàn Kiếm, Hà Nội",
        'time': "3h-6h",
    },
    {
        'name': "Tòa soạn báo Hà Nội mới", 
        'img': "http://kenh14cdn.com/thumb_w/660/2018/12/15/364419533589133892130523851333925804524175360n-15448264738322013492400-crop-15448264794411697886038.jpg",
        'hashtag':"#hanoimoi, $checkin",
        'content': "Toà soạn báo Hà Nội mới không phải là một nơi có không gian diện tích rộng lớn hay được decor cầu kỳ, chỉ đơn giản là một góc tường của ngôi nhà cổ, với cánh cửa sổ xanh nhưng lại toát lên một phong cách chiết trung thu hút mọi ánh nhìn",
        'like': "0",
        'address': "Số 44 Lê Thái Tổ, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "Phim trường Smiley Ville", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/phim-truong-smilley-ville-1-1.jpg",
        'hashtag':"#smileyville, #checkin",
        'content': "Smiley Ville – phim trường với thiết kế tái hiện lại không gian miền đông nước Anh giữa lòng Hà Nội chính là địa điểm chụp ảnh vô cùng quyến rũ, thỏa mãn mơ ước một lần được đặt chân tới Châu Âu xinh đẹp của những bạn trẻ và các cặp đôi",
        'like': "0",
        'address': "Đông Hội, Mai Lâm, Đông Anh, Hà Nội",
        'time': "8h30-18h",
    },
    {
        'name': "Trill Group", 
        'img': "http://azbooking.vn/view/admin/Themes/kcfinder/upload/images/tintuc/dia-diem-hen-do-voi-nguoi-yeu/trillgroup-dia-diem-hen-ho-san-may-cho-cac-cap-doi-o-ha-noi-azbooking(1).jpg",
        'hashtag':"#trillgroup, #fun, #checkin",
        'content': "Ngay khi đặt chân tới Trill Group, bạn sẽ cảm nhận như mình đang ở một thế giới hoàn toàn khác. Không gian rộng rãi, sang trọng và thoáng mát mang hơi hướng thiết kế urban pha trộn rustic và một chút điểm nhấn bohochic, giông giống mấy gác mái “tính hay” ở khu Soha, New York City",
        'like': "0",
        'address': "1 Ngụy Như Kon Tum, Nhân Chính, Thanh Xuân, Hà Nội",
        'time': "8h-23h",
    },
    {
        'name': "Bảo tàng Thiên nhiên Việt Nam",  
        'img': "https://media.tieudungplus.vn/media/uploaded/16/2016/02/29/lich-mo-cua-tham-quan-mien-phi-tai-bao-tang-thien-nhien-vn-tieudungplus.JPG",
        'hashtag':"#baotangthiennhienvn, #history",
        'content': "Bảo tàng thiên nhiên Việt Nam tái hiện toàn cảnh bức tranh thiên nhiên Việt Nam sự sống của các loài động thực vật qua 3,6 tỷ năm. Đây là điểm đến lý tưởng cho những bạn ưa thích khám phá thiên nhiên, muốn tìm hiểu thế giới, nơi cả một kho tàng kiến thức đang chờ đón bạn",
        'like': "0",
        'address': "18 Hoàng Quốc Việt, Nghĩa Đô, Cầu Giấy, Hà Nội",
        'time': "8h30-13h30, 13h30-16h30",
    },
    {
        'name': "Platform", 
        'img': "https://i-ngoisao.vnecdn.net/2017/08/28/cf8-9350-1503925721.jpg",
        'hashtag':"#platform, #checkin",
        'content': "Sở hữu một vị trí đắc địa khi tọa lạc ngay trên mặt tiền của đường Quảng Bá, Quận Tây Hồ, Platform giống như một biệt thự có diện tích rộng rãi và thoáng mát",
        'like': "0",
        'address': "Đường Quảng Bá, Quận Tây Hồ, Hà Nội",
        'time': "7h-23h",
    },
    {
        'name': "Kem Tràng Tiền", 
        'img': "https://images.foody.vn/res/g1/6975/prof/s576x330/foody-upload-api-foody-mobile-seatalk_img_15855770-200331094403.jpg",
        'hashtag':"#kemtrangtien, #eat, #checkin",
        'content': "Kem Tràng Tiền là một hãng kem nổi tiếng đã có từ năm 1958 ở Hà Nội, Việt Nam.[1] Sở dĩ kem có tên là Tràng Tiền là bởi vì kem được bán và sản xuất ở con phố Tràng Tiền, lần đầu tiên là tại số nhà 35 Tràng Tiền, quận Hoàn Kiếm. Kem Tràng Tiền đã trở thành một thương hiệu kem rất quen thuộc với người Hà Nội. Kem có nhiều hương vị khác nhau như: sô-cô-la, vani, cốm, sữa dừa,... Kem có vị thơm, ngon, mát, là một món ăn ưa thích của người Việt Nam và người nước ngoài nói chung và người Hà Nội nói riêng",
        'like': "0",
        'address': "35 Tràng Tiền, Hoàn Kiếm, Hà Nội",
        'time': "7h30-23h",
    },
    {
        'name': "The Hanoi House Coffee", 
        'img': "https://i1-dulich.vnecdn.net/2015/08/26/hanoi-house-co-gai-3525-1440560909.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=yz-kFOLcCpU-KrsxOccM4A",
        'hashtag':"#thehanoihousecoffee, #checkin",
        'content': "Chỉ là một quán nhỏ nằm khuất trong con hẻm trên đường Lý Quốc Sư, nhưng Hanoi House lại trở thành một điểm đến quen thuộc đối với khách phương xa. Người ta truyền tai nhau rằng một khi ra Hà Nội nhất định phải tìm đến đây, chụp một bức ảnh với dòng chữ Hanoi màu xanh in trên bức tường hơi nhám ngay lối vào quán, xem như đó là bằng chứng bạn đã đặt chân vào phố cổ",
        'like': "0",
        'address': "47A Lý Quốc Sư, Hàng Trống, Hoàn Kiếm, Hà Nội",
        'time': "9h-23h",
    },
    {
        'name': "The Rooftop",
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/08/quan-bar-ha-noi4.jpg",
        'hashtag':"#therooftop, #eat, #checkin",
        'content': "The Rooftop là một trong những quán bar Hà Nội nổi tiếng nhất hiện nay. Sở hữu một vị trí rất ấn tượng – tầng 19 của tòa nhà Pacific Place, từ The Rooftop có thể ngắm nhìn toàn cảnh thủ đô hoa lệ",
        'like': "0",
        'address': "83B Lý Thường Kiệt, Cửa Nam, Hoàn Kiếm, Hà Nội",
        'time': "9h-23h30",
    },
    {
        'name': "Phố Đinh Tiên Hoàng", 
        'img': "https://toplist.vn/images/800px/pho-dinh-tien-hoang-298626.jpg",
        'hashtag':"#phodinhtienhoang, #eat, #checkin",
        'content': "Phố Đinh Tiên Hoàng nằm ở phía Đông hồ Hoàn Kiếm được nhiều nhà sử học, nhà văn coi là một trong vài địa điểm hội tụ khí thiêng ngàn năm của Thăng Long – Hà Nội",
        'like': "0",
        'address': "Nằm ở phần bờ đông và bắc của hồ Hoàn Kiếm, quận Hoàn Kiếm",
        'time': "Cả ngày",
    },
    {
        'name': "Đường tình yêu Phan Đình Phùng", 
        'img': "https://toplist.vn/images/800px/duong-phan-dinh-phung-298630.jpg",
        'hashtag':"#phandinhphung, #checkon",
        'content': "Đây là con đường có vỉa hè rộng nhất nhì Hà Nội với những cây sấu cổ thụ. Điều đặc biệt là có một đoạn phố có hai hàng cây trên cùng một vỉa hè. Mùa lá sấu rụng đem lại nhiều ký ức đẹp về một thời cắp sách đến trường",
        'like': "0",
        'address': "Dài khoảng 1,5 km, đường Phan Đình Phùng kéo dài từ phố Mai Xuân Thưởng đến phố Hàng Cót",
        'time': "Cả ngày",
    },
    {
        'name': "All Day Coffee", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/11/45163708_328128541072041_6712613041277501440_n.jpg",
        'hashtag':"#alldaycoffee, #checkin",
        'content': "Nằm ngay giữa thủ đô Hà Nội, All Day Coffee rất giỏi khiến bạn “mê mẩn” vì những góc quá châu Âu. Từ nhưng “thánh mê sống ảo” tới những người nổi tiếng như Trần Quang Đại, Rose Nguyễn, Thu Anh … đã check-in và chụp cháy máy ở All Day Coffee rồi",
        'like': "0",
        'address': "37 Quang Trung, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
        'time': "7h-2h",
    },
    {
        'name': "Rùa’s house", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/02/dia-diem-di-choi-8-3-o-ha-noi-5.jpg",
        'hashtag':"#ruahouse, #checkin",
        'content': "Là một trong những homestay Hà Nội cực xinh xắn. Cách thiết kế tại Rùa’s House dựa theo phong cách của Sapa cổ, chính vì thế mà dù ở ngay giữa lòng Hà Nội bạn cũng có thể hít hà được chút không khí của vùng cao miền Bắc",
        'like': "0",
        'address': "Khu tập thể Giảng Võ, Ba Đình, Hà Nội",
        'time': "Cả ngày",
    },
    {
        'name': "AEON Mall Hà Đông", 
        'img': "https://youhomes.vn/uploads/images/news/1568790101-1.jpg",
        'hashtag':"#aeon, #fun, #checkin",
        'content': "Một trong những thánh địa ăn chơi mới toanh cho team Hà Thành chính là AEON Mall Hà Đông. Đây là một trong những khu trung tâm thương mại được đầu tư hiện đại, không gian rộng lớn cùng rất nhiều nhà hàng, khu vui chơi, ăn uống cùng hơn 40 ngàn thương hiệu nổi tiếng thế giới để bạn tha hồ mua sắm và khám phá",
        'like': "0",
        'address': "Tổ Dân Phố, Phố Hoàng Văn Thụ, Dương Nội, Hà Đông, Hà Nội",
        'time': "9h-22h",
    },
    {
        'name': "Lofita – Love At First Taste", 
        'img': "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/02/dia-diem-di-choi-valentine-o-ha-noi-1.jpg",
        'hashtag':"#lofita, #checkin",
        'content': "Là một trong những địa điểm ăn uống lý tưởng trong ngày Valentine Hà Nội vô cùng lý tưởng mà các cặp đôi không thể bỏ lỡ. Lofita là quán cafe và đồ ăn nhanh sở hữu không gian lãng mạn, hấp dẫn, có decor độc đáo, thu hút không ít các cặp đôi lựa chọn làm địa điểm hẹn hò",
        'like': "0",
        'address': "Số 2A Đường Hồ Tùng Mậu, Mai Dịch, Cầu Giấy, Hà Nội",
        'time': "8h-23h",
    },
    {
        'name': "Vincom Center Trần Duy Hưng", 
        'img': "https://kenh14cdn.com/thumb_w/660/2019/4/26/batch3-15562551504651659911298.jpg",
        'hashtag':"#vincom, #fun, #checkin",
        'content': "Vincom Center Trần Duy Hưng là trung tâm thương mại đầu tiên tại quận Cầu Giấy và là trung tâm thứ 10 của Vincom Retail tại thành phố Hà Nội",
        'like': "0",
        'address': "119 Trần Duy Hưng, Láng Thượng, Cầu Giấy, Hà Nội",
        'time': "9h30-22h",
    },
    {
        'name': "Đền Quán Thánh", 
        'img': "https://i.imgur.com/vpgWqqB.jpg",
        'hashtag':"#denquanthanh, #history",
        'content': "Thủ đô Hà Nội ngàn năm văn hiến từ lâu đã nổi tiếng với những danh lam thắng cảnh và những di tích văn hoá, lịch sử nổi tiếng. Trong số đó không thể không nhắc đến Đền Quán Thánh thuộc “Thăng Long tứ trấn”, một trong bốn ngôi đền linh thiêng bảo vệ cho mảnh đất Thăng Long kinh kỳ",
        'like': "0",
        'address': "Đ. Thanh Niên, Quán Thánh, Ba Đình, Hà Nội",
        'time': "8h-17h",
    },
    {
        'name': "Bún Ngan Bà Hằng (from mixi with love)", 
        'img': "https://images.foody.vn/res/g70/693326/prof/s576x330/foody-mobile-22045769_11798535521-134-636431573959949453.jpg",
        'hashtag':"#mixi, #ngonvl, #eat",
        'content': "Dm ngon vl các bạn ạ",
        'like': "0",
        'address': "Kiốt 3 Phố Nghĩa Tân, Khu tập thể Nghĩa Tân, Cầu Giấy, Hà Nội",
        'time': "7h-23h30",
    },
    ]