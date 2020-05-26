// let dataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
function getCardFromLocal(){
  try {
    let cartString = localStorage.getItem('cart')
    let cart = JSON.parse(cartString || '')
    return cart || []
} catch (err) {
    return []
}
}
let dataFromLocalStorage = getCardFromLocal()
  
if(dataFromLocalStorage.length>0){
  console.log('chay r na', dataFromLocalStorage)
  var i = Math.floor(Math.random() * dataFromLocalStorage.length)
  let label = document.querySelector('.menu-place')
  let slider = document.querySelector('#slide-wrapper')
  let index = 0
  for(let img of dataFromLocalStorage){
      let x =''
      if(index == i){
          x = "checked"
      }
      let html =`<label for="slide-dot-${index}" >
      <img src="${img.image}" alt="" width="100" height="66.66px">
      </label>`
  
      let html0 = `<input id="slide-dot-${index}" type="radio" name="slides" ${x} onclick='changeRandomStatus()'>
      <div class="slide" style="background-image: url(${img.image})"></div>`
      
      slider.innerHTML += html0
      label.innerHTML += html
      index +=1
      
  }
  function changeRandomStatus(){
    let randomSlides = document.querySelectorAll('input')
    for (let a=0;a< randomSlides.length;a++){
      if (randomSlides[a].checked==true){
        
        document.querySelector('.tourNameInfo').innerHTML = `
  
        <div class="row tour-name">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h3>${dataFromLocalStorage[a].title}</h3>
          </div>
          
        </div>     
        <table class="table ">          
          <tbody>
            <tr>
              <td><strong>Địa điểm: </strong>${dataFromLocalStorage[a].title}</td>
              <td><strong>Địa chỉ: </strong>${dataFromLocalStorage[a].address}</td>
            </tr>
            <tr>
              <td><strong>Giờ mở cửa: </strong>${dataFromLocalStorage[a].time} </td>
              <td><strong>Số like: </strong>1000</td>
            </tr>
          </tbody>
        </table>        
        <div class="panel panel-default">
          <div class="panel-body">
                         
            ${dataFromLocalStorage[a].content}
             
          </div>
          
        </div>
        <button type="button" class="btn btn-primary btn-lg btn-reload" onclick = "location.reload()" >Reload</button>
      `
      }
      }
    }
  
  document.querySelector('.tourNameInfo').innerHTML = `
  
    <div class="row tour-name">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <h3>${dataFromLocalStorage[i].title}</h3>
      </div>
      
    </div>     
    <table class="table ">          
      <tbody>
        <tr>
          <td><strong>Địa điểm: </strong>${dataFromLocalStorage[i].title}</td>
          <td><strong>Địa chỉ: </strong>${dataFromLocalStorage[i].address}</td>
        </tr>
        <tr>
          <td><strong>Giờ mở cửa: </strong>${dataFromLocalStorage[i].time} </td>
          <td><strong>Số like: </strong>1000</td>
        </tr>
      </tbody>
    </table>        
    <div class="panel panel-default">
      <div class="panel-body">
                     
        ${dataFromLocalStorage[i].content}
         
      </div>
      
    </div>
    <button type="button" class="btn btn-primary btn-lg btn-reload" onclick = "location.reload()" >Reload</button>
  `
}