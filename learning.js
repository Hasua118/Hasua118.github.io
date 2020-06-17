// let sandals = [
//   {
//     name: "Sandal 1",
//     price: 30000,
//     size: 37,
//     publisher: "Thắng Cute"
//   },

//   {
//     name: "Sandal 2",
//     price: 50000,
//     size: 40,
//     publisher: "Hà Cute"
//   }
// ];
// // JSON.stringify (mảng/object): chuyển mảng/ojbect --> string
// let jsonData = JSON.stringify(sandals);
// console.log(jsonData);
// localStorage.setItem("sandals", jsonData);

// // JSON.parse(chuỗi JSON): chuyển string -> mảng/object;
// let string = localStorage.getItem("sandals");
// let arr = JSON.parse(string);
// console.log(arr);


// let sandals = [
//   {
//     name: "Sandal 1",
//     price: 30,
//     size: 40,
//     publisher: "P1"
//   },
//   {
//     name: "Sandal 2",
//     price: 50,
//     size: 43,
//     publisher: "P2"
//   }
// ];

// localStorage.setItem("sandals", JSON.stringify(sandals));

// read
function showSandals() {
  // lấy từ localstorage: string
  let jsonData = localStorage.getItem("sandals");
  // convert string -> mảng
  let sandals = JSON.parse(jsonData);

  // hiển thị ra màn hình
  let html = `<ul>`;
  for (let sandal of sandals) {
    html += `
      <li>
        Name: <b>${sandal.name}</b><br>
        Price: <i>${sandal.price}</i><br>
        Size: <mark>${sandal.size}</mark><br>
        Publisher: <small>${sandal.publisher}</small>
      </li>
    `;
  }
  html += `</ul>`;
  document.getElementById("app").innerHTML = html;
}

function addSandal(sandal) {
  // lấy dữ liệu từ localStorage
  let sandals = JSON.parse(localStorage.getItem("sandals"));

  // thêm dữ liệu vào mảng
  sandals.push(sandal);

  // lưu lại vào trong localStorage
  localStorage.setItem("sandals", JSON.stringify(sandals));
}

function updateSandal(name, data){
  // lấy từ dữ liệu ra
  let sandals = JSON.parse(localStorage.getItem("sandals"));

  // dựa vào name lấy ra dép cần sửa
  let foundIndex = sandals.findIndex(function (item) {
    return item.name == name;
  });

  if(foundIndex >= 0) {
    // nếu tìm thấy --> sửa
    sandals[foundIndex] = data;
  } else {
    console.log("Not Found!");
  }

  // lưu nại
  localStorage.setItem("sandals", JSON.stringify(sandals));    
}

function deleteSandal(name){
   // lấy từ dữ liệu ra
   let sandals = JSON.parse(localStorage.getItem("sandals"));

   // dựa vào name lấy ra dép cần sửa
   let foundIndex = sandals.findIndex(function (item) {
     return item.name == name;
   });
 
   if(foundIndex >= 0) {
     // nếu tìm thấy --> xóa
     sandals.splice(foundIndex,1);
   } else {
     console.log("Not Found!");
   }
 
   // lưu lại
   localStorage.setItem("sandals", JSON.stringify(sandals));   
}



