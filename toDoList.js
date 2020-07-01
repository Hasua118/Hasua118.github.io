window.onload = function () {

    if (localStorage.getItem("toDoList")) {
        let toDoList = getDataFromLocalStorage();
        // show to do    
        showToDoList(toDoList);
        createCloseButton();
        // bind event delete to do 
        deleteToDo(toDoList);
        // bind event for form add to do
        let formAddToDo = document.querySelector("#form-add-to-do");
        formAddToDo.onsubmit = function (e) {
            e.preventDefault();
            let content = formAddToDo.content.value;
            let id = generateRandomId();
            addToDo(content, id)
            // add to local 
            let toDo = {
                id: id,
                content: content,
                isCompleted: false,
                isChecked: false
            };
            toDoList.push(toDo)
            saveToLocalStorage(toDoList)
            toDoList = getDataFromLocalStorage()
        }

        //bind event checked to do
        checkToDo();

    } else {
        let toDoList1 = []
        // show to do    
        showToDoList(toDoList1);
        createCloseButton();
        // bind event delete to do 
        deleteToDo(toDoList1);
        // bind event for form add to do
        let formAddToDo = document.querySelector("#form-add-to-do");
        formAddToDo.onsubmit = function (e) {
            e.preventDefault();
            let content = formAddToDo.content.value;
            let id = generateRandomId();
            addToDo(content, id)
            // add to local 
            let toDo = {
                id: id,
                content: content,
                isCompleted: false,
                isChecked: false
            };
            toDoList1.push(toDo)
            saveToLocalStorage(toDoList1)
        }
        //bind event checked to do
        checkToDo();
    }

}

function saveToLocalStorage(toDoList) {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("toDoList"));
}

function showToDoList(toDoList) {
    let html = ''
    for (let toDo of toDoList) {
        if (toDo.isChecked == true && toDo.isCompleted == false) {
            html += `
            <li id = "${toDo.id}" class ="checked">
            ${toDo.content}
            </li>
        `
            document.querySelector("#to-do-list").innerHTML = html
        } else if (toDo.isCompleted == false) {
            html += `
            <li id = "${toDo.id}">
            ${toDo.content}
            </li>
        `
            document.querySelector("#to-do-list").innerHTML = html
        }

    }
}


function createCloseButton() {
    let toDoList = document.getElementsByTagName("li")
    for (let i = 0; i < toDoList.length; i++) {
        let html = '<span class="close">x</span>'
        toDoList[i].innerHTML += html
    }
}

function addToDo(content, id) {
    let toDoThings = document.querySelector("#to-do-list")
    let html = `
    <li id="${id}">
    ${content}
    </li>
    `
    if (content === '') {
        alert("You have input what you have to do !!!")
    } else {
        toDoThings.innerHTML += html
        createCloseButton();
        document.querySelector("#to-do-content").value = " "
    }

}

function deleteToDo(toDoList) {
    var close = document.querySelector("#to-do-list");
    close.addEventListener('click', e => {
        if (e.target.className === "close") {
            var div = e.target.parentElement
            div.style.display = "none"
            let id = div.id
            let foundIndex = toDoList.findIndex(function (item) {
                return item.id === id
            })
            toDoList[foundIndex].isCompleted = true;
            saveToLocalStorage(toDoList)
        }
    })
}

function checkToDo() {
    let list = document.querySelector('ul')
    list.addEventListener("click", e => {
        if (e.target.tagName === 'LI') {
            let toDoListNew = getDataFromLocalStorage()
            let foundIndex = toDoListNew.findIndex(item => {
                return item.id == e.target.id
            })
            if (e.target.className != "checked") {
                e.target.classList.toggle("checked")
                toDoListNew[foundIndex].isChecked = true

            } else {
                e.target.className = ""
                toDoListNew[foundIndex].isChecked = false
            }
 

            saveToLocalStorage(toDoListNew)
        }
    })
}

function generateRandomId() {
    return "todo-" + new Date().getTime();
}

