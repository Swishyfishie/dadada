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
                <li class="itemDetails" data-id="${item.id}"><p contenteditable="false" id="itemName">${item.name}</p> : <p contenteditable="false" id="itemCalories">${item.calories}</p> <button id="deleteItem">Delete</button><button id="editItem">Edit</button></li>
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
        <li class="itemDetails" data-id="${item.id}"><p contenteditable="true" id="itemName">${item.name}</p> : <p contenteditable="true" id="itemCalories">${item.calories}</p> <button id="deleteItem">Delete</button><button id="editItem">Edit</button></li>
        `
    })

    document.querySelector("#itemText").value = ''
    document.querySelector("#calorieNumber").value = ''
    document.querySelector("#deleteItem").addEventListener("click", deleteItem)
}

// DELETE FUNCTION TO BE REFACTORED

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




 // EDIT FUNCTION TO BE REFACTORED
 document.addEventListener('click',function(e){
     e.preventDefault()
     if(e.target && e.target.id == 'editItem'){

        if(e.target.innerHTML === "Edit"){
            e.target.innerHTML = "Save"
            document.querySelector('#itemName').contentEditable = true
            document.querySelector('#itemCalories').contentEditable = true
        }   else {
            e.target.innerHTML = "Edit"
            document.querySelector('#itemName').contentEditable = false
            document.querySelector('#itemCalories').contentEditable = false
        }    
        
        
        const item = {
            name: document.querySelector('#itemName').innerText,
            calories: document.querySelector("#itemCalories").innerText
        }
        
        console.log(item)
        let currentId = e.target.parentNode.dataset.id
        
        // fetch(BASE_URL+`/items/${currentId}`, {
        //     method: "PUT",
        //     body: JSON.stringify(item),
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Accept": "application/json",
        //     }

        // })
        // .then(res => res.json())
        // .then(item => console.log(item))
        

       
     }
 });