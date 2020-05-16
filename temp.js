window.onload = function(){
    firebase.firestore()
}

let formAddData = document.querySelector('.form-add-data')
formAddData.onsubmit = function (e) {
        e.preventDefault()

        let title = formAddData.title.value.trim()
        let image = formAddData.image.value
        let hashtag = formAddData.hashtag.value.trim()
        let content = formAddData.content.value.trim()
        let like = formAddData.like.value.trim()
        let address = formAddData.address.value.trim()

        addData(title, image, hashtag, content, like, address)
    },

addData = async function() {

        let data = {
            title: tile,
            image: image,
            hashtag: hashtag,
            content: content,
            like: like,
            address: address
        }
        await firebase.firestore()
            .collection('dataWhereToPlay')
            .add(data)

        let inputTitle = document.querySelector('.form-add-data input[name = "title"]')
        let inputImage = document.querySelector('.form-add-data input[name = "image"]')
        let inputHashtag = document.querySelector('.form-add-data input[name = "hashtag"]')
        let inputContent = document.querySelector('.form-add-data input[name = "content"]')
        let inputLike = document.querySelector('.form-add-data input[name = "like"]')
        let inputAddress = document.querySelector('.form-add-data input[name = "address"]')

        inputTitle.value = ''
        inputImage.value = ''
        inputHashtag.value = ''
        inputContent.value = ''
        inputLike.value = ''
        inputAddress.value = ''

    };
let formSearch= document.querySelector('.form-search')
formSearch.onsubmit= function(e){
    e.preventDefault()
}
let search = formSearch.search.value.trim()

searchData= async function(search){
    let currentEmail= firebase.auth().currentUser.email
}