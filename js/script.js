var addBtn = document.getElementById("addBtn");
var bookmarkNameInput = document.getElementById("bookmarkName");
var urlLinkInput = document.getElementById("urlLink");
var tableBody = document.querySelector("table tbody");

var urlList = [];

if (localStorage.getItem("bookmarks") !== null) {
  urlList = JSON.parse(localStorage.getItem("bookmarks"));
  displayData();
}

addBtn.addEventListener("click", addURL);

function addURL() {
  var nameRegex = /.{3,}/;
  var urlRegex = /https?:\/\/.+/;

  if (!nameRegex.test(bookmarkNameInput.value)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Site Name",
      text: "Site name must be at least 3 characters long.",
    });
    return;
  }

  if (!urlRegex.test(urlLinkInput.value)) {
    Swal.fire({
      icon: "error",
      title: "Invalid URL",
      text: "Please enter a valid URL starting with http:// or https://",
    });
    return;
  }

  var detailsUrl = {
    name: bookmarkNameInput.value,
    url: urlLinkInput.value,
  };

  urlList.push(detailsUrl);
  localStorage.setItem("bookmarks", JSON.stringify(urlList));

  displayData();
  clearForm();
}

function clearForm() {
  bookmarkNameInput.value = "";
  urlLinkInput.value = "";
}

function displayData() {
  var cartoona = "";

  for (var i = 0; i < urlList.length; i++) {
    cartoona += `
      <tr>
        <td>${i + 1}</td>
        <td>${urlList[i].name}</td>
        <td>
          <a href="${
            urlList[i].url
          }" target="_blank" class="btn btn-success btn-md">
            <i class="fa-solid fa-eye pe-2"></i> Visit
          </a>
        </td>
        <td>
          <button onclick="deleteBookmark(${i})" class="btn btn-danger btn-md">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }

  tableBody.innerHTML = cartoona;
}

function deleteBookmark(index) {
  urlList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(urlList));
  displayData();
}
