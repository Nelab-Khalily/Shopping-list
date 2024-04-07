// an empty array
let list = [];

// a function that gets the user input, validates it, creates a new list item, appends it to the list array, save to local storage, display it and at the end clears the inputs
function add() {
    event.preventDefault(); // prevent form default refresh
    console.log("Running add function");

    // get user input
    const itemInput = document.getElementById("item-input").value;
    const categorySelect = document.getElementById("category-select").value;

    // validate input byt the function that has been made
    if (!isValidated(itemInput, categorySelect)) {
        console.log("Invalid inputs");
        return;
    }

    // create new list item object and add the  values to it
    const newItem = {
        name: itemInput,
        category: categorySelect
    };

    // add new item object to list array
    list.push(newItem);

    // stringify and add the list to local storage
    localStorage.setItem('list', JSON.stringify(list));

    // display new list item on the browser using this function
    displayItem(newItem);

    // clear the input fields
    document.getElementById("item-input").value = "";
    document.getElementById("category-select").selectedIndex = 0;
};

// a function that validates inputs by taking the two items, input and category that has been selected
function isValidated(itemInput, categorySelect) {
    console.log("Running isValidated function");
    if (itemInput == "") {
        document.getElementById("item-input").classList.remove("border-purple-400");
        document.getElementById("item-input").classList.add("border-red-500");
    } else {
        document.getElementById("item-input").classList.remove("border-red-500");
    }

    if (categorySelect == "") {
        document.getElementById("category-select").classList.remove("border-purple-400");
        document.getElementById("category-select").classList.add("border-red-500");
    } else {
        document.getElementById("category-select").classList.remove("border-red-500");
    }

    // return true if both inputs are valid (not empty), false otherwise
    return itemInput !== "" && categorySelect !== "";
}

// a function to display a list item
function displayItem(item) {
    // create list item element with its styles
    const listItem = document.createElement("li");
    listItem.classList.add("py-2", "flex", "items-center", "justify-between");
    listItem.innerHTML = `
        <span class="delete-item cursor-pointer">❌<span class="text-xl ml-3">${item.name}</span></span>
        <span class="bg-${getCategoryColor(item.category)}-200 rounded-md px-3">${item.category}</span>
        
    `;

    // append list item to list container
    document.getElementById("list-items").appendChild(listItem);

    // add an event listener to delete the item when ❌ is clicked the deleteItem function runsss
    listItem.querySelector(".delete-item").onclick = function(){
        deleteItem(item);
    };
}

// aunction to delete a list item from local storage and list array and front
function deleteItem(item) {
    console.log("Running deleteItem function");
    // remove item from list array by filtering it if that the selected item shouldnt exist in it 
    list = list.filter(listItem => listItem !== item);
    // we just update local storage
    localStorage.setItem('list', JSON.stringify(list));
    // remove item from front
    event.target.parentElement.remove();
}

// a function that gets the category color using switch which switches based on the category and returnes the color which is wayyy easier than conditions
function getCategoryColor(category) {
    switch(category) {
        case "Fruit":
            return "pink";
        case "Grain":
            return "yellow";
        case "Dairy":
            return "green";
        default:
            return "gray";
    };
};

// a function to load list items from local storage to the front
function loadListFromStorage() {
    const storedList = JSON.parse(localStorage.getItem('list'));
    if (storedList) {
        list = storedList;
        list.forEach(item => displayItem(item));
    }
}

// an event listener for adding a new item
document.getElementById("add-btn").onclick = add;

// load list items from local storage to the front
document.addEventListener("DOMContentLoaded", loadListFromStorage);
