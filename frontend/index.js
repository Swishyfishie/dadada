const BASE_URL = 'http://localhost:3000'

document.addEventListener("load", () => {
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
            <input type="text">
            <label for="calories">
            <input type="number">
            <input type="submit" value="Add Item" id="addItem">
        </form>
    `

    let addItem = document.querySelector("#addItem")
    addItem.addEventListener("click", postItem)
}