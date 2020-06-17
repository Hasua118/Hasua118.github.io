// show my curent toDo 
let myList = getListFromLocal()
for (let item of myList) {
    let li = document.createElement("li");
    let toDo = item;
    let t = document.createTextNode(toDo);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);

}


// create close button for each list item 
let myNodeList = document.getElementsByTagName("li")
for (let i = 0; i < myNodeList.length; i++) {
    let span = document.createElement("span")
    let text = document.createTextNode("x")
    span.className = "close"
    span.appendChild(text)
    myNodeList[i].appendChild(span)
}

// close DOM onclick => hide the list-item 
let close = document.getElementsByClassName("close")
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement
        div.style.display = "none"
        let myList = getListFromLocal()

        myList.splice(i, 1)
        let myListString = JSON.stringify(myList)
        localStorage.setItem('list', myListString)
        console.log(localStorage)
    }
}

// add checked symbol to done-item 
let list = document.querySelector('ul')
list.addEventListener("click", function (addCheck) {
    if (addCheck.target.tagName === 'LI') {
        addCheck.target.classList.toggle("checked")
    }
})

// get list-items from local storage 
function getListFromLocal() {
    try {
        let listString = localStorage.getItem('list')
        console.log("list String", listString)
        let list = JSON.parse(listString || '')
        console.log("list", list)
        console.log(localStorage)
        return list || []
    } catch (err) {
        return []
    }
}

// check toDo exists in list 
// function itemExistsInList(list, inputValue){
//     return list.find(i => i == inputValue)
// }

// create a new item in toDoList 
let formAddNewToDo = document.querySelector(".header")
formAddNewToDo.onsubmit = function newElement() {
    let li = document.createElement("li")
    let inputValue = document.getElementById("myInput").value
    let t = document.createTextNode(inputValue)
    li.appendChild(t)
    console.log(li)
    if (inputValue === '') {
        alert("You must do something!!!")
    } else {
        let myList = getListFromLocal()
        document.getElementById("myUL").appendChild(li)
        myList.push(inputValue)
        let listString = JSON.stringify(myList)
        localStorage.setItem('list', listString)
        console.log(myList);
        console.log(localStorage)
    }
    document.getElementById("myInput").value = ""
}



const url = "http://cors-anywhere.herokuapp.com/";

const img = document.getElementById('img')
var object =[]
async function getAPI(){
    const response = await fetch("http://cors-anywhere.herokuapp.com/https://www.mangaeden.com/api/list/0/")
    const data = await response.json();
    let mangas = data.manga
    for(let item of mangas){
        if(item.im !=null){
            object.push(item)
        }
    }
    console.log("data",object)
   const image = await fetch("http://cors-anywhere.herokuapp.com/https://cdn.mangaeden.com/mangasimg/67/67b4dfbb8529aef48110479ec07fbfd2815b0b89abe52c63f83455e4.jpg")
}
getAPI()


