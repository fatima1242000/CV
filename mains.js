let NAME = document.getElementById("NAME");
let OBJECTIVE = document.getElementById("OBJECTIVE");
let SKILLS = document.getElementById("SKILLS");
let TOOLS = document.getElementById("TOOLS");
let EXPERIANCE = document.getElementById("EXPERIANCE");
let EDUCATION = document.getElementById("EDUCATION");
let SAVE = document.getElementById("SAVE");
let GET = document.getElementById("GET");
let UPDATE = document.getElementById("UPDATE");
let DELETE = document.getElementById("DELETE");
let myWord = document.querySelector("#myWord ul");
let mood = "create";
let temp;
let word;

// creat product
let datapro; //create the array that save the persons data
let newpro = {};
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

SAVE.onclick = function () {
  newpro = {
    //the object the the persons
    NAME: NAME.value,
    OBJECTIVE: OBJECTIVE.value,
    SKILLS: SKILLS.value,
    TOOLS: TOOLS.value,
    EXPERIANCE: EXPERIANCE.value,
    EDUCATION: EDUCATION.value,
  };

  datapro.push(newpro);
  localStorage.setItem("product", JSON.stringify(datapro));

  clearData();
  showData();
};

if (mood == "create") {
  if (newpro.count > 1) {
    for (let i = 0; i < newpro.count; i++) {
      datapro.push(newpro);
    }
  } else {
    datapro.push(newpro);
  }
} else {
  datapro[temp] = newpro;
  mood = "creat";
  submit.innerHTML = "create";
  count.style.display = "block";
}

// save logicalstorage
localStorage.setItem("product", JSON.stringify(datapro));

//clear inputs
function clearData() {
  NAME.value = "";
  OBJECTIVE.value = "";
  SKILLS.value = "";
  TOOLS.value = "";
  EXPERIANCE.value = "";
  EDUCATION.value = "";
}

// read
function showData() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    datapro[i].NAME &&
      (table += `
    <tr>
        <td>${datapro[i].NAME}</td>
        <td>${datapro[i].OBJECTIVE}</td>
        <td>${datapro[i].SKILLS}</td>
        <td>${datapro[i].TOOLS}</td>
        <td>${datapro[i].EXPERIANCE}</td>
        <td>${datapro[i].EDUCATION}</td>
       
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `);
  }
  document.getElementById("tbody").innerHTML = table;
}

showData();
clearData();

//delete
function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}

//update
function updateData(i) {
  NAME.value = datapro[i].NAME;
  OBJECTIVE.value = datapro[i].OBJECTIVE;
  SKILLS.value = datapro[i].SKILLS;
  TOOLS.value = datapro[i].TOOLS;
  EXPERIANCE.value = datapro[i].EXPERIANCE;
  EDUCATION.value = datapro[i].EDUCATION;

  submit.innerHTML = "update";
  mood = "update";
  temp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//here you convert element to the doc file

function Export2Word(element, filename = "") {
  var preHtml =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  var postHtml = "</body></html>";
  var html = preHtml + document.getElementById(element).innerHTML + postHtml;

  var blob = new Blob(["\ufeff", html], {
    type: "application/msword",
  });

  // Specify link url
  var url =
    "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

  // Specify file name
  filename = filename ? filename + ".doc" : "document.doc";

  // Create download link element
  var downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = url;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }

  document.body.removeChild(downloadLink);
}

//here you will get data and append it to ul tag with the name of the section and vlue :
function wordData() {
  let word = "";
  //map method is built in method that convert the items inside the array to anything we need
  datapro.map((item, ind) => {
    for (let [key, val] of Object.entries(item)) {
      // if value is empty don't append in ul
      val != ""
        ? (word += `
    <li id='${key}-${ind}' style='list-style:none'>
      <h2 style='color:#444'>${key}</h2>
      <p>${val}</p>
    </li>
    `)
        : "";
    }
  });
  myWord.innerHTML = word;
}

//here you push object to local storage when download and create word file
DOWNLOAD.onclick = function () {
  let newpro = {
    //the object the the persons
    NAME: NAME.value,
    OBJECTIVE: OBJECTIVE.value,
    SKILLS: SKILLS.value,
    TOOLS: TOOLS.value,
    EXPERIANCE: EXPERIANCE.value,
    EDUCATION: EDUCATION.value,
  };

  datapro.push(newpro);
  localStorage.setItem("product", JSON.stringify(datapro));
  clearData();

  wordData();
  Export2Word("myWord");
  clearData();
  showData();
};
