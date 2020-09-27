const BASE_URL = 'http://localhost:3000'
document.querySelector("#addItem").addEventListener("click", addItem)

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
                <li data-id="${item.id}">${item.name} : ${item.calories}<a href="#" id="deleteItem">X</a></li>
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
    submitItem.addEventListener("click", postItem)

    
}

function postItem(){

    const item = {
        name: document.querySelector("#itemText").value,
        calories: document.querySelector("#calorieNumber").value
    }

    fetch(BASE_URL+"/items", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }
    })
    .then(res => res.json())
    .then(item => {
        let items = document.querySelector(".items")

        items.innerHTML += `
        <li data-id="${item.id}">${item.name} : ${item.calories} <a href="#" id="deleteItem">X</a></li>
        `
    })

    document.querySelector("#itemText").value = ''
    document.querySelector("#calorieNumber").value = ''
    document.querySelector("#deleteItem").addEventListener("click", deleteItem)
}

// TO DO === IMPLEMENT DELETE FUNCTION FOR EACH ITEM

document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'deleteItem'){
        e.preventDefault()
        let currentId = e.target.parentNode.dataset.id
        
        fetch(BASE_URL+`/items/${currentId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
        })
        e.target.parentElement.remove()
        

       
     }
 });
