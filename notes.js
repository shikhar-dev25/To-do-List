const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
  let notes = document.querySelectorAll(".input-box");

  notes.forEach(nt => {
    nt.onkeyup = function() {
      updateStorage();
    };
  });
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "/to-do/images/bin.png";
  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);
  updateStorage();
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

notesContainer.addEventListener("keyup", function (e) {
  if (e.target.classList.contains("input-box")) {
    updateStorage();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && document.activeElement.classList.contains("input-box")) {
    document.execCommand("insertLineBreak");
    event.preventDefault();
    updateStorage();
  }
});

showNotes();
