const BASE_URL = 'http://localhost:3000'

window.addEventListener("load", () => {
    getItems()
})

function getItems(){
    clearAll()
    let items = document.querySelector(".items")
    items.innerHTML = ""
    fetch(BASE_URL+"/items")
    .then(res => res.json())
    .then(i => {
        i.map(item => {
            items.innerHTML += `
                <li data-id="${item.id}">${item.name} : ${item.calories}</li>
            `
        })
    })
}

function clearAll(){
    document.querySelector(".items").innerHTML = ""
}

function addItem(){
    
    let itemForm = document.querySelector(".item-form")

    itemForm.innerHTML = `
        <form>
            <label for="name">
            <input type="text" id="itemText">
            <label for="calories">
            <input type="number" id="calorieNumber">
            <input type="submit" value="Add Item" id="submitItem">
        </form>
    `
// debugger
    let submitItem = document.querySelector("#submitItem")
    console.log(submitItem)
    submitItem.addEventListener("click", postItem)
}

function postItem(){

    const item = {
        name: document.querySelector("#itemText").value,
        calories: document.querySelector("#calorieNumber").value
    }

    
}