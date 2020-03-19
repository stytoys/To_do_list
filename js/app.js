// Select the element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineTrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.lenght; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
};

// load items to the user's interface
function loadList(array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

// Clear the localStorage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

// Show todays date
const option = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", option);

// add to do function
function addToDo(toDo, id, done, trash) {
    if (trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
        <li class="item">
            <i class="far ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
        `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// Add an item to the list user the enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        // if the input isn't empty
        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            // add item to localstorage (this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Target the items created dynamically
list.addEventListener("click", function(event) {
    const element = event.target; // return the cliked element inside list
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    // add item to localstorage (this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
